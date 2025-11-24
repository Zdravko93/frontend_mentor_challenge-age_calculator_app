// modal.js
export const openModal = (
  msg,
  errorModal,
  backdrop,
  errorMessages,
  errorModalButton
) => {
  errorModal.style.display = "flex";
  backdrop.style.display = "block";
  errorMessages[0].textContent = msg;

  const main = document.querySelector("main");
  const footer = document.querySelector("footer");

  main.setAttribute("aria-hidden", "true");
  footer.setAttribute("aria-hidden", "true");

  errorModalButton.focus();

  const handleKey = (e) => {
    if (e.key === "Escape") closeModal();
    else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      errorModalButton.click();
    } else if (e.key === "Tab") {
      e.preventDefault();
      errorModalButton.focus();
    }
  };

  const closeModal = () => {
    errorModal.style.display = "none";
    backdrop.style.display = "none";
    main.removeAttribute("aria-hidden");
    footer.removeAttribute("aria-hidden");
    errorModal.removeEventListener("keydown", handleKey);
  };

  errorModal.addEventListener("keydown", handleKey);
  errorModalButton.addEventListener("click", closeModal, { once: true });
  backdrop.addEventListener("click", closeModal, { once: true });
};
