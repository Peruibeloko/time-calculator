# Time Calculator ⏳

Ongoing little project, currently just adds up the entries in the list and displays the result in a simplified and humanized output.

## Controls 🎮
- `Up/Down` - Moves between entries. Creates new entries as needed.
- `Ctrl + Left/Right` - Moves between fields of an entry
  - Usual form movement works as well (`Tab` and `Shift + Tab`)
- `Ctrl + Enter` - Evaluates the result
- `Ctrl + Delete` - Removes the currently selected entry from the list

## Project Setup 🔧
This project uses pnpm as its package managing tool, which is a drop-in alternative to npm, so usual procedures follow:
```
pnpm i
pnpm serve
```

## Roadmap 🗺
What should you expect?

- Basic functionality
  - [x] Add
  - [ ] Subtract
  - [ ] Per-entry basis
- [ ] Don't allow flooding of empty entries (must use an entry before adding a new one)
- [ ] Mobile layout
- [ ] Clickable Handles for adding entries
- [ ] Reorderable entries
- [ ] Light/Dark theme switch

And of course, general refactoring for clarity + optimizations as needed
