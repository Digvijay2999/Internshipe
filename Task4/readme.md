# Portfolio Project

## Overview
This project is a personal portfolio website designed to showcase skills, projects, and experiences. It is built using HTML and CSS, providing a clean and modern user interface.

## Features
- Responsive design that adapts to various screen sizes.
- A visually appealing layout with a gradient header and card-style sections.
- Navigation menu for easy access to different sections of the portfolio.

## Technologies Used
- HTML5
- CSS3

## Structure
The project consists of the following files:
- `home.html`: The landing page of the portfolio.
- `about.html`: A page that introduces the developer and highlights personal qualities.
- `education.html`: A page showcasing educational background and qualifications.
- `contact.html`: A page with contact information and communication methods.
- `styles.css`: The CSS file that styles the portfolio, including layout, colors, and typography.

## CSS Concepts Used

### Flexbox
Flexbox (Flexible Box Layout) is a powerful CSS layout tool that makes it easy to design flexible and responsive layouts. In this portfolio project, flexbox is used to:
- Align and distribute elements within containers efficiently.
- Create responsive navigation menus that adapt to different screen sizes.
- Organize card-style sections in a flexible grid that wraps on smaller screens.
- Center content both horizontally and vertically with simple properties like `justify-content` and `align-items`.

Key flexbox properties utilized:
- `display: flex;` - Enables flexbox layout on a container.
- `justify-content` - Aligns items along the main axis (horizontally by default).
- `align-items` - Aligns items along the cross axis (vertically by default).
- `flex-wrap` - Allows items to wrap to the next line on smaller screens.
- `gap` - Provides consistent spacing between flex items.

### Box Sizing
Box sizing is a CSS property that defines how the width and height of elements are calculated. This project uses the `box-sizing` property to ensure consistent spacing and layout:
- `box-sizing: border-box;` - Includes padding and border in the element's total width and height calculations, making layout calculations more predictable and intuitive.
- This prevents elements from overflowing their containers when padding or borders are added.
- Ensures that elements with the same width value will actually render at the same size, regardless of padding or border thickness.

By using `box-sizing: border-box;` globally, the portfolio maintains a clean and predictable layout structure across all components.

## Page Details

### Home Page (home.html)
**Concept:** The home page serves as the landing page of the portfolio website. It provides the first impression to visitors.

**Working:**
- Displays the developer's name "Digvijay" in the header along with the tagline "Web Developer | Designer".
- Contains a navigation menu with links to all four pages (Home, About, Education, Contact).
- Shows a welcome message and brief introduction to the portfolio.
- Includes a footer with copyright information.
- The home link in the navigation is highlighted as "active" to indicate the current page.

### About Page (about.html)
**Concept:** This page is designed to help visitors learn more about the developer's personality, values, and professional approach.

**Working:**
- Displays the same header with the developer's name and professional title.
- Features a navigation menu with the "About" link highlighted as active.
- Contains a section titled "About Me" that includes:
  - A passionate statement about being a learner and enjoying web development.
  - Bullet points highlighting key qualities such as continuous improvement and creativity.
- Maintains the same footer and layout structure as other pages.

### Education Page (education.html)
**Concept:** This page showcases the developer's academic qualifications and educational background, establishing credibility and expertise.

**Working:**
- Displays the header and navigation menu with the "Education" link marked as active.
- Contains an "Education" section with a card-style layout using the `cards-row` class.
- Displays educational qualification in a card format:
  - Shows the degree: "Bachelor of Computer Application"
  - Displays the duration: "2022 – 2025"
- Uses flexbox styling to organize education information in a responsive manner.
- Includes the footer with copyright information.

### Contact Page (contact.html)
**Concept:** This page provides visitors with ways to get in touch with the developer, facilitating communication and networking opportunities.

**Working:**
- Displays the header and navigation menu with the "Contact" link highlighted as active.
- Contains a "Contact" section that displays contact information.
- Provides an email link (mailto: divijaykardam@gmail.com) that allows visitors to send emails directly.
- The email is presented as a clickable hyperlink for easy access.
- Maintains the consistent layout with header, navigation, footer, and styling across all pages.

## Getting Started
To view the portfolio, open the `index.html` file in a web browser. No additional setup is required.

## Author
- Digvijay

