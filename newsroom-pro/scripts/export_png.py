#!/usr/bin/env python3
"""
Export a Newsroom cover HTML to a single native 1080x1350 PNG.

Newsroom produces ONE cover per session (not a carousel), so this screenshots the
`#capa` element (falling back to `.capa`) at its native size — no clip/scale/resize.
Waits on document.fonts.ready so embedded @font-face fonts render before capture.

Usage:
    python export_png.py <html_path> [output_png]

Defaults output_png to "<html_dir>/<html_basename>.png".

Requires Playwright + Chromium:
    pip install playwright && python -m playwright install chromium
"""
import os
import sys


def main() -> int:
    if len(sys.argv) < 2:
        print("usage: export_png.py <html_path> [output_png]", file=sys.stderr)
        return 1

    html = os.path.abspath(sys.argv[1])
    if not os.path.isfile(html):
        print(f"error: HTML not found: {html}", file=sys.stderr)
        return 1

    if len(sys.argv) > 2:
        out = os.path.abspath(sys.argv[2])
    else:
        base = os.path.splitext(os.path.basename(html))[0]
        out = os.path.join(os.path.dirname(html), f"{base}.png")
    os.makedirs(os.path.dirname(out), exist_ok=True)

    from playwright.sync_api import sync_playwright

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(
            viewport={"width": 1200, "height": 1400}, device_scale_factor=1)
        page.goto(f"file://{html}", wait_until="networkidle")

        page.wait_for_timeout(2000)
        page.evaluate("() => document.fonts.ready")
        page.wait_for_timeout(2000)

        capa = page.locator("#capa")
        if capa.count() == 0:
            capa = page.locator(".capa")
        if capa.count() == 0:
            print("error: no #capa / .capa element found in HTML", file=sys.stderr)
            browser.close()
            return 1

        target = capa.first
        target.scroll_into_view_if_needed()
        page.wait_for_timeout(300)
        target.screenshot(path=out)

        browser.close()

    print(f"exported cover -> {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
