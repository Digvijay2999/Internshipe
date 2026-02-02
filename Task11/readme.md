# Task 11 — Responsive Grid Dashboard

A small responsive dashboard showcasing a CSS Grid + Flex layout with a dynamic card grid. The layout and grid behavior are preserved while the visual design was modernized and interactivity handled via JavaScript.

## Features ✅
- Modernized design using CSS variables and subtle motion
- Sidebar with profile block and **Add Card** button
- Responsive grid that fills the main column and adapts to screen sizes
- JavaScript-driven card insertion (randomly wide/tall flags) that does not break the grid
- Accessibility-friendly focus states and reduced layout shifts

## How to run ▶️
1. Open `index.html` in your browser (double-click or serve from a static server).
2. Click **+ Add Card** in the sidebar to insert a new card at the top of the grid.

## Files
- `index.html` — Markup for the layout (header, sidebar, main grid, footer) and references `script.js`.
- `style.css` — All styling: variables, layout rules, card/grid styles, sidebar polish, and animations.
- `script.js` — JavaScript that listens for Add Card clicks and appends new `.card` elements with randomized size flags and a pop animation.

## Implementation notes
- The grid uses `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))` and `grid-auto-rows: minmax(120px, auto)` to maintain consistent sizing when new cards are inserted.
- The Add Card button behavior was moved from CSS hover to JS (styling is kept but interactive transforms are handled through script events).
- New cards are inserted with `grid.insertBefore(card, grid.firstChild)` so the grid reflows naturally without layout disruption.

## Customization tips 💡
- Change colors by editing the `:root` variables in `style.css`.
- Adjust card minimum width by editing the `minmax(220px, 1fr)` value.
- Modify the randomization chances (wide/tall) in `script.js` to fine-tune new-card shapes.

## Next steps (optional)
- Extract `script.js` into a `js/` folder and update the reference.
- Add a UI control to select card type before adding (wide/tall/normal).

## Author
Created By Digvijay.