/* ================================
       SELECT ELEMENTS
       ================================ */

const thumbnails = document.querySelectorAll('.gallery img');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.querySelector('.nav-btn.left');
const nextBtn = document.querySelector('.nav-btn.right');
const captionEl = document.querySelector('.modal-caption');

/* Small state */
let currentIndex = 0;
const total = thumbnails.length;

/* Utility: update modal content for a given index (does not manage focus)
   Keeps classes/ids unchanged as requested. */
function updateModalContent(index) {
    currentIndex = (index + total) % total; // wrap-around
    const thumb = thumbnails[currentIndex];
    modalImage.src = thumb.dataset.large;
    modalImage.alt = thumb.alt || '';
    captionEl.textContent = thumb.dataset.caption || thumb.alt || '';
}

/* ================================
   OPEN MODAL / SETUP
   ================================ */

thumbnails.forEach((image, index) => {
    // Make thumbnails keyboard-focusable for accessibility
    image.tabIndex = 0;

    // Click to open
    image.addEventListener('click', () => {
        updateModalContent(index);
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // move focus to close button for immediate keyboard control
        closeBtn.focus();
    });

    // Support Enter and Space to open modal from keyboard
    image.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            updateModalContent(index);
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            closeBtn.focus();
        }
    });
});

/* ================================
   NAVIGATION (prev/next)
   ================================ */

function showPrev() {
    updateModalContent((currentIndex - 1 + total) % total);
}

function showNext() {
    updateModalContent((currentIndex + 1) % total);
}

prevBtn.addEventListener('click', () => {
    showPrev();
    prevBtn.focus();
});
nextBtn.addEventListener('click', () => {
    showNext();
    nextBtn.focus();
});

/* ================================
   CLOSE MODAL FUNCTION
   ================================ */

function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // return focus to the thumbnail that opened the modal
    if (thumbnails[currentIndex]) thumbnails[currentIndex].focus();
}

/* Close modal on close button click */
closeBtn.addEventListener('click', closeModal);

/* Close modal when clicking outside image */
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

/* ================================
   KEYBOARD SUPPORT & FOCUS TRAP
   - ESC to close
   - ArrowLeft / ArrowRight to navigate
   - Tab cycles between close, prev, next buttons
   ================================ */

document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') {
        closeModal();
        return;
    }

    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showPrev();
        return;
    }

    if (e.key === 'ArrowRight') {
        e.preventDefault();
        showNext();
        return;
    }

    // Simple focus trap between the three primary controls inside modal
    if (e.key === 'Tab') {
        const focusables = [closeBtn, prevBtn, nextBtn];
        const current = document.activeElement;
        const idx = focusables.indexOf(current);

        if (e.shiftKey) {
            if (idx === 0 || idx === -1) {
                e.preventDefault();
                focusables[focusables.length - 1].focus();
            }
        } else {
            if (idx === focusables.length - 1 || idx === -1) {
                e.preventDefault();
                focusables[0].focus();
            }
        }
    }
});

/* Safety: if image fails to load, hide modal gracefully */
modalImage.addEventListener('error', () => {
    captionEl.textContent = 'Image failed to load.';
});
