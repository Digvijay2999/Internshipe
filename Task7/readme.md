# Contact Form with JavaScript Redirect - Documentation

## Overview

This is a **Contact Us Form** built with HTML5, CSS3, and JavaScript. The application features a multi-page experience where users submit a contact form and are automatically redirected to a confirmation page displaying a personalized thank you message.

---

## Project Structure

### Files Included

| File | Purpose |
|------|---------|
| `index.html` | Main contact form page |
| `reply.html` | Confirmation page with thank you message |
| `style.css` | Styling for both pages |
| `script.js` | Form submission and URL parameter handling |

---

## How It Works

### 1. User Submits Contact Form (index.html)

The user fills out the contact form with the following fields:

- **Full Name** - Text input (required, max 30 characters)
- **Email Address** - Email input (required, valid email format)
- **Phone Number** - Telephone input (required, exactly 10 digits)
- **Message** - Textarea (required, max 200 characters)

### 2. JavaScript Processes Submission (script.js)

When the user clicks "Send Message":

1. The form submission event is prevented (`event.preventDefault()`)
2. The user's name is captured from the input field
3. The browser redirects to `reply.html` with the name passed as a URL parameter
4. The form is cleared with `form.reset()`

**Key Code:**
```javascript
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    window.location.href = `reply.html?name=${encodeURIComponent(name)}`;
    form.reset();
});
```

### 3. Confirmation Page Displays Message (reply.html + script.js)

On the `reply.html` page:

1. JavaScript reads the URL parameters using `URLSearchParams`
2. Extracts the user's name from the URL
3. Displays a green confirmation message: "Thank you, {name}! Your message has been received."

**Key Code:**
```javascript
const params = new URLSearchParams(window.location.search);
const name = params.get("name");
statusMsg.textContent = `Thank you, ${name}! Your message has been received.`;
statusMsg.style.color = "green";
```

---

## Form Structure

The form uses semantic HTML5 elements organized into three fieldsets with legends:

### 1. **Personal Information**
```html
<fieldset>
    <legend>Personal Information</legend>
    <label for="name">Full Name</label>
    <input type="text" id="name" name="name" required maxlength="30" 
           placeholder="Enter your name">
</fieldset>
```

### 2. **Contact Details**
```html
<fieldset>
    <legend>Contact Details</legend>
    <label for="email">Email Address</label>
    <input type="email" id="email" name="email" required 
           placeholder="example@gmail.com">
    
    <label for="phone">Phone Number</label>
    <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" 
           placeholder="10 digit number" required>
</fieldset>
```

### 3. **Message**
```html
<fieldset>
    <legend>Message</legend>
    <label for="message">Your Message</label>
    <textarea id="message" name="message" required maxlength="200" 
              placeholder="Write your message here..."></textarea>
</fieldset>
```

---

## Form Validation

Built-in HTML5 validation ensures data quality:

| Field | Validation Rules |
|-------|------------------|
| Full Name | Required, max 30 characters |
| Email Address | Required, valid email format |
| Phone Number | Required, exactly 10 digits (0-9 only) |
| Message | Required, max 200 characters |

All fields must be filled correctly before form submission is allowed.

---

## Styling (style.css)

The stylesheet provides:

- **Form Container**: Max-width 500px, centered with shadow and rounded corners
- **Fieldsets**: Clean grouping without borders
- **Legend**: Bold, 18px Arial font for section titles
- **Labels**: Block-level display with bold font weight
- **Inputs/Textarea**: Full-width with padding, rounded borders, 14px font
- **Button**: Full-width, blue background (#2563eb) with hover effect
- **Status Message**: Flexbox centered, 600px height, green text color

### Key Styling Features:
```css
.contact-form {
    max-width: 500px;
    margin: 40px auto;
    background: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

button:hover {
    background: #1e40af;
}
```

---

## JavaScript Functionality (script.js)

### Features:

1. **Form Event Listener**: Captures form submission
2. **Event Prevention**: Stops default page reload behavior
3. **Data Extraction**: Retrieves user's name from input field
4. **URL Encoding**: Safely encodes name parameter for URL using `encodeURIComponent()`
5. **Page Redirect**: Navigates to `reply.html` with query parameter
6. **Form Reset**: Clears all form fields after submission
7. **URL Parameter Reading**: Uses `URLSearchParams` to read query parameters
8. **Dynamic Message**: Displays personalized thank you message with user's name

---

## User Flow

```
User Opens index.html
    ↓
Fills Contact Form
    ↓
Clicks "Send Message"
    ↓
JavaScript Prevents Default Submission
    ↓
Extracts User's Name
    ↓
Redirects to reply.html?name={userName}
    ↓
JavaScript on reply.html Reads URL Parameter
    ↓
Displays "Thank you, {name}! Your message has been received."
```

---

## Browser Compatibility

Supports all modern browsers:
- Chrome/Chromium-based browsers
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Features

✅ Multi-page form workflow  
✅ URL parameter passing with `encodeURIComponent()`  
✅ Semantic HTML5 form structure  
✅ Built-in HTML5 validation  
✅ JavaScript form handling  
✅ Personalized confirmation message  
✅ Responsive design  
✅ Professional styling with shadow and rounded corners  
✅ Accessible form design with proper label association  

---

## Footer

Both pages include:
```html
<footer>
    <p>&copy; 2026 Digvijay | All rights reserved.</p>
</footer>
```

---

## Summary

This project demonstrates a complete form workflow combining:
- **HTML5**: Semantic form elements with validation
- **CSS3**: Professional styling with flexbox and shadows
- **JavaScript**: Form submission handling and URL parameter management
- **Accessibility**: Proper label-input associations and semantic structure

It showcases how to handle form data without backend processing by using URL parameters and the DOM to create a dynamic, interactive web application.
