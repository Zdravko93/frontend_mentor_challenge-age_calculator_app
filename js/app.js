// Modules and DOM references
import {
  dayInput,
  monthInput,
  yearInput,
  dayOutput,
  monthOutput,
  yearOutput,
  submitButton,
  errorModal,
  errorModalButton,
  backdrop,
  labels,
  inputs,
  errorMessages,
} from "./dom.js";

import { validateDay, validateMonth, validateYear } from "./validation.js";
import { openModal } from "./modal.js";
import {
  getMaxDaysInMonth,
  clearInputs,
  animateOutput,
  resetOutputAnimation,
} from "./utils.js";

// Initialize inputs on page load
window.onload = () =>
  clearInputs(inputs, labels, errorMessages, errorModal, backdrop);

const calculateAge = () => {
  // Reset previous output animations
  [dayOutput, monthOutput, yearOutput].forEach(resetOutputAnimation);

  // Validate all input fields
  const valid =
    validateDay(dayInput, labels, errorMessages) &
      validateMonth(monthInput, labels, errorMessages) &
      validateYear(yearInput, labels, errorMessages) &&
    dayInput.value &&
    monthInput.value &&
    yearInput.value;

  // If any validation fails, show modal and stop
  if (!valid)
    return openModal(
      "Must be a valid date",
      errorModal,
      backdrop,
      errorMessages,
      errorModalButton
    );

  // Convert input values to numbers
  const day = +dayInput.value;
  const month = +monthInput.value;
  const year = +yearInput.value;

  // Ensure the day is valid for the given month/year
  if (day > getMaxDaysInMonth(month, year)) {
    return openModal(
      "Invalid day for the selected month",
      errorModal,
      backdrop,
      errorMessages,
      errorModalButton
    );
  }

  // Calculate the age by comparing birth date to current date
  const birthDate = new Date(year, month - 1, day); // month-1 because JS months are 0-indexed
  const diff = Date.now() - birthDate;
  const ageDate = new Date(diff);

  // Extract years, months, days from ageDate
  yearOutput.textContent = ageDate.getUTCFullYear() - 1970;
  monthOutput.textContent = ageDate.getUTCMonth();
  dayOutput.textContent = ageDate.getUTCDate() - 1;

  // Animate the output numbers
  setTimeout(() => {
    [dayOutput, monthOutput, yearOutput].forEach(animateOutput);
  }, 20);

  // Clear Inputs after calculation for a clean UI
  clearInputs(inputs, labels, errorMessages, errorModal, backdrop);
};

// Validate inputs live as user types
dayInput.addEventListener("input", () =>
  validateDay(dayInput, labels, errorMessages)
);
monthInput.addEventListener("input", () =>
  validateMonth(monthInput, labels, errorMessages)
);
yearInput.addEventListener("input", () =>
  validateYear(yearInput, labels, errorMessages)
);

// Calculate age when user clicks submit button
submitButton.addEventListener("click", calculateAge);

// Clear inputs when user clicks backdrop or modal button
backdrop.addEventListener("click", () =>
  clearInputs(inputs, labels, errorMessages, errorModal, backdrop)
);
errorModalButton.addEventListener("click", () =>
  clearInputs(inputs, labels, errorMessages, errorModal, backdrop)
);
