#!/usr/bin/env node
/**
 * I/O determinístico para o pipeline Magnific. A GERAÇÃO (imagem/vídeo) acontece
 * no turno do agente, via MCP do Magnific. Este script só faz a transferência de
 * bytes que a MCP não faz por si — baixar o asset final pro disco e subir um
 * arquivo local pra uma URL presignada.
 *
 * Requer Node 18+ (usa fetch global). Aqui o ambiente é Node 22.
 *
 * Comandos:
 *
 *   # Baixa o asset final de uma creation (url do creations_get / creations_wait)
 *   node magnific-io.mjs download --url "<asset-url>" --out imagens/cena_01_v1.png
 *
 *   # Sobe um arquivo local pra URL presignada do creations_request_upload (PUT)
 *   node magnific-io.mjs put --url "<presigned-put-url>" \
 *        --file imagens_escolhidas/cena_01.png --mime image/png
 *
 * Depois do `put`, chame creations_finalize_upload({ path }) na MCP pra obter o
 * creationIdentifier que vira o keyframe.start do video_generate.
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { dirname } from 'path';

const [cmd, ...rest] = process.argv.slice(2);
function getArg(name, def = null) {
  const i = rest.indexOf(name);
  return i !== -1 ? rest[i + 1] : def;
}
function fail(msg) {
  console.error('error: ' + msg);
  process.exit(1);
}

if (cmd === 'download') {
  const url = getArg('--url');
  const out = getArg('--out');
  if (!url || !out) fail('download requer --url e --out');

  let res;
  try {
    res = await fetch(url);
  } catch (e) {
    fail(`download falhou (rede): ${e.message}`);
  }
  if (!res.ok) fail(`download falhou: HTTP ${res.status} ${res.statusText}`);

  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, buf);
  console.log(`saved ${buf.length} bytes -> ${out}`);

} else if (cmd === 'put') {
  const url = getArg('--url');
  const file = getArg('--file');
  const mime = getArg('--mime', 'image/png');
  if (!url || !file) fail('put requer --url e --file');

  const buf = await readFile(file).catch((e) => fail(`não consegui ler ${file}: ${e.message}`));

  let res;
  try {
    res = await fetch(url, { method: 'PUT', body: buf, headers: { 'Content-Type': mime } });
  } catch (e) {
    fail(`put falhou (rede): ${e.message}`);
  }
  if (!res.ok) fail(`put falhou: HTTP ${res.status} ${res.statusText}`);
  console.log(`uploaded ${buf.length} bytes (${mime}) -> presigned URL [HTTP ${res.status}]`);

} else {
  fail(`comando desconhecido: "${cmd || ''}". Use "download" ou "put".`);
}
