// Utility Functions

/*
 * Get maximum number of days in a month
 * Accounts for leap years in February
 */
export const getMaxDaysInMonth = (month, year) => {
  if (month === 2) {
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    return isLeapYear ? 29 : 28;
  }
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
};

/**
 * Clear all input fields and reset error messages & styles
 * Hides modal and backdrop as well
 */
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

/**
 * Add animation class to output element
 */
export const animateOutput = (el) => el.classList.add("output-number-animate");

/**
 * Remove animation class from output element
 */
export const resetOutputAnimation = (el) =>
  el.classList.remove("output-number-animate");
