// Frontend-only demo authentication using LocalStorage.
// DO NOT use this pattern in production. This file demonstrates concepts only.

// Helper: SHA-256 hash for passwords (returns hex string)
async function hashPassword(password){
  const enc = new TextEncoder();
  const data = enc.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('');
}

// Users are stored in localStorage under key 'auth_users' as JSON object { email: {name, passwordHash} }
function loadUsers(){
  try{ return JSON.parse(localStorage.getItem('auth_users')||'{}'); }
  catch(e){ return {}; }
}
function saveUsers(users){ localStorage.setItem('auth_users', JSON.stringify(users)); }

// Session: store current user's email in 'auth_session'
function setSession(email){ localStorage.setItem('auth_session', email); }
function clearSession(){ localStorage.removeItem('auth_session'); }
function getSession(){ return localStorage.getItem('auth_session'); }

// UI helpers
function el(id){ return document.getElementById(id); }
function showMsg(container, text, ok=true){ container.textContent = text; container.className = 'msg ' + (ok? 'success':'error'); }

// Registration handler
document.addEventListener('DOMContentLoaded', ()=>{
  // Tab switching
  document.querySelectorAll('.tab').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.target;
      document.querySelectorAll('.panel').forEach(p=>p.classList.add('hidden'));
      document.getElementById(target).classList.remove('hidden');
    });
  });

  const regForm = el('registerForm');
  const loginForm = el('loginForm');
  const regMsg = el('regMsg');
  const loginMsg = el('loginMsg');

  regForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const form = new FormData(regForm);
    const name = form.get('name').trim();
    const email = form.get('email').trim().toLowerCase();
    const password = form.get('password');

    if(!name || !email || !password){ showMsg(regMsg,'Please fill all fields', false); return; }

    const users = loadUsers();
    if(users[email]){ showMsg(regMsg,'An account with this email already exists', false); return; }

    const hash = await hashPassword(password);
    users[email] = { name, passwordHash: hash };
    saveUsers(users);
    showMsg(regMsg,'Account created — you can sign in now', true);
    regForm.reset();
    // switch to login
    document.querySelector('.tab[data-target="login"]').click();
  });

  loginForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const form = new FormData(loginForm);
    const email = form.get('email').trim().toLowerCase();
    const password = form.get('password');

    const users = loadUsers();
    const user = users[email];
    if(!user){ showMsg(loginMsg,'No account found for this email', false); return; }

    const hash = await hashPassword(password);
    if(hash !== user.passwordHash){ showMsg(loginMsg,'Incorrect password', false); return; }

    // Auth success
    setSession(email);
    showMsg(loginMsg, 'Signed in — redirecting...', true);
    setTimeout(()=>{ window.location.href = 'protected.html'; }, 700);
  });

  // If already logged-in, redirect to protected page
  if(getSession()){ // keep session if present
    // small delay so user sees page state before redirecting
    setTimeout(()=>{ window.location.href = 'protected.html'; }, 300);
  }
});

// Expose logout function for protected page
window.authLogout = function(){
  clearSession();
  // optionally clear other session-like data
  window.location.href = 'index.html';
}

/* IMPORTANT:
 This is a demo of client-side authentication using LocalStorage and SHA-256 hashing.
 It is NOT secure for real applications. Production apps must authenticate on a server,
 store passwords with per-user salts and a slow KDF (bcrypt/scrypt/argon2), and issue
 server-signed sessions or JWTs. This demo is for learning only.
*/
