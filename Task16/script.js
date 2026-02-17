// ============================================================
// STATE MANAGEMENT
// ============================================================

const state = {
  users: [],
  filteredUsers: [],
  currentPage: 1,
  itemsPerPage: 10,
  selectedUser: null,
  sortBy: 'name',
  searchTerm: '',
  filterCity: 'all',
  theme: localStorage.getItem('theme') || 'light'
};

// ============================================================
// CACHE MANAGER
// ============================================================

class CacheManager {
  static CACHE_DURATION = 60 * 60 * 1000; // 1 hour
  static CACHE_KEY = 'users_cache';

  static set(data) {
    localStorage.setItem(this.CACHE_KEY, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  }

  static get() {
    const cached = localStorage.getItem(this.CACHE_KEY);
    if (!cached) return null;
    
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > this.CACHE_DURATION) {
      localStorage.removeItem(this.CACHE_KEY);
      return null;
    }
    return data;
  }

  static clear() {
    localStorage.removeItem(this.CACHE_KEY);
  }
}

// ============================================================
// ANALYTICS
// ============================================================

class Analytics {
  static calculateStats(users) {
    const cities = new Set(users.map(u => u.address?.city).filter(Boolean));
    const companies = new Set(users.map(u => u.company?.name).filter(Boolean));
    
    return {
      totalUsers: users.length,
      companies: companies.size,
      cities: cities.size
    };
  }

  static getCities(users) {
    return Array.from(new Set(
      users.map(u => u.address?.city).filter(Boolean)
    )).sort();
  }

  static trackEvent(eventName) {
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    events.push({ event: eventName, timestamp: new Date().toISOString() });
    if (events.length > 100) events.shift();
    localStorage.setItem('analytics_events', JSON.stringify(events));
  }
}

// ============================================================
// API INTERACTION
// ============================================================

async function fetchUsers() {
  try {
    // Check cache first
    const cached = CacheManager.get();
    if (cached) {
      console.log('Using cached users');
      state.users = cached;
      return cached;
    }

    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const users = await response.json();
    CacheManager.set(users);
    state.users = users;
    
    Analytics.trackEvent('users_fetched');
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    showError('Failed to fetch users. Please try again.');
    return [];
  }
}

// ============================================================
// FILTERING & SORTING
// ============================================================

function applyFilters() {
  let filtered = [...state.users];

  // Apply search filter
  if (state.searchTerm) {
    const term = state.searchTerm.toLowerCase();
    filtered = filtered.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.phone.toLowerCase().includes(term)
    );
  }

  // Apply city filter
  if (state.filterCity !== 'all') {
    filtered = filtered.filter(user => user.address?.city === state.filterCity);
  }

  return filtered;
}

function applySorting(users) {
  const sorted = [...users];
  
  switch (state.sortBy) {
    case 'name':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'email':
      sorted.sort((a, b) => a.email.localeCompare(b.email));
      break;
    case 'company':
      sorted.sort((a, b) => (a.company?.name || '').localeCompare(b.company?.name || ''));
      break;
    case 'city':
      sorted.sort((a, b) => (a.address?.city || '').localeCompare(b.address?.city || ''));
      break;
  }
  
  return sorted;
}

function updateFilteredUsers() {
  let filtered = applyFilters();
  state.filteredUsers = applySorting(filtered);
  state.currentPage = 1;
  updateStats();
  renderUsers();
}

// ============================================================
// UI RENDERING
// ============================================================

function updateStats() {
  const stats = Analytics.calculateStats(state.users);
  const filteredStats = Analytics.calculateStats(state.filteredUsers);
  
  document.getElementById('totalUsers').textContent = stats.totalUsers;
  document.getElementById('filteredCount').textContent = state.searchTerm || state.filterCity !== 'all' 
    ? filteredStats.totalUsers 
    : stats.totalUsers;
  document.getElementById('companyCount').textContent = stats.companies;
  document.getElementById('cityCount').textContent = stats.cities;
}

function populateCityFilter() {
  const cities = Analytics.getCities(state.users);
  const filterSelect = document.getElementById('filterCity');
  
  // Preserve existing options except city options
  const existingOptions = Array.from(filterSelect.options).filter(opt => opt.value === 'all');
  
  filterSelect.innerHTML = '';
  
  // Add "All Cities" option
  const allOption = document.createElement('option');
  allOption.value = 'all';
  allOption.textContent = 'All Cities';
  filterSelect.appendChild(allOption);
  
  // Add city options
  cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    filterSelect.appendChild(option);
  });
}

function renderUsers() {
  const userList = document.getElementById('userList');
  const startIdx = (state.currentPage - 1) * state.itemsPerPage;
  const endIdx = startIdx + state.itemsPerPage;
  const paginatedUsers = state.filteredUsers.slice(startIdx, endIdx);
  
  if (paginatedUsers.length === 0) {
    userList.innerHTML = '<div class="empty-state">No users found</div>';
    updatePagination();
    return;
  }
  
  userList.innerHTML = paginatedUsers
    .map(user => `
      <div class="user-item ${state.selectedUser?.id === user.id ? 'active' : ''}" 
           data-user-id="${user.id}">
        <div class="user-name">${user.name}</div>
        <div class="user-email">${user.email}</div>
      </div>
    `)
    .join('');
  
  // Add click handlers
  userList.querySelectorAll('.user-item').forEach(item => {
    item.addEventListener('click', () => {
      const userId = parseInt(item.dataset.userId);
      const user = state.users.find(u => u.id === userId);
      showDetails(user);
    });
  });
  
  updatePagination();
}

