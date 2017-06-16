// Get all the modals
const modals = document.querySelectorAll('.modal');

// Hide a modal
const hideModal = (modal) => {
    modal.classList.add("modal-hiding");

    // Delay "display: none" to allow animation to finish
    setTimeout(() => {
        modal.classList.remove("modal-hiding");
        modal.classList.add("modal-hidden");
    }, 250);
}

// Setup event listeners
modals.forEach((modal, i) => {
    const btn = document.querySelector('#btn-' + modal.id);
    const close = document.querySelector('#close-' + modal.id);

    // Open modal
    btn.onclick = (event) => {
        event.preventDefault();
        modal.classList.remove("modal-hidden");
    };

    // Close modal
    close.onclick = () => {
        hideModal(modal);
    }
});

// Close modal by clicking outside it
window.onclick = (event) => {
    console.log(event.target, event.target.closest('.modal'));
    if (event.target.closest('.modal') != null) {
        hideModal(event.target);
    }
}