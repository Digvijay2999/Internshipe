# Contact Form - Documentation

## Overview

This is a responsive and user-friendly **Contact Us Form** built using HTML5 with semantic form elements. The form is designed to collect user contact information and messages in an organized manner using fieldsets and legends for better accessibility and structure.

---

## Form Structure

The contact form is composed of three main sections, each represented by a `<fieldset>` with a descriptive `<legend>` tag. This semantic approach improves accessibility and provides clear visual grouping of related form fields.

### Form Sections

#### 1. **Personal Information**
This fieldset contains basic personal details of the user.

**Legend Tag:**
```html
<legend>Personal Information</legend>
```
The `<legend>` tag provides a descriptive title for the fieldset, helping users understand the purpose of this section.

**Fields in this section:**
- **Full Name** - Accepts text input for the user's complete name

#### 2. **Contact Details**
This fieldset contains communication information.

**Legend Tag:**
```html
<legend>Contact Details</legend>
```

**Fields in this section:**
- **Email Address** - Accepts valid email input
- **Phone Number** - Accepts a 10-digit phone number

#### 3. **Message**
This fieldset contains the message body from the user.

**Legend Tag:**
```html
<legend>Message</legend>
```

**Fields in this section:**
- **Your Message** - A textarea for longer text input

---

## Form Fields Explanation

### 1. Full Name
```html
<label for="name">Full Name</label>
<input type="text" id="name" name="name" required maxlength="30" placeholder="Enter your name">
```

| Attribute | Purpose |
|-----------|---------|
| `type="text"` | Specifies a single-line text input field |
| `id="name"` | Unique identifier for the input, linked to the label using `for` attribute |
| `name="name"` | Field name for form submission |
| `required` | Makes this field mandatory |
| `maxlength="30"` | Limits input to maximum 30 characters |
| `placeholder` | Shows helpful hint text inside the input |

---

### 2. Email Address
```html
<label for="email">Email Address</label>
<input type="email" id="email" name="email" required placeholder="example@gmail.com">
```

| Attribute | Purpose |
|-----------|---------|
| `type="email"` | Validates input as a valid email format |
| `id="email"` | Unique identifier linked to the label |
| `name="email"` | Field name for form submission |
| `required` | Makes this field mandatory |
| `placeholder` | Shows email format example |

---

### 3. Phone Number
```html
<label for="phone">Phone Number</label>
<input type="tel" id="phone" name="phone" pattern="[0-9]{10}" placeholder="10 digit number" required>
```

| Attribute | Purpose |
|-----------|---------|
| `type="tel"` | Specifies a telephone number input (triggers numeric keypad on mobile) |
| `id="phone"` | Unique identifier linked to the label |
| `name="phone"` | Field name for form submission |
| `pattern="[0-9]{10}"` | Regular expression that ensures exactly 10 digits |
| `placeholder` | Indicates the expected format |
| `required` | Makes this field mandatory |

---

### 4. Your Message
```html
<label for="message">Your Message</label>
<textarea id="message" name="message" required maxlength="200" placeholder="Write your message here..."></textarea>
```

| Attribute | Purpose |
|-----------|---------|
| `<textarea>` | Multi-line text input field |
| `id="message"` | Unique identifier linked to the label |
| `name="message"` | Field name for form submission |
| `required` | Makes this field mandatory |
| `maxlength="200"` | Limits message to maximum 200 characters |
| `placeholder` | Shows helpful hint text |

---

### 5. Submit Button
```html
<button type="submit">Send Message</button>
```

| Attribute | Purpose |
|-----------|---------|
| `type="submit"` | Submits the form when clicked |
| Button Text | "Send Message" - Clear call-to-action |

---

## Legend Tag Explanation

### What is a `<legend>` Tag?

The `<legend>` tag is used to provide a descriptive label for a `<fieldset>`. It serves several important purposes:

1. **Accessibility**: Screen readers announce the legend text, helping visually impaired users understand the purpose of the fieldset
2. **Organization**: Visually groups related form fields together
3. **User Experience**: Makes the form structure clear and easy to navigate
4. **Semantic HTML**: Follows web standards for proper form structure

### Legend Tags in This Form

```html
<fieldset>
    <legend>Personal Information</legend>
    <!-- Fields here -->
</fieldset>

<fieldset>
    <legend>Contact Details</legend>
    <!-- Fields here -->
</fieldset>

<fieldset>
    <legend>Message</legend>
    <!-- Fields here -->
</fieldset>
```

Each legend clearly identifies the group of related fields, creating a logical flow through the form.

---

## Label and Input Association

All input fields use the `<label>` tag with a `for` attribute that matches the input's `id`:

```html
<label for="name">Full Name</label>
<input type="text" id="name" name="name" ...>
```

**Benefits:**
- Increases clickable area (clicking the label focuses the input)
- Improves accessibility for screen readers
- Better mobile usability
- Follows HTML5 best practices

---

## Form Validation

The form includes built-in HTML5 validation:

| Field | Validation |
|-------|-----------|
| Full Name | Required, max 30 characters |
| Email | Required, must be valid email format |
| Phone | Required, exactly 10 digits (0-9) |
| Message | Required, max 200 characters |

All fields are marked as `required`, preventing form submission until all fields are filled correctly.

---

## Styling

The form is styled using the external stylesheet `style.css`, which provides:
- Responsive design
- Visual hierarchy
- Professional appearance
- Accessibility features

---

## Browser Compatibility

This form uses HTML5 features supported by all modern browsers:
- Chrome/Edge
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Features

✅ Semantic HTML5 structure  
✅ Accessible form design  
✅ Built-in validation  
✅ Mobile-responsive  
✅ User-friendly interface  
✅ Clear field labels and hints  
✅ Organized with fieldsets and legends  

---

## Footer

The form includes a footer with copyright information:
```html
<footer>
    <p>&copy; 2026 Digvijay | All rights reserved.</p>
</footer>
```

---

## Summary

This Contact Form demonstrates proper HTML5 form structure using:
- **Fieldsets** for logical grouping
- **Legends** for accessibility and clarity
- **Labels** properly associated with inputs
- **Input validation** for data quality
- **Semantic elements** for better accessibility

It provides a clean, professional way to collect user contact information while maintaining high accessibility standards.
