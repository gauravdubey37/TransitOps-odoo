#!/usr/bin/env python3
"""Remove Cursor agent attribution lines from git commit messages."""

import sys

SKIP_PATTERNS = (
    "cursoragent@cursor.com",
    "Co-authored-by: Cursor",
    "Made-with: Cursor",
    "Made with Cursor",
)


def strip_attribution(message: str) -> str:
    lines = message.splitlines()
    filtered = [
        line
        for line in lines
        if not any(pattern in line for pattern in SKIP_PATTERNS)
    ]

    while filtered and not filtered[-1].strip():
        filtered.pop()

    result = "\n".join(filtered)
    if message.endswith("\n"):
        result += "\n"
    return result


if __name__ == "__main__":
    sys.stdout.write(strip_attribution(sys.stdin.read()))
