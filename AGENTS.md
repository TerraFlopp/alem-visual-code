# Project rules

- Do not add `vercel.json` or a hand-written `api/` server adapter: the build auto-detects Vercel and emits its native output, and a custom adapter overrides it and crashes the function.
