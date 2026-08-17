#!/usr/bin/env python3
"""
catalog_lookup.py — busca de recursos visuais no banco Zahnspange Home + controle de uso.

Fonte de verdade do "usado": <BRAND>/used_log.json (append-only).
O banco em si (catalog.json / Published_Highlights / _Intake_BeforeAfter) é só leitura.

USO:
  catalog_lookup.py beforeafter [--unused] [--no-face] [--limit N]   # antes/depois publicados, ranqueados; --unused esconde já usados
  catalog_lookup.py stills [--subject saif-portrait] [--unused] [--no-framegrab] [--render-ready] [--quality A] [--limit N]
  catalog_lookup.py video [--topic aligner-education] [--subject ..] [--query TERMO] [--unused] [--limit N]
  catalog_lookup.py use <asset> --where W30_C2 [--note "capa"]       # marca 1 asset como usado (QUALQUER asset: b/a, still, video)
  catalog_lookup.py used                                             # lista o que já foi usado
  catalog_lookup.py stats

REGRA (21/07/26): `use` é obrigatório para TODA imagem consumida numa peça publicada
(antes/depois, still cl_*, frame de vídeo, foto do shoot) — é o que impede repetição cross-week.

<asset> = caminho do arquivo do highlight (ex: Published_Highlights/DIi33qFNelO_01.jpg),
          OU shortcode/slide (DIi33qFNelO/01.jpg), OU uma chave cl_*, OU um id de vídeo (v035).
--root aponta pro Brand_Sources/Zahnspange_Home (default = caminho do projeto Saif).
"""
import json, os, sys, argparse, datetime

DEFAULT_ROOT = os.environ.get("ZH_BRAND_SOURCES", "/Users/gabriel/Library/CloudStorage/GoogleDrive-gvsg.gouvea@gmail.com/My Drive/04 - Anotações & Rascunhos/Claude/claude-workspace/🚀_Projects/Saif/Brand_Sources/Zahnspange_Home")

def load(root, name, default):
    p = os.path.join(root, name)
    return json.load(open(p, encoding="utf-8")) if os.path.exists(p) else default

def used_set(root):
    log = load(root, "used_log.json", [])
    return {norm_asset(e["asset"]) for e in log}, log

def norm_asset(a):
    # normalize: strip Published_Highlights/ prefix, unify shortcode_slide vs shortcode/slide
    b = os.path.basename(str(a))
    return b.replace("/", "_")

def cmd_beforeafter(root, args):
    used, _ = used_set(root)
    hl = load(root, "Published_Highlights/highlights.json", [])
    ba = [h for h in hl if h.get("before_after")]
    intake = [i for i in load(root, "_Intake_BeforeAfter/intake.json", []) if i.get("type") == "before-after"]
    rows = []
    for h in ba:
        rows.append(dict(asset=h["file"], id=norm_asset(h["file"]), kind="published-photo",
                         face=h.get("patient_face"), likes=h.get("likes") or 0, url=h.get("url"),
                         note=h.get("note",""), quality=h.get("quality")))
    for i in intake:
        rows.append(dict(asset=i.get("montage"), id=i.get("id"), kind="video-clip(gated)",
                         face=i.get("patient_face"), likes=0, url=None, note=i.get("note","")[:80], quality="A"))
    if args.no_face: rows = [r for r in rows if not r["face"]]
    if args.unused: rows = [r for r in rows if r["id"] not in used]
    rows.sort(key=lambda r: (r["face"], -(r["likes"] or 0)))
    rows = rows[:args.limit]
    print(f"# ANTES/DEPOIS — {len(rows)} candidatos ({'não-usados' if args.unused else 'todos'}{', sem rosto' if args.no_face else ''})")
    for r in rows:
        u = "USADO" if r["id"] in used else "livre"
        face = "⚠rosto" if r["face"] else "sem-rosto"
        print(f"[{u}] {r['asset']}  · {face} · ❤{r['likes']} · {r['kind']} · {r['note'][:56]}")
    return rows

def still_is_used(r, used):
    # FIX 21/07/26: used ids carregam extensão (basename do arquivo); keys cl_* não.
    # Um still conta como usado se o BASENAME do file dele OU o key (com qualquer extensão) bater.
    if norm_asset(r.get("file","")) in used: return True
    used_noext = {os.path.splitext(u)[0] for u in used}
    return r.get("key") in used_noext or r.get("key") in used

