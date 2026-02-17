/* =====================================
   SELECT ELEMENTS
   ===================================== */

const toggleBtn = document.getElementById("themeToggle");

/* =====================================
   LOAD SAVED THEME ON PAGE LOAD
   ===================================== */

/*
   If a theme exists in LocalStorage,
   apply it immediately.
*/
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

/* =====================================
   TOGGLE THEME FUNCTION
   ===================================== */

toggleBtn.addEventListener("click", () => {

  /* Toggle dark class on body */
  document.body.classList.toggle("dark");

  /* Save preference in LocalStorage */
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }

});

/* =====================================
   ACCESSIBILITY NOTE
   ===================================== */

/*
   Contrast ratios:
   Light theme:
     Background: #ffffff
     Text: #111827  → High contrast (WCAG AA compliant)

   Dark theme:
     Background: #111827
     Text: #f9fafb → High contrast

   Accent colors chosen to maintain
   readable contrast on both themes.
*/