#!/usr/bin/env python3
"""
Replace emoji glyphs with inline SVG stroke icons across the mockup pages.

Emoji render inconsistently across operating systems and read as placeholder
work in client presentations. This script swaps them for a consistent 24x24
stroke-icon set (Lucide geometry, ISC licensed) inlined into each page so the
mockups render identically from file://, a web server, or a screenshot.

Usage:  python3 assets/build-icons.py        (run from design/mockups/)
Idempotent: pages already converted are left unchanged.
"""

import glob
import re

# --- Icon geometry: 24x24 grid, stroke-based, no fills -----------------------
PATHS = {
    "search":      '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    "car":         '<path d="M5 17h14M6.5 17V9.5l1.8-3.6a2 2 0 0 1 1.8-1.1h3.8a2 2 0 0 1 1.8 1.1L17.5 9.5V17"/><path d="M6.5 9.5h11"/><circle cx="8.5" cy="17" r="1.6"/><circle cx="15.5" cy="17" r="1.6"/>',
    "van":         '<path d="M3 16V8a2 2 0 0 1 2-2h9l4 4.5V16"/><path d="M3 16h18"/><path d="M14 6v4.5h4.5"/><circle cx="7.5" cy="16.5" r="1.8"/><circle cx="16.5" cy="16.5" r="1.8"/>',
    "tuktuk":      '<path d="M6 17V9a2 2 0 0 1 2-2h5l3 4v6"/><path d="M4 17h16"/><circle cx="8" cy="17" r="1.7"/><circle cx="16.5" cy="17" r="1.7"/>',
    "hotel":       '<path d="M3 20V6a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v14"/><path d="M14 10h6a1 1 0 0 1 1 1v9"/><path d="M2 20h20"/><path d="M6.5 8.5h1M10 8.5h1M6.5 12h1M10 12h1M6.5 15.5h1M10 15.5h1M17 14h1M17 17h1"/>',
    "bed":         '<path d="M3 18V7"/><path d="M3 12h18v6"/><path d="M21 18v-4a2 2 0 0 0-2-2"/><circle cx="7.5" cy="9.5" r="1.8"/>',
    "map":         '<path d="m9 4-6 2.5v13L9 17l6 3 6-2.5v-13L15 7 9 4Z"/><path d="M9 4v13M15 7v13"/>',
    "map-pin":     '<path d="M20 10c0 5-8 12-8 12s-8-7-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="2.8"/>',
    "compass":     '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5.2-5.2 2 2-5.2 5.2-2Z"/>',
    "calendar":    '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
    "clock":       '<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 1.8"/>',
    "user":        '<circle cx="12" cy="8" r="4"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>',
    "users":       '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 5.2a3.5 3.5 0 0 1 0 5.6M17.5 14.2A6.5 6.5 0 0 1 21.5 20"/>',
    "bell":        '<path d="M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6Z"/><path d="M13.7 20a2 2 0 0 1-3.4 0"/>',
    "credit-card": '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6 15h3"/>',
    "wallet":      '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H18a1 1 0 0 1 1 1v2"/><path d="M3 7.5V18a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1H5.5"/><circle cx="16.5" cy="13.5" r="1.2" fill="currentColor" stroke="none"/>',
    "receipt":     '<path d="M5 3v18l2-1.4 2 1.4 2-1.4 2 1.4 2-1.4 2 1.4V3l-2 1.4L13 3l-2 1.4L9 3 7 4.4Z"/><path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4"/>',
    "star":        '<path d="m12 3.5 2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8-4.2-4.1 5.9-.9L12 3.5Z"/>',
    "heart":       '<path d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z"/>',
    "check":       '<path d="m4.5 12.5 5 5 10-11"/>',
    "check-circle":'<circle cx="12" cy="12" r="9"/><path d="m8 12 2.8 2.8L16 9.5"/>',
    "plus":        '<path d="M12 5v14M5 12h14"/>',
    "download":    '<path d="M12 3.5v11M7.5 10.5 12 15l4.5-4.5"/><path d="M4.5 19.5h15"/>',
    "share":       '<circle cx="17.5" cy="6" r="2.8"/><circle cx="6.5" cy="12" r="2.8"/><circle cx="17.5" cy="18" r="2.8"/><path d="m9 10.7 6-3.4M9 13.3l6 3.4"/>',
    "save":        '<path d="M5 4.5h11L19.5 8v11a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 1 .5-.5Z"/><path d="M8 4.5v5h7v-5M8 19.5v-5h8v5"/>',
    "link":        '<path d="M10.5 13.5a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-1.2 1.2"/><path d="M13.5 10.5a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l1.2-1.2"/>',
    "edit":        '<path d="M12 20h8"/><path d="M16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1 1-4Z"/>',
    "settings":    '<circle cx="12" cy="12" r="3"/><path d="M19.4 14a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V20a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7 18.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 4 12.9H4a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 5.6 7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H11a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8v.1a2 2 0 1 1 0 4Z"/>',
    "log-out":     '<path d="M9.5 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3.5"/><path d="M15 16.5 19.5 12 15 7.5M19.5 12H9"/>',
    "home":        '<path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1Z"/>',
    "briefcase":   '<rect x="3" y="7.5" width="18" height="12.5" rx="2"/><path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5M3 13h18"/>',
    "chart":       '<path d="M4 20V4"/><path d="M4 20h16"/><path d="M8 16.5v-4M12.5 16.5v-8M17 16.5v-5.5"/>',
    "trending-up": '<path d="m4 16 5-5.5 3.5 3L20 6.5"/><path d="M15 6.5h5v5"/>',
    "shield":      '<path d="M12 3.5 5 6v5.5c0 4.4 2.9 7.6 7 9 4.1-1.4 7-4.6 7-9V6l-7-2.5Z"/><path d="m9.2 12 2 2 3.6-3.8"/>',
    "lock":        '<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
    "life-buoy":   '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.8"/><path d="m5.7 5.7 3.6 3.6M14.7 14.7l3.6 3.6M18.3 5.7l-3.6 3.6M9.3 14.7l-3.6 3.6"/>',
    "mail":        '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/>',
    "phone":       '<path d="M15.5 20.5A13 13 0 0 1 3.5 8.5 2.5 2.5 0 0 1 6 6h1.6a1 1 0 0 1 1 .8l.7 3a1 1 0 0 1-.3 1L7.8 12a11 11 0 0 0 4.2 4.2l1.2-1.2a1 1 0 0 1 1-.3l3 .7a1 1 0 0 1 .8 1V18a2.5 2.5 0 0 1-2.5 2.5Z"/>',
    "globe":       '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z"/>',
    "image":       '<rect x="3" y="4.5" width="18" height="15" rx="2"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="m4 17 5-4.5 4 3.5 3-2.5 4 3.5"/>',
    "camera":      '<path d="M4 8h3l1.5-2.5h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13" r="3.4"/>',
    "mountain":    '<path d="m3 19 6.5-11 4 6 2.5-3.5L21 19H3Z"/>',
    "waves":       '<path d="M2.5 8.5c1.8-1.8 3.4-1.8 5.2 0s3.4 1.8 5.2 0 3.4-1.8 5.2 0M2.5 13c1.8-1.8 3.4-1.8 5.2 0s3.4 1.8 5.2 0 3.4-1.8 5.2 0M2.5 17.5c1.8-1.8 3.4-1.8 5.2 0s3.4 1.8 5.2 0 3.4-1.8 5.2 0"/>',
    "landmark":    '<path d="M3.5 9.5 12 4l8.5 5.5"/><path d="M5.5 9.5V18M9.5 9.5V18M14.5 9.5V18M18.5 9.5V18"/><path d="M3 20.5h18"/>',
    "utensils":    '<path d="M6 3v7a2.5 2.5 0 0 0 5 0V3"/><path d="M8.5 10v11"/><path d="M17.5 3c-1.5 1-2.5 2.8-2.5 5 0 1.6.8 2.8 2 3.3V21"/>',
    "elephant":    '<path d="M4 18v-6a5.5 5.5 0 0 1 5.5-5.5h4A5.5 5.5 0 0 1 19 12v6"/><path d="M4 18h3.5v-4M15.5 18H19"/><path d="M11.5 12v6a2 2 0 0 0 4 0"/>',
    "palm":        '<path d="M12 21v-9"/><path d="M12 12c0-3-2.5-5-5.5-4.5M12 12c0-3 2.5-5 5.5-4.5M12 12c-1.5-2.5-1-5.5 1.5-7M12 12c1.5-2.5 1-5.5-1.5-7"/>',
    "sun":         '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>',
    "sunrise":     '<path d="M12 3v5M8 6l4-3 4 3"/><path d="M3 17.5h3M18 17.5h3M2.5 21h19"/><path d="M7 17.5a5 5 0 0 1 10 0"/>',
    "wifi":        '<path d="M4 9.5a12 12 0 0 1 16 0M7 13a8 8 0 0 1 10 0"/><circle cx="12" cy="17.5" r="1.3" fill="currentColor" stroke="none"/>',
    "droplet":     '<path d="M12 3.5s6 6.2 6 10a6 6 0 0 1-12 0c0-3.8 6-10 6-10Z"/>',
    "leaf":        '<path d="M4.5 19.5c0-8 5-13 15-13.5 0 10-5 14.5-11 14.5a4 4 0 0 1-4-1Z"/><path d="M9 15c2-2.5 4.5-4.2 7.5-5.2"/>',
    "paw":         '<circle cx="8" cy="8.5" r="1.9"/><circle cx="16" cy="8.5" r="1.9"/><circle cx="5" cy="13.5" r="1.7"/><circle cx="19" cy="13.5" r="1.7"/><path d="M12 12.5c2.6 0 4.5 2.2 4.5 4.2S14.6 20 12 20s-4.5-1.3-4.5-3.3S9.4 12.5 12 12.5Z"/>',
    "coffee":      '<path d="M4 8h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Z"/><path d="M16 9.5h1.5a2.5 2.5 0 0 1 0 5H16"/><path d="M4 21h12"/>',
    "spa":         '<path d="M12 20c0-4.5 2.5-8 7-9-1 5-3.5 8-7 9Z"/><path d="M12 20c0-4.5-2.5-8-7-9 1 5 3.5 8 7 9Z"/><path d="M12 20v-4"/>',
    "ticket":      '<path d="M3 9V7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a3 3 0 0 0 0 6v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2a3 3 0 0 0 0-6Z"/><path d="M14 6v2M14 11v2M14 16v2"/>',
    "footprints":  '<path d="M6 17c-1.5 0-2.5-1-2.5-2.5S4 10 4 8a2.5 2.5 0 0 1 5 0c0 2 .5 5 .5 6.5S7.5 17 6 17Z"/><path d="M18 20c-1.5 0-2.5-1-2.5-2.5S16 13 16 11a2.5 2.5 0 0 1 5 0c0 2 .5 5 .5 6.5S19.5 20 18 20Z"/>',
    "puzzle":      '<path d="M9 4.5h3.5a1 1 0 0 1 1 1V7a1.8 1.8 0 1 0 3.5 0V5.5a1 1 0 0 1 1-1H20v4a1.8 1.8 0 1 0 0 3.5v4h-3.5a1.8 1.8 0 1 0-3.5 0H9.5a1 1 0 0 1-1-1v-3a1.8 1.8 0 1 1-3.5 0H4V8.5a1 1 0 0 1 1-1h3a1.8 1.8 0 0 0 1-3Z"/>',
    "sparkles":    '<path d="m12 4 1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6L12 4Z"/><path d="M18.5 16.5 19 18l1.5.5-1.5.5-.5 1.5-.5-1.5L16.5 18l1.5-.5Z"/>',
    "lightbulb":   '<path d="M9 17.5h6"/><path d="M10 20.5h4"/><path d="M12 3a5.5 5.5 0 0 1 3.3 9.9c-.5.4-.8 1-.8 1.6h-5c0-.6-.3-1.2-.8-1.6A5.5 5.5 0 0 1 12 3Z"/>',
    "menu":        '<path d="M4 7h16M4 12h16M4 17h16"/>',
    "grip":        '<circle cx="9" cy="6" r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="6" r="1.4" fill="currentColor" stroke="none"/><circle cx="9" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="9" cy="18" r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="18" r="1.4" fill="currentColor" stroke="none"/>',
    "arrow-right": '<path d="M4.5 12h15M14 6.5l5.5 5.5-5.5 5.5"/>',
    "file-text":   '<path d="M13.5 3.5H7a1.5 1.5 0 0 0-1.5 1.5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8.5Z"/><path d="M13.5 3.5v5h5M9 13h6M9 16.5h4"/>',
    "train":       '<rect x="5" y="3.5" width="14" height="12.5" rx="3"/><path d="M5 11h14"/><path d="M8 20.5 10 17M16 20.5 14 17"/><circle cx="9" cy="13.5" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="13.5" r="1" fill="currentColor" stroke="none"/>',
    "parking":     '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M10 16.5v-9h3a2.75 2.75 0 0 1 0 5.5h-3"/>',
    "flag":        '<path d="M5 21V4"/><path d="M5 5h11l-1.8 3.5L16 12H5"/>',
}

