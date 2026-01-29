# Task9 — Registration Form

Overview
--------
This folder contains a simple client-side registration form demo intended for front-end styling and UX practice. The markup and styles create a modern, responsive registration card with clear success and error states.

Files
-----
- `index.html` — registration form markup (inputs for name, email, password, etc.)
- `style.css` — styling for the page, form card, inputs, button, and `#successMessage` component
- `script.js` — client-side behavior such as showing the success message, form reset, or simple validation

Form fields (typical)
---------------------
- Full name
- Email address
- Password
- Confirm password
- Terms / checkbox (optional)

Styling notes
-------------
- The design uses a purple gradient background and an elevated white form card for contrast.
- Inputs include focus, hover, error, and success states. The `#successMessage` is styled as a prominent, accessible success card with an icon, left accent, and a pop-in animation.
- Adjust colors, spacing, or animations in `style.css` to match your brand or preferences.

Accessibility & UX suggestions
----------------------------
- Ensure form controls have proper `label` associations and `aria-` attributes if you add dynamic behaviors.
- Respect reduced-motion preferences when adding or changing animations.

Next steps (optional)
---------------------
- Hook the form to a backend endpoint for real registration flow.

Controlled validation (JavaScript)
---------------------------------
Use JavaScript to implement a controlled validation flow instead of relying on the browser's built-in validation. This gives you full control over which rules run, how errors are presented, and when the `#successMessage` displays.

### Core steps
 - Add `novalidate` to the `<form>` element to disable native HTML validation.
 - Listen for the form `submit` event and call `event.preventDefault()`.
 - Run your JavaScript validators (required, email pattern, password length/match, terms checkbox).
 - For each field toggle `.form-group.error` / `.form-group.success` and update the related `<small>` message text.
 - If all checks pass, show `#successMessage`, reset the form (optional), and optionally POST data to your backend.

### Notes
 - Use `aria-live` on the `#successMessage` and on error containers to announce changes to screen readers.
 - Respect reduced-motion preferences: disable or shorten animations when `prefers-reduced-motion` is set.
