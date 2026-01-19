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
- `index.html`: The main HTML file that contains the structure of the portfolio.
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

## Getting Started
To view the portfolio, open the `index.html` file in a web browser. No additional setup is required.

## Author
- Digvijay

