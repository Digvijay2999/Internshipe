# Frontend Authentication Demo (Login & Registration)

This small demo implements a login and registration flow entirely on the frontend using HTML, CSS and JavaScript. It's intended for learning and prototyping only.

## Files added/updated:

- `index.html` — Login and Registration UI
- `protected.html` — A page protected by a simple client-side session check
- `style.css` — Styles for the forms and protected page
- `script.js` — Form handling, password hashing (SHA-256), LocalStorage users & session

## How it works (overview):

1. Registration: the page collects name, email and password. Passwords are hashed using SHA-256 in the browser and stored (hash only) with the name under `auth_users` in LocalStorage.
2. Login: the page hashes the entered password and compares it with the stored hash for that email. On success, it writes `auth_session` with the email to LocalStorage and redirects to `protected.html`.
3. Protected page: On load, `protected.html` checks `auth_session` and the `auth_users` store; if not present it redirects back to `index.html`.
4. Logout: clears `auth_session` and returns to the login page.

## Security note (IMPORTANT):

- This is a frontend-only demo. Storing authentication data in LocalStorage and performing auth entirely on the client is NOT secure for production.
- Real applications must perform authentication on a server, use secure password storage (salt + bcrypt/scrypt/argon2), and issue server-validated sessions or tokens.

## How to try it:

1. Open `index.html` in your browser.
2. Register a new account.
3. Sign in with the same credentials.
4. You should arrive at `protected.html` and be able to log out.

**Notes and enhancements:**

- The demo uses the Web Crypto API (`crypto.subtle.digest`) to hash passwords client-side. This is better than storing plaintext, but still not a substitute for proper server-side security.
- You can extend this demo with email validation, password strength, remember-me toggles, or by connecting to a backend.

## Author
Digvijay