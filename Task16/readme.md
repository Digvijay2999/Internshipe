# Enhanced User Dashboard

A modern, feature-rich user management dashboard built with vanilla JavaScript, featuring real-time search, advanced filtering, data caching, analytics tracking, and dark mode support.

---

## 📋 Features

### Core Functionality
- **User List Display** - Display all users from JSONPlaceholder API in a responsive list
- **Search** - Real-time search across user names, emails, and phone numbers
- **Sorting** - Sort users by name, email, company, or city
- **Filtering** - Filter users by city with dynamic dropdown population
- **Pagination** - Customizable items per page (5, 10, 15, 20)
- **User Details** - Click any user to view comprehensive information

### Advanced Features
- **Data Caching** - Smart 1-hour cache with LocalStorage to reduce API calls
- **Statistics Panel** - Real-time stats showing total users, companies, and cities
- **Export to JSON** - Download filtered or full user list as JSON file
- **Dark Mode** - Toggle between light and dark themes with persistent preference
- **Analytics** - Event tracking for user interactions (downloads, theme changes, cache operations)
- **Responsive Design** - Mobile-first design that works on all screen sizes
- **Accessibility** - ARIA labels, semantic HTML, and screen reader support

---

## 🏗️ Architecture

### State Management
The application uses a centralized state object containing:
```javascript
state = {
  users: [],              // Full dataset from API
  filteredUsers: [],      // Filtered and sorted users
  currentPage: 1,         // Current pagination page
  itemsPerPage: 10,       // Items displayed per page
  selectedUser: null,     // Currently selected user for details view
  sortBy: 'name',         // Sort field (name, email, company, city)
  searchTerm: '',         // Current search query
  filterCity: 'all',      // Selected city filter
  theme: 'light'          // Theme preference (light/dark)
}
```

### Data Flow
```
API Fetch → Cache Check → Parse JSON → State Update
     ↓
Apply Filters → Apply Sorting → Paginate
     ↓
Render Users List → User Selection
     ↓
Show Details + Update Stats
```

### Key Classes

#### CacheManager
Manages data persistence with automatic expiration:
- `set(data)` - Store data with timestamp
- `get()` - Retrieve valid cached data
- `clear()` - Manual cache clearing

**Cache Duration:** 1 hour (3,600,000 milliseconds)

#### Analytics
Tracks user events and calculates statistics:
- `calculateStats(users)` - Count companies, cities, and users
- `getCities(users)` - Extract and sort all unique cities
- `trackEvent(eventName)` - Log events to localStorage (max 100)

---

## 🚀 Usage

### Installation
Simply open `index.html` in a modern web browser. No build tools or dependencies required.

### API Source
- **Endpoint:** `https://jsonplaceholder.typicode.com/users`
- **Method:** GET
- **Response:** Array of 10 sample users with full contact information

### User Interactions

#### Search
1. Type in the search box
2. Results filter in real-time across name, email, and phone
3. Statistics update to show filtered count

#### Filter by City
1. Click the "City Filter" dropdown
2. Select a city to show only users from that location
3. Pagination resets to page 1

#### Sort Users
1. Select a sort option: Name, Email, Company, or City
2. List re-sorts immediately
3. Maintains current search/filter combination

#### Pagination
1. Use Previous/Next buttons to navigate pages
2. Current page info displays at bottom
3. Buttons disable at boundaries

#### Export Data
1. Click "Export JSON" button
2. Downloaded file contains currently filtered users (or all if no filters)
3. File named: `users_YYYY-MM-DD.json`

#### Dark Mode
1. Click the moon icon (🌙) in header
2. Theme toggles immediately with smooth transition
3. Preference saves to localStorage

#### Reset Filters
1. Click "Reset Filters" button
2. Clears search, city filter, and sort
3. Returns to default view

#### Clear Cache
1. Click "Clear Cache" button
2. Removes stored user data
3. Next page refresh fetches fresh data from API

---

## 📊 Statistics Panel

Real-time statistics displayed in four cards:

| Stat | Description |
|------|-------------|
| Total Users 👥 | Count of all users in dataset |
| Filtered Count 🔍 | Count of currently displayed users |
| Companies 🏢 | Unique company count |
| Cities 📍 | Unique city count |

Statistics update automatically when filters are applied or removed.

---

## 🎨 Design System

### Color Scheme (Light Mode)
- **Primary:** #2563eb (Blue)
- **Background:** #ffffff (White)
- **Text:** #0f172a (Dark Blue-Gray)
- **Border:** #e2e8f0 (Light Gray)
- **Muted Text:** #64748b (Gray)

### Color Scheme (Dark Mode)
- **Background:** #1e293b (Dark Blue-Gray)
- **Text:** #f1f5f9 (Light Gray)
- **Border:** #334155 (Dark Gray)

### Responsive Breakpoints
- **Desktop:** 1024px+ (2-column dashboard layout)
- **Tablet:** 768px-1023px (1-column layout)
- **Mobile:** 480px-767px (Optimized single column)
- **Small Mobile:** <480px (Simplified layout)

### Components
- **Stat Cards** - Hover animation with elevation effect
- **Buttons** - Gradient hover states with smooth transitions
- **Input Fields** - Focus ring with primary color
- **User Items** - Active state highlighting with left border
- **Detail Panels** - Large typography with organized layout

---

## 💾 Data Persistence

### localStorage Keys
| Key | Purpose | Format |
|-----|---------|--------|
| `users_cache` | Cached user data with timestamp | JSON with data + timestamp |
| `theme` | User's theme preference | String: 'light' or 'dark' |
| `analytics_events` | Event tracking history | JSON array of events |

### Cache Invalidation
- Cache automatically expires after 1 hour
- Manual clear available via UI button
- Page refresh after cache clear fetches fresh data

---

## 📱 Responsive Features

### Mobile Optimizations
- Touch-friendly button sizes (44px minimum)
- Single-column layout on tablets/phones
- Simplified navigation with collapsible sections
- Optimized font sizes for readability

### Accessibility
- ARIA labels on interactive elements
- Semantic HTML (nav, main, article tags)
- Focus indicators on all buttons
- Live region updates with `aria-live="polite"`
- Screen reader friendly

---

## 🔧 Technical Details

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Requires ES6+ JavaScript support

### Dependencies
None! Pure vanilla JavaScript with native browser APIs:
- Fetch API for HTTP requests
- LocalStorage API for persistence
- History API (implicit in routing)

### Performance
- **Caching Strategy:** Cache-first for API calls
- **Rendering:** Efficient DOM updates with fragment rendering
- **Filtering:** O(n) filter with lazy evaluation
- **Memory:** State-based approach prevents DOM bloat

---

## 🎯 Future Enhancements

Potential improvements for future versions:
- User profile image thumbnails
- Edit/delete user capabilities
- Advanced multi-field search
- Data export to CSV format
- User activity timeline
- Role-based permissions
- Real-time data synchronization
- Offline mode with service workers

---

## 📝 Notes

- This is a frontend-only application; user changes are not persisted to the API
- Data is fetched from JSONPlaceholder (public test API)
- Cache is browser-specific and clears when browser data is cleared
- Analytics events are limited to 100 most recent for performance

---

## 🙏 Credits

- **UI Framework:** None (Pure CSS)
- **API Provider:** JSONPlaceholder (https://jsonplaceholder.typicode.com)
- **Icons:** Unicode emojis
- **Typography:** System fonts (Inter fallback)

---
## Author
Digvijay