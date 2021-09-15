# Time Calculator ⏳

Ongoing little project to showcase the new TC39 proposal for a more standardized and robust Date & Time object, [Temporal](https://tc39.es/proposal-temporal/docs/). Currently just adds up the entries in the list and displays the result in a simplified and humanized output.

## Controls 🎮
- `Ctrl + Directional Arrows` - Movement between fields, creates new entries as needed.
  - Usual form movement works as well (`Tab` and `Shift + Tab`)
- `Ctrl + Enter` - Evaluates the result
- `Ctrl + Delete` - Removes the currently selected entry from the list

## Project Setup 🔧
Uses NPM/PNPM, so usual procedures follow:

```
npm i
npm run dev
```

And to build for production

```
npm run build
```

## Roadmap 🗺
What should you expect?

- Basic functionality
  - [x] Add
  - [x] Subtract
- [x] Don't allow flooding of empty entries (must use an entry before adding a new one)
- [x] Modal for controls
- [ ] Mobile layout
- [ ] Clickable Handles for adding entries
- [ ] Reorderable entries
- [ ] Light/Dark theme switch

And of course, general refactoring for clarity + optimizations as needed
