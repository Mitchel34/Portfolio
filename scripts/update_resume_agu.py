#!/usr/bin/env python3
"""Refresh the AGU26 block in the one-page September 2026 public resume.

Run with: uv run --with pymupdf python scripts/update_resume_agu.py INPUT OUTPUT
The source may be the current resume or the original September copy. The patch
is intentionally limited to the existing conference area and is repeatable.
"""

from __future__ import annotations

import argparse
from datetime import datetime, timezone
from pathlib import Path

import pymupdf


WORKSHOP_URL = "https://studio.m-anage.com/agu/agu26/meetingapp.cgi/Session/280856"
POSTER_URL = "https://studio.m-anage.com/agu/agu26/meetingapp.cgi/Paper/2094875"
BLOCK = pymupdf.Rect(33, 556, 579, 591.9)
FONT_SIZE = 8.25
INK = tuple(channel / 255 for channel in (23, 27, 36))


def other_text(page: pymupdf.Page) -> list[str]:
    return [
        span["text"]
        for block in page.get_text("dict")["blocks"]
        for line in block.get("lines", [])
        for span in line["spans"]
        if not pymupdf.Rect(span["bbox"]).intersects(BLOCK)
    ]


def add_line(page: pymupdf.Page, baseline: float, segments: list[tuple[str, str, str | None]]) -> None:
    x = 34.0
    width = sum(
        pymupdf.get_text_length(text, fontname=font, fontsize=FONT_SIZE)
        for text, font, _ in segments
    )
    if x + width > 578:
        raise ValueError("Conference line would exceed the existing right margin")
    for text, font, url in segments:
        width = pymupdf.get_text_length(text, fontname=font, fontsize=FONT_SIZE)
        page.insert_text((x, baseline), text, fontname=font, fontsize=FONT_SIZE, color=INK)
        if url:
            page.insert_link({
                "kind": pymupdf.LINK_URI,
                "from": pymupdf.Rect(x, baseline - 8.9, x + width, baseline + 2.5),
                "uri": url,
            })
        x += width


def update_resume(source: Path, destination: Path) -> None:
    document = pymupdf.open(source)
    if document.page_count != 1 or document[0].rect != pymupdf.Rect(0, 0, 612, 792):
        raise ValueError("Expected the existing one-page US Letter resume")
    page = document[0]
    if "CONFERENCE ACTIVITIES AND MANUSCRIPTS" not in page.get_text():
        raise ValueError("Expected conference section was not found")
    current = page.get_text(clip=BLOCK)
    if "AGU26" not in current or "Accepted" not in current:
        raise ValueError("Expected AGU26 entries were not found at the known location")
    preserved_text = other_text(page)
    preserved_links = [
        link["uri"] for link in page.get_links()
        if "uri" in link and not link["from"].intersects(BLOCK)
    ]

    # Remove old text and links, retaining surrounding artwork and all other text.
    page.add_redact_annot(BLOCK, fill=(1, 1, 1))
    page.apply_redactions(images=0, graphics=0)
    add_line(page, 566.45, [
        ("Accepted workshop: ", "hebo", None),
        ("Best Practices for AI and Agentic Workflows in Earth Science Research", "heit", WORKSHOP_URL),
        (". AGU26 SCIWS10, December 6, 2026.", "helv", None),
    ])
    add_line(page, 578.65, [
        ("Accepted poster: ", "hebo", None),
        ("Hydra: Identifying Data That Improve Local National Water Model Streamflow Estimates", "heit", POSTER_URL),
    ])
    add_line(page, 589.05, [
        ("Presenting author | AGU26 H51P | December 11, 2026 | San Francisco.", "helv", None),
    ])
    metadata = document.metadata
    metadata["modDate"] = datetime.now(timezone.utc).strftime("D:%Y%m%d%H%M%S+00'00'")
    document.set_metadata(metadata)

    temporary = destination.with_name(destination.stem + ".updating.pdf")
    document.save(temporary, garbage=4, deflate=True)
    document.close()

    try:
        with pymupdf.open(temporary) as checked:
            page = checked[0]
            text = page.get_text()
            links = [link.get("uri") for link in page.get_links()]
            if checked.page_count != 1 or other_text(page) != preserved_text:
                raise ValueError("Patch changed text outside the approved conference block")
            for value in ["Accepted workshop:", "Accepted poster:", "December 6, 2026", "December 11, 2026", "SCIWS10", "H51P"]:
                if value not in text:
                    raise ValueError(f"Missing expected selectable text: {value}")
            if "Under review" in text or "H100" in text or "7-11, 2026" in text:
                raise ValueError("Stale conference text remains")
            for url in preserved_links + [WORKSHOP_URL, POSTER_URL]:
                if url not in links:
                    raise ValueError(f"Expected link was not preserved: {url}")
        temporary.replace(destination)
    except Exception:
        temporary.unlink(missing_ok=True)
        raise


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path)
    parser.add_argument("destination", type=Path)
    args = parser.parse_args()
    update_resume(args.source, args.destination)
    print(f"Updated and verified one-page resume: {args.destination}")