function showDetails(user) {
  state.selectedUser = user;
  const detailContainer = document.getElementById('userDetail');
  
  if (!user) {
    detailContainer.innerHTML = '<div class="empty-state">Select a user to view details</div>';
    return;
  }
  
  detailContainer.innerHTML = `
    <div aria-live="polite">
      <div class="detail-header">${user.name}</div>
      <div class="detail-row">
        <span class="detail-label">Email</span>
        <span class="detail-value">${user.email}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Phone</span>
        <span class="detail-value">${user.phone}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Website</span>
        <span class="detail-value">${user.website}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Company</span>
        <span class="detail-value">${user.company?.name || 'N/A'}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Address</span>
        <span class="detail-value">
          ${user.address?.street || ''}, 
          ${user.address?.city || ''}, 
          ${user.address?.zipcode || ''}
        </span>
      </div>
    </div>
  `;
  
  renderUsers();
}

function updatePagination() {
  const totalPages = Math.ceil(state.filteredUsers.length / state.itemsPerPage);
  document.getElementById('pageInfo').textContent = 
    `Page ${state.currentPage} of ${totalPages || 1}`;
  
  const prevBtn = document.querySelector('.btn-pagination:first-of-type');
  const nextBtn = document.querySelector('.btn-pagination:last-of-type');
  
  prevBtn.disabled = state.currentPage <= 1;
  nextBtn.disabled = state.currentPage >= totalPages;
}

function showError(message) {
  const userList = document.getElementById('userList');
  userList.innerHTML = `<div class="error">${message}</div>`;
}

function showMessage(message) {
  const userList = document.getElementById('userList');
  userList.innerHTML = `<div class="message">${message}</div>`;
}

// ============================================================
// EXPORT FUNCTIONALITY
// ============================================================

function exportUsersToJSON() {
  const dataToExport = state.filteredUsers.length > 0 ? state.filteredUsers : state.users;
  const jsonString = JSON.stringify(dataToExport, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `users_${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
  Analytics.trackEvent('users_exported');
}

// ============================================================
// THEME MANAGEMENT
// ============================================================

function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', state.theme);
  Analytics.trackEvent('theme_toggled');
}

function initTheme() {
  if (state.theme === 'dark') {
    document.body.classList.add('dark');
  }
}

// ============================================================
// EVENT LISTENERS
// ============================================================

function setupEventListeners() {
  // Search
  document.getElementById('searchInput').addEventListener('input', (e) => {
    state.searchTerm = e.target.value;
    updateFilteredUsers();
  });
  
  // Sort
  document.getElementById('sortSelect').addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    updateFilteredUsers();
  });
  
  // Filter by city
  document.getElementById('filterCity').addEventListener('change', (e) => {
    state.filterCity = e.target.value;
    updateFilteredUsers();
  });
  
  // Items per page
  document.getElementById('itemsPerPage').addEventListener('change', (e) => {
    state.itemsPerPage = parseInt(e.target.value);
    state.currentPage = 1;
    renderUsers();
  });
  
  // Pagination
  document.querySelectorAll('.btn-pagination').forEach((btn, index) => {
    btn.addEventListener('click', () => {
      if (index === 0) {
        // Previous button
        if (state.currentPage > 1) {
          state.currentPage--;
          renderUsers();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        // Next button
        const totalPages = Math.ceil(state.filteredUsers.length / state.itemsPerPage);
        if (state.currentPage < totalPages) {
          state.currentPage++;
          renderUsers();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    });
  });
  
  // Action buttons
  document.getElementById('resetBtn').addEventListener('click', () => {
    state.searchTerm = '';
    state.filterCity = 'all';
    state.sortBy = 'name';
    state.currentPage = 1;
    document.getElementById('searchInput').value = '';
    document.getElementById('sortSelect').value = 'name';
    document.getElementById('filterCity').value = 'all';
    document.getElementById('itemsPerPage').value = '10';
    state.itemsPerPage = 10;
    updateFilteredUsers();
  });
  
  document.getElementById('exportBtn').addEventListener('click', exportUsersToJSON);
  
  document.getElementById('clearCacheBtn').addEventListener('click', () => {
    CacheManager.clear();
    showMessage('Cache cleared. Refresh to fetch fresh data.');
    Analytics.trackEvent('cache_cleared');
  });
  
  // Theme toggle
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}

// ============================================================
// INITIALIZATION
// ============================================================

async function init() {
  initTheme();
  setupEventListeners();
  
  showMessage('Loading users...');
  await fetchUsers();
  
  if (state.users.length > 0) {
    populateCityFilter();
    updateFilteredUsers();
  } else {
    showError('No users could be loaded.');
  }
}

// Start the application
document.addEventListener('DOMContentLoaded', init);