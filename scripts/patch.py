"""Aplica reemplazos de texto descritos en un archivo JSON: [{"file":..., "pairs":[[viejo, nuevo], ...]}]."""
import json
import sys

spec = json.load(open(sys.argv[1], encoding="utf-8"))
for item in spec:
    path = item["file"]
    text = open(path, encoding="utf-8").read()
    for old, new in item["pairs"]:
        if old not in text:
            print("NO ENCONTRADO en", path, ":", old[:80].replace("\n", " "))
            continue
        text = text.replace(old, new)
    open(path, "w", encoding="utf-8", newline="\n").write(text)
print("listo")
