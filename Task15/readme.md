# SPA Router — Modern Single Page Application

A lightweight, fast, and feature-rich single-page application (SPA) router built entirely with vanilla JavaScript, HTML5, and CSS3. No frameworks, no build tools — just clean, efficient code.

## 🚀 Features

✅ **Client-side routing** — Instant navigation without page reloads  
✅ **History API integration** — Full browser back/forward button support  
✅ **Active link tracking** — Visual indicator of the current route  
✅ **Smooth transitions** — Fade-in animations for better UX  
✅ **Responsive design** — Works perfectly on all screen sizes  
✅ **Loading states** — User-friendly loading indicators  
✅ **Deployment-ready** — Includes server configuration notes  

## 🛠 Technologies

- **HTML5** — Semantic structure
- **CSS3** — Modern layout, flexbox, CSS variables, gradients
- **Vanilla JavaScript** — No dependencies, pure ES6+

## 📂 File Structure

```
Task15/
├── index.html       # Main HTML entry point
├── script.js        # Router engine and route definitions
├── style.css        # Responsive styles and animations
└── readme.md        # This file
```

## 🎯 How It Works

### 1. **Route Definition**

Routes are defined in `script.js` using the `RouteConfig` object:

```javascript
const RouteConfig = {
  "/": {
    title: "Home",
    view: () => `<h1>Home</h1>...`
  },
  "/about": {
    title: "About",
    view: () => `<h1>About</h1>...`
  }
};
```

### 2. **Router Class**

The `Router` class manages all navigation logic:
- Intercepts nav link clicks
- Updates browser history
- Renders the appropriate view
- Updates the active link state

```javascript
class Router {
  navigate(path) { /* ... */ }
  renderRoute() { /* ... */ }
  updateActiveLink() { /* ... */ }
}
```

### 3. **Navigation Flow**

```
User clicks link
    ↓
[data-link] event listener intercepts
    ↓
navigate() updates history
    ↓
renderRoute() renders view
    ↓
updateActiveLink() highlights nav
```

## 📱 Responsive Breakpoints

- **Desktop** (> 768px) — Full horizontal navigation
- **Tablet** (480px - 768px) — Stacked layout
- **Mobile** (< 480px) — Compact navigation and font sizes

## 🚢 Deployment

### Important: Server Configuration

For the SPA to work properly when deployed, your server **must** redirect all routes to `index.html`.

#### Nginx
```nginx
location / {
  try_files $uri /index.html;
}
```

#### Apache (.htaccess)
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Vercel / Netlify
Pre-configured automatically — no action needed.

## 🎨 Customization

### Adding a New Route

1. Add to `RouteConfig` in `script.js`:
```javascript
"/new-page": {
  title: "New Page",
  view: () => `<h1>New Page</h1><p>Content here...</p>`
}
```

2. Add link in `index.html`:
```html
<a href="/new-page" class="nav-link" data-link>New Page</a>
```

### Styling

All styles use CSS variables defined in `:root`:
```css
--primary: #2563eb;
--bg-light: #f8fafc;
--text-dark: #0f172a;
```

Modify these to update the entire color scheme.

## 🔍 Browser Support

- Chrome/Edge 49+
- Firefox 41+
- Safari 10+
- All modern mobile browsers

## ⚡ Performance

- **Zero external dependencies** — Faster load times
- **Lazy view rendering** — Only render visible content
- **CSS animations** — Hardware-accelerated
- **No build step** — Direct browser execution

## 📚 Learning Resources

This SPA demonstrates:
- Event delegation for efficient DOM handling
- History API (`pushState`, `popstate`)
- Class-based architecture in JavaScript
- CSS Grid and Flexbox layouts
- CSS variables and custom properties
- Responsive design patterns

## 🐛 Common Issues

**Q: Routes don't work after refresh on a deployed site?**  
A: You need to configure your server to redirect all routes to `index.html` (see Deployment section).

**Q: Back button doesn't work?**  
A: The app includes a `popstate` listener for back/forward. If it's not working, clear browser cache.

**Q: Styles aren't loading?**  
A: Ensure `style.css` and `script.js` are in the same directory as `index.html`, or update the paths in the HTML.

## 📝 License

Free to use for learning and commercial projects.

---
## Author
Digvijay

**Built with ❤️ using vanilla JavaScript**

