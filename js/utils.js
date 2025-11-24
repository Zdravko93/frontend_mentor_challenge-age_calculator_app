// utils.js
export const getMaxDaysInMonth = (month, year) => {
  if (month === 2) {
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    return isLeapYear ? 29 : 28;
  }
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
};

export const clearInputs = (
  inputs,
  labels,
  errorMessages,
  errorModal,
  backdrop
) => {
  inputs.forEach((input) => (input.value = ""));
  inputs.forEach((input) => input.classList.remove("error-border"));
  labels.forEach((label) => label.classList.remove("error"));
  errorMessages.forEach((msg) => (msg.textContent = ""));
  errorModal.style.display = "none";
  backdrop.style.display = "none";
};

export const animateOutput = (el) => el.classList.add("output-number-animate");
export const resetOutputAnimation = (el) =>
  el.classList.remove("output-number-animate");
