# Grid Image Gallery with Modal (Task12)

A responsive image gallery with an accessible lightbox modal. Click or keyboard-activate thumbnails to open a fullscreen modal with navigation (previous/next), captions, and keyboard controls (Escape, Arrow keys, Enter/Space). 

## Live preview
- Open `index.html` in a browser (double-click the file or serve the folder with a static server).

## Files
- `index.html` — gallery markup and modal structure
- `style.css` — styles for gallery and modal (overlay, animation, responsive)
- `script.js` — modal behavior, navigation, keyboard support, focus management
- `readme.md` — this file

## Features ✅
- Responsive CSS Grid gallery
- Fullscreen modal with subtle scale/pop animation
- Previous / Next navigation buttons
- Keyboard support: Enter/Space to open, Escape to close, ArrowLeft / ArrowRight to navigate
- Accessible: focus management, tabindex on thumbnails, ARIA attributes on modal
- Captions (from `data-caption` or `alt` text)

## Usage
Add thumbnail images to the gallery with a `data-large` URL for the full-size image. Optionally add `data-caption` for a caption.

Example:

```html
<img src="thumb.jpg" data-large="full.jpg" data-caption="Sunset at the lake" alt="Sunset over the lake">
```

When a thumbnail is activated, the modal will display the `data-large` image and show the caption. The modal elements/classes/ids are used by the JS and must remain unchanged:

```html
<div class="modal" id="modal">
  <div class="modal-content" role="dialog" aria-modal="true">
    <button class="close-btn" id="closeBtn" aria-label="Close">×</button>
    <button class="nav-btn left" aria-label="Previous">‹</button>
    <div class="img-wrap"><img id="modalImage" alt="Enlarged image"></div>
    <button class="nav-btn right" aria-label="Next">›</button>
    <div class="modal-caption">A short caption or description here</div>
  </div>
</div>
```

## Customization
- Change spacing, colors, and animation in `style.css`.
- Change behavior (preload, transitions) in `script.js`.

## Accessibility notes
- Thumbnails have `tabindex=0` and open with Enter/Space.
- Modal uses `aria-modal` and traps focus between primary controls (close, prev, next).
- Captions are populated from `data-caption` or `alt` if `data-caption` is not present.

## Troubleshooting
- If images fail to load, the script shows a friendly message in the caption area.
- Ensure `data-large` points to a valid image URL.

## Author

Created by Digvijay.

