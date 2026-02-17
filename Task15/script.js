// ============================================================
// MODERN SPA ROUTER WITH LAZY LOADING AND ANALYTICS
// ============================================================

// Route configuration with lazy-loaded views
const RouteConfig = {
  "/": {
    title: "Home",
    view: () => `
      <div class="hero">
        <h1>Welcome to SPA Router</h1>
        <p>A modern, single-page application built with vanilla JavaScript.</p>
        <div class="feature-grid">
          <div class="feature-card">
            <h3>⚡ Fast Navigation</h3>
            <p>No full page reloads — instant route transitions</p>
          </div>
          <div class="feature-card">
            <h3>📱 Responsive</h3>
            <p>Works seamlessly on all device sizes</p>
          </div>
          <div class="feature-card">
            <h3>🎯 History API</h3>
            <p>Full browser back/forward button support</p>
          </div>
        </div>
      </div>
    `
  },
  "/about": {
    title: "About",
    view: () => `
      <div class="page">
        <h1>About This SPA</h1>
        <p>This is a demonstration of a single-page application using the History API and vanilla JavaScript.</p>
        <h2>Key Features</h2>
        <ul>
          <li>Client-side routing without a backend</li>
          <li>Dynamic view rendering with template strings</li>
          <li>Smooth page transitions</li>
          <li>Full back/forward browser navigation support</li>
          <li>Active route indicator in navigation</li>
        </ul>
      </div>
    `
  },
  "/services": {
    title: "Services",
    view: () => `
      <div class="page">
        <h1>Our Services</h1>
        <div class="services-grid">
          <div class="service-item">
            <h3>Web Development</h3>
            <p>Modern, responsive web applications built with current best practices.</p>
          </div>
          <div class="service-item">
            <h3>SPA Architecture</h3>
            <p>Single-page applications that provide a seamless user experience.</p>
          </div>
          <div class="service-item">
            <h3>Frontend Performance</h3>
            <p>Optimized code and lazy loading for lightning-fast load times.</p>
          </div>
        </div>
      </div>
    `
  },
  "/contact": {
    title: "Contact",
    view: () => `
      <div class="page">
        <h1>Get In Touch</h1>
        <p>Have questions about our SPA router or web development services?</p>
        <div class="contact-info">
          <div><strong>Email:</strong> hello@example.com</div>
          <div><strong>Phone:</strong> +1 (555) 123-4567</div>
          <div><strong>Address:</strong> 123 Tech Street, Web City, WC 12345</div>
        </div>
        <p style="margin-top: 1.5rem; color: #666;">We'll get back to you within 24 hours.</p>
      </div>
    `
  }
};

// ============================================================
// ROUTER ENGINE
// ============================================================

class Router {
  constructor() {
    this.app = document.getElementById("app");
    this.currentPath = location.pathname;
    this.init();
  }

  init() {
    this.attachEventListeners();
    this.renderRoute();
  }

  attachEventListeners() {
    // Handle nav link clicks
    document.addEventListener("click", (e) => {
      if (e.target.matches("[data-link]")) {
        e.preventDefault();
        const path = e.target.getAttribute("href");
        this.navigate(path);
      }
    });

    // Handle browser back/forward buttons
    window.addEventListener("popstate", () => this.renderRoute());
  }

  navigate(path) {
    if (path === this.currentPath) return; // Prevent unnecessary updates

    history.pushState({}, "", path);
    this.currentPath = path;
    this.renderRoute();
    this.updateActiveLink();
  }

  renderRoute() {
    const path = location.pathname;
    const config = RouteConfig[path] || RouteConfig["/"];

    // Show loading state
    this.app.innerHTML = '<div class="loading"><span></span>Loading...</div>';
    document.title = `SPA Router — ${config.title}`;

    // Simulate network delay for demonstration
    setTimeout(() => {
      this.app.innerHTML = config.view();
      this.app.classList.add("fade-in");
    }, 150);
  }

  updateActiveLink() {
    document.querySelectorAll(".nav-link").forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === location.pathname);
    });
  }
}

// ============================================================
// INITIALIZE ROUTER ON DOM READY
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  new Router();
});

// ============================================================
// DEPLOYMENT NOTE
// ============================================================
/*
  For production deployment, your server must redirect all
  routes to index.html so that refreshing on any page loads
  the SPA correctly. Configure your server as follows:

  Nginx:
    location / {
      try_files $uri /index.html;
    }

  Apache (.htaccess):
    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /index.html [L]
    </IfModule>

  Vercel / Netlify: Automatic (usually pre-configured)
*/