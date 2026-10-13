"""Builds deploy/site.zip: the files Hostinger serves at mensagensbiblicas.bookline.digital.

Run from the repository root:  python3 deploy/make_archive.py
"""
import pathlib
import zipfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
FILES = ["index.html", "obrigado.html", ".htaccess"]
FOLDERS = ["assets"]

archive = ROOT / "deploy" / "site.zip"
paths = [ROOT / f for f in FILES]
for folder in FOLDERS:
    paths += sorted(p for p in (ROOT / folder).rglob("*") if p.is_file())

with zipfile.ZipFile(archive, "w", zipfile.ZIP_DEFLATED) as zf:
    for path in paths:
        info = zipfile.ZipInfo(path.relative_to(ROOT).as_posix(), date_time=(2026, 1, 1, 0, 0, 0))
        info.compress_type = zipfile.ZIP_DEFLATED
        info.external_attr = 0o644 << 16
        zf.writestr(info, path.read_bytes())

print(f"{archive.relative_to(ROOT)}: {len(paths)} files, {archive.stat().st_size // 1024} KB")
