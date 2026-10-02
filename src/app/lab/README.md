# Lab — how to add a note

The lab is a Quartz-style digital garden: explorer on the left, note in the
middle, graph + table of contents + backlinks on the right. Everything is read
off disk at build time (`src/lib/lab/notes.ts`), so there is no CMS and no
runtime fetching — a note exists because a file exists.

## Add a note

Create `src/app/lab/<folder>/<slug>/page.mdx`:

```mdx
---
title: Some Note
date: 2026/10/01
description: One sentence that shows up in the explorer tooltip and note cards.
tag: skills, golang
author: Bekzotovich
lab: true
---

Body starts here — no `# Title`, the layout renders the title from frontmatter.
```

`lab: true` is what switches the MDX wrapper to the garden layout, so don't
forget it. Folders become folders in the explorer; a folder can have its own
index note at `<folder>/page.mdx`.

## Links, graph and tags

- A link to another note — `[Go](/lab/skills/golang)` — becomes an **edge** in
  the graph and a **backlink** on the target note. These links are styled with a
  dotted green underline automatically.
- Every `tag:` entry becomes a node in the graph and a page under
  `/lab/tags/<tag>`.
- Links to anything outside `/lab` (the blog, GitHub, …) are normal links and
  are not graphed.

## Components usable inside a note

```mdx
import { LabNoteList } from "@/components/lab/lab-note-list";

<LabNoteList folder="ideas" limit={5} />
```

`folder`, `tag`, `limit` and `showDescription` are all optional.

`<YamuPlaylist limit={6} />` from `@/components/lab/yamu-playlist` renders the
playlist in `src/data/music.json` — the exhibit on the yamu note.

## Layout pieces

| File | Role |
|---|---|
| `layout.tsx` | the three-column shell |
| `lab.css` | all garden styling (gruvbox) |
| `nextra.css` | MDX/prose colours, shared with the blog |
| `src/lib/lab/notes.ts` | builds notes, tree, tags, graph and backlinks from disk |
| `src/components/lab/*` | explorer, graph canvas, TOC, backlinks, note cards |