def cmd_stills(root, args):
    used, _ = used_set(root)
    cat = load(root, "catalog.json", {})
    ref = cat.get("reference_stills", [])
    if args.subject: ref = [r for r in ref if args.subject in (r.get("subject") or "")]
    if args.no_framegrab: ref = [r for r in ref if r.get("source") == "archive-photo"]
    if args.render_ready: ref = [r for r in ref if r.get("render_ready")]
    if args.quality: ref = [r for r in ref if (r.get("quality") or "") == args.quality]
    if args.unused: ref = [r for r in ref if not still_is_used(r, used)]
    ref.sort(key=lambda r: (r.get("quality","C"), r["key"]))
    ref = ref[:args.limit]
    print(f"# STILLS cl_* — {len(ref)}{' subject='+args.subject if args.subject else ''}")
    for r in ref:
        u = "USADO" if still_is_used(r, used) else "livre"
        rr = "render-ready" if r.get("render_ready") else ""
        src = "frame" if r.get("source") == "video-frame" else "foto"
        print(f"[{u}] {r['key']}  · {r['subject']}/{r.get('quality','?')}/{src} · {r['file']} {rr} · {r.get('note','')[:48]}")
    return ref

def cmd_video(root, args):
    used, _ = used_set(root)
    cat = load(root, "catalog.json", {})
    vids = cat.get("videos", [])
    def vid_used(v):
        # um vídeo conta como usado se o id (v035) foi logado, com ou sem extensão
        used_noext = {os.path.splitext(u)[0] for u in used}
        return v.get("id") in used or v.get("id") in used_noext
    def match(v):
        if args.topic and args.topic not in (v.get("topics") or []): return False
        if args.subject and args.subject != v.get("primary_subject"): return False
        if getattr(args, "unused", False) and vid_used(v): return False
        if args.query:
            blob = (v.get("name","")+" "+(v.get("summary_en") or "")+" "+v.get("role","")).lower()
            if args.query.lower() not in blob: return False
        return True
    hits = [v for v in vids if match(v)][:args.limit]
    print(f"# VÍDEOS — {len(hits)}")
    for v in hits:
        g = "GATED" if v.get("gated") else "aberto"
        u = " USADO" if vid_used(v) else ""
        st = ",".join(str(s["t_sec"]) for s in v.get("strategic_frames",[])[:5])
        print(f"{v['id']}{u} · {v['name']} [{g}] {v.get('primary_subject')}/{v.get('role')} · frames@{st}s")
        print(f"    {(v.get('summary_en') or '')[:150]}")
        print(f"    montage: {v.get('montage')} · transcript: {v.get('transcript')}")
    return hits

def cmd_use(root, args):
    _, log = used_set(root)
    entry = dict(asset=args.asset, id=norm_asset(args.asset), where=args.where or "",
                 note=args.note or "", date=datetime.date.today().isoformat())
    log.append(entry)
    json.dump(log, open(os.path.join(root, "used_log.json"), "w"), ensure_ascii=False, indent=1)
    print(f"✓ marcado USADO: {args.asset}  (em {args.where}) — total usados: {len(log)}")

def cmd_used(root, args):
    _, log = used_set(root)
    print(f"# JÁ USADOS — {len(log)}")
    for e in log[-args.limit:]:
        print(f"{e.get('date')} · {e['asset']} → {e.get('where')} {e.get('note','')}")

def cmd_stats(root, args):
    cat = load(root, "catalog.json", {})
    hl = load(root, "Published_Highlights/highlights.json", [])
    used, log = used_set(root)
    ba = [h for h in hl if h.get("before_after")]
    ba_free = sum(1 for h in ba if norm_asset(h["file"]) not in used)
    print(f"stills: {len(cat.get('reference_stills',[]))} · vídeos: {len(cat.get('videos',[]))} · "
          f"antes/depois publicados: {len(ba)} (livres: {ba_free}) · usados registrados: {len(log)}")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--root", default=DEFAULT_ROOT)
    sub = ap.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("beforeafter"); p.add_argument("--unused", action="store_true"); p.add_argument("--no-face", action="store_true"); p.add_argument("--limit", type=int, default=25)
    p = sub.add_parser("stills"); p.add_argument("--subject"); p.add_argument("--unused", action="store_true"); p.add_argument("--no-framegrab", dest="no_framegrab", action="store_true"); p.add_argument("--render-ready", dest="render_ready", action="store_true"); p.add_argument("--quality"); p.add_argument("--limit", type=int, default=30)
    p = sub.add_parser("video"); p.add_argument("--topic"); p.add_argument("--subject"); p.add_argument("--query"); p.add_argument("--unused", action="store_true"); p.add_argument("--limit", type=int, default=15)
    p = sub.add_parser("use"); p.add_argument("asset"); p.add_argument("--where"); p.add_argument("--note")
    p = sub.add_parser("used"); p.add_argument("--limit", type=int, default=40)
    sub.add_parser("stats")
    a = ap.parse_args()
    {"beforeafter":cmd_beforeafter,"stills":cmd_stills,"video":cmd_video,"use":cmd_use,"used":cmd_used,"stats":cmd_stats}[a.cmd](a.root, a)

if __name__ == "__main__": main()
