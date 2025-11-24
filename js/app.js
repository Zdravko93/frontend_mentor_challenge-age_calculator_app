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

window.onload = () =>
  clearInputs(inputs, labels, errorMessages, errorModal, backdrop);

const calculateAge = () => {
  [dayOutput, monthOutput, yearOutput].forEach(resetOutputAnimation);

  const valid =
    validateDay(dayInput, labels, errorMessages) &
      validateMonth(monthInput, labels, errorMessages) &
      validateYear(yearInput, labels, errorMessages) &&
    dayInput.value &&
    monthInput.value &&
    yearInput.value;

  if (!valid)
    return openModal(
      "Must be a valid date",
      errorModal,
      backdrop,
      errorMessages,
      errorModalButton
    );

  const day = +dayInput.value;
  const month = +monthInput.value;
  const year = +yearInput.value;

  if (day > getMaxDaysInMonth(month, year)) {
    return openModal(
      "Invalid day for the selected month",
      errorModal,
      backdrop,
      errorMessages,
      errorModalButton
    );
  }

  const birthDate = new Date(year, month - 1, day);
  const diff = Date.now() - birthDate;
  const ageDate = new Date(diff);

  yearOutput.textContent = ageDate.getUTCFullYear() - 1970;
  monthOutput.textContent = ageDate.getUTCMonth();
  dayOutput.textContent = ageDate.getUTCDate() - 1;

  setTimeout(() => {
    [dayOutput, monthOutput, yearOutput].forEach(animateOutput);
  }, 20);

  clearInputs(inputs, labels, errorMessages, errorModal, backdrop);
};

dayInput.addEventListener("input", () =>
  validateDay(dayInput, labels, errorMessages)
);
monthInput.addEventListener("input", () =>
  validateMonth(monthInput, labels, errorMessages)
);
yearInput.addEventListener("input", () =>
  validateYear(yearInput, labels, errorMessages)
);

submitButton.addEventListener("click", calculateAge);
backdrop.addEventListener("click", () =>
  clearInputs(inputs, labels, errorMessages, errorModal, backdrop)
);
errorModalButton.addEventListener("click", () =>
  clearInputs(inputs, labels, errorMessages, errorModal, backdrop)
);