# --- Emoji to icon mapping ---------------------------------------------------
EMOJI = {
    "🚕": "car", "🚗": "car", "🚐": "van", "🛺": "tuktuk", "🚉": "train", "🚆": "train",
    "🏨": "hotel", "🛏️": "bed", "🗺️": "map", "🗺": "map", "📍": "map-pin",
    "🧭": "compass", "📅": "calendar", "⏱️": "clock", "⏱": "clock", "🕐": "clock",
    "👤": "user", "👥": "users", "🔔": "bell", "💳": "credit-card", "💰": "wallet",
    "🧾": "receipt", "⭐": "star", "❤️": "heart", "✅": "check-circle", "☑️": "check",
    "➕": "plus", "⬇": "download", "⬇️": "download", "🔗": "link", "💾": "save",
    "✏️": "edit", "⚙️": "settings", "↩": "log-out", "↩️": "log-out",
    "🏠": "home", "💼": "briefcase", "📊": "chart", "📈": "trending-up",
    "🛡️": "shield", "🔒": "lock", "🛟": "life-buoy", "📬": "mail", "📧": "mail",
    "📞": "phone", "🌐": "globe", "📘": "globe", "🖼️": "image", "📷": "camera",
    "⛰️": "mountain", "⛰": "mountain", "🏖️": "waves", "🏖": "waves", "🌊": "waves",
    "🏛️": "landmark", "🏛": "landmark", "🍛": "utensils", "🍽️": "utensils",
    "🐘": "elephant", "🌴": "palm", "☀️": "sun", "🌅": "sunrise",
    "📶": "wifi", "🏊": "droplet", "🌿": "leaf", "🐾": "paw", "🍳": "coffee",
    "☕": "coffee", "💆": "spa", "🎫": "ticket", "🥾": "footprints",
    "🧩": "puzzle", "✨": "sparkles", "💡": "lightbulb", "☰": "menu", "⠿": "grip",
    "🔍": "search", "🔎": "search", "🎉": "sparkles", "🚙": "car", "🅿️": "parking",
    "🚩": "flag", "📄": "file-text", "📃": "file-text",
}


