// Select form and elements
const form = document.getElementById("contactForm");


// Handle form submission
if (form) {
    form.addEventListener("submit", function (event) {

        // Stop page reload
        event.preventDefault();

        // Get input values
        const name = document.getElementById("name").value;

        // Redirect to reply.html with name in URL
        window.location.href = `reply.html?name=${encodeURIComponent(name)}`;

        // Reset form after submission
        form.reset();
    });
}

// Select status message element
const statusMsg = document.getElementById("statusMsg");

if (statusMsg) {
    // Read URL parameters
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");


    // Display confirmation message
    statusMsg.textContent = `Thank you, ${name}! Your message has been received.`;
    statusMsg.style.color = "green";
}