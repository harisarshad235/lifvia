#!/usr/bin/env python3
"""Extract inline <script> blocks from public/index.html into ui-src/app.inline.js
so graphify can parse the web UI with its AST extractor (no LLM cost).
Generated file: do not edit by hand."""
import re
from pathlib import Path

src = Path("public/index.html").read_text(encoding="utf-8")
blocks = [b for a, b in re.findall(r"<script\b([^>]*)>(.*?)</script>", src, re.S)
          if "src=" not in a and b.strip()]
out = Path("ui-src/app.inline.js")
out.parent.mkdir(exist_ok=True)
out.write_text("// GENERATED from public/index.html by scripts/extract-inline-js.py\n\n"
               + "\n\n// ---- next inline <script> ----\n\n".join(blocks), encoding="utf-8")
print(f"extracted {len(blocks)} inline script(s) -> {out}")