def svg(name, cls="icon"):
    return f'<svg class="{cls}" viewBox="0 0 24 24" aria-hidden="true">{PATHS[name]}</svg>'


def convert(html):
    # Feature blocks: emoji inside a large circle become framed feature icons
    html = re.sub(
        r'<div class="row-icon mb-2" style="width:56px;height:56px;font-size:1\.5rem;">(\S+?)</div>',
        lambda m: f'<div class="feature-icon mb-2">{svg(EMOJI[m.group(1)])}</div>'
        if m.group(1) in EMOJI else m.group(0),
        html,
    )
    # Star rating strings -> SVG stars
    def stars(m):
        filled, empty = m.group(0).count("★"), m.group(0).count("☆")
        return "".join([svg("star")] * filled + [svg("star", "icon empty")] * empty)
    html = re.sub(r"[★☆]{3,5}", stars, html)
    # Drag handle
    html = html.replace(
        '<span class="muted small">⠿ drag</span>',
        f'<span class="grip small">{svg("grip")}</span>',
    )
    # Remaining single emoji
    for emo, name in EMOJI.items():
        if emo in html:
            html = html.replace(emo, svg(name))
    return html


def main():
    for path in sorted(glob.glob("*.html")):
        original = open(path, encoding="utf-8").read()
        updated = convert(original)
        if updated != original:
            open(path, "w", encoding="utf-8").write(updated)
            print(f"  icons -> {path}")


if __name__ == "__main__":
    main()
