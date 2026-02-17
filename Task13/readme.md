#  Theme Switcher with CSS Variables

A lightweight, accessible, and scalable Light/Dark theme switcher built using HTML, CSS Custom Properties, and JavaScript.

This project demonstrates how to dynamically change themes, store user preferences using LocalStorage, and ensure accessibility through proper contrast ratios — all while keeping the CSS clean and maintainable.

## Features

-  CSS Variables (Custom Properties) for theme management
-  Two theme configurations (Light & Dark)
-  Toggle button to switch themes
-  Dynamic theme switching using JavaScript
-  LocalStorage support (remembers theme on refresh)
-  Accessible contrast-friendly color combinations
-  Minimal CSS duplication
-  Smooth transitions between themes


## Technologies Used

- HTML5
- CSS3 (Custom Properties / Variables)
- JavaScript (DOM Manipulation & LocalStorage API)

## Project Structure
```
theme-switcher/
│
├── index.html   (Contains HTML, CSS, and JavaScript)
└── README.md
```

## How It Works

### 1️ CSS Variables

Theme colors are defined using CSS custom properties inside :root.
```CSS
:root {
	--bg-color: #ffffff;
	--text-color: #111827;
	--accent-color: #2563eb;
}


The dark theme overrides these variables when the dark class is added to <body>.

body.dark {
	--bg-color: #111827;
	--text-color: #f9fafb;
}


All components use var(--variable-name) so changing the variable updates the entire UI.
```

### 2️⃣ JavaScript Theme Toggle

JavaScript toggles a dark class on the <body> element:
```
document.body.classList.toggle("dark");
```

### 3️⃣ Saving User Preference

Theme preference is stored in LocalStorage:
```
localStorage.setItem("theme", "dark");
```


On page load, the saved theme is applied automatically.

## ♿ Accessibility

- High contrast color combinations
- Text remains readable in both themes
- Accent colors tested for clarity
- Smooth transition for better UX
- Designed to meet WCAG AA contrast recommendations.

### Why This Approach Is Scalable
- No duplicate CSS for each theme
- Components automatically adapt
- Easy to add more themes
- Centralized design tokens (variables)
- Clean separation of logic and styling

### Possible Enhancements

- Auto-detect system theme ``(prefers-color-scheme)``
-  Replace button with animated toggle switch
- Add multiple color themes
- Sync theme across multiple pages
- Convert into a reusable component (React / Vue)

## How to Run
1. Download or clone the project
2. Open index.html in your browser
3. Click Toggle Theme
4. Refresh to see saved preference working

## Preview

```
Light Theme → Clean white background
Dark Theme → Dark UI with accessible contrast
```
## Author
Digvijay
