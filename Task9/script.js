const form = document.getElementById("registerForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const successMessage = document.getElementById("successMessage");


const inputs = [
    nameInput,
    emailInput,
    passwordInput,
    confirmPasswordInput
];


/* ===============================
   HELPER FUNCTIONS (Reusable)
   =============================== */

// Show error message
function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.className = "form-group error";
    formGroup.querySelector("small").innerText = message;
}

// Show success state
function showSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.className = "form-group success";
    formGroup.querySelector("small").innerText = "";
}

// Email validation using regex
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ===============================
   FIELD VALIDATIONS
   =============================== */

function checkName() {
    if (nameInput.value.trim() === "") {
        showError(nameInput, "Name is required");
        return false;
    }
    showSuccess(nameInput);
    return true;
}

function checkEmail() {
    if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, "Invalid email format");
        return false;
    }
    showSuccess(emailInput);
    return true;
}

function isStrongPassword(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password);
}


function checkPassword() {
    const password = passwordInput.value;

    if (!isStrongPassword(password)) {
        showError(
            passwordInput,
            "Password must be 8+ characters including letters, numbers & symbols"
        );
        return false;
    }

    showSuccess(passwordInput);
    return true;
}


function checkConfirmPassword() {
    if (
        confirmPasswordInput.value === "" ||
        confirmPasswordInput.value !== passwordInput.value
    ) {
        showError(confirmPasswordInput, "Passwords do not match");
        return false;
    }

    showSuccess(confirmPasswordInput);
    return true;
}

/* ===============================
   FORM SUBMISSION
   =============================== */

function attemptSubmit() {
    const isFormValid =
        checkName() &
        checkEmail() &
        checkPassword() &
        checkConfirmPassword();

     if (isFormValid) {
        // Hide form
        form.style.display = "none";

        // Show success message
        successMessage.classList.remove("hidden");
        successMessage.style.display = "flex";
    }
}


form.addEventListener("submit", function (e) {
    e.preventDefault(); // Always stop default submission
    attemptSubmit();
});


inputs.forEach((input, index) => {
    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Stop default Enter behavior

            // If NOT last input → move focus
            if (index < inputs.length - 1) {
                inputs[index + 1].focus();
            } 
            // If last input → attempt form submission
            else {
                attemptSubmit();
            }
        }
    });
});


/* ===============================
   REAL-TIME VALIDATION
   =============================== */

nameInput.addEventListener("blur", checkName);
emailInput.addEventListener("blur", checkEmail);
passwordInput.addEventListener("keyup", checkPassword);
confirmPasswordInput.addEventListener("keyup", checkConfirmPassword);
