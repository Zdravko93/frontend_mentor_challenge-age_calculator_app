// // Element Selectors
// const dayInput = document.getElementById("day");
// const monthInput = document.getElementById("month");
// const yearInput = document.getElementById("year");

// const dayOutput = document.querySelector("h1:nth-child(3) span");
// const monthOutput = document.querySelector("h1:nth-child(2) span");
// const yearOutput = document.querySelector("h1:first-child span");

// const submitButton = document.querySelector(".submit-button");
// const errorModal = document.querySelector(".error-modal");
// const errorModalButton = document.querySelector(".error-modal-button");
// const backdrop = document.querySelector(".backdrop");

// const labels = document.querySelectorAll("label");
// const inputs = document.querySelectorAll("input");
// const errorMessages = document.querySelectorAll("small");

// // Initialization
// window.onload = () => clearInputs();

// const openModal = (msg) => {
//   // Show modal content
//   errorModal.style.display = "flex";
//   backdrop.style.display = "block";
//   errorMessages[0].textContent = msg;

//   // Hide background content from screen readers
//   document.querySelector("main").setAttribute("aria-hidden", "true");
//   document.querySelector("footer").setAttribute("aria-hidden", "true");

//   // Focus the OK button
//   errorModalButton.focus();

//   const handleKey = (e) => {
//     if (e.key === "Escape") {
//       closeModal();
//     } else if (e.key === "Enter" || e.key === " ") {
//       e.preventDefault();
//       errorModalButton.click();
//     } else if (e.key === "Tab") {
//       e.preventDefault(); // keep focus on OK button
//       errorModalButton.focus();
//     }
//   };

//   errorModal.addEventListener("keydown", handleKey);

//   const closeModal = () => {
//     errorModal.style.display = "none";
//     backdrop.style.display = "none";
//     document.querySelector("main").removeAttribute("aria-hidden");
//     document.querySelector("footer").removeAttribute("aria-hidden");
//     errorModal.removeEventListener("keydown", handleKey);
//   };

//   errorModalButton.addEventListener("click", closeModal, { once: true });
//   backdrop.addEventListener("click", closeModal, { once: true });
// };

// // Validation Helpers
// const validateInput = (input, label, min, max, errorElement, msg) => {
//   const value = Number(input.value);

//   const hasError = isNaN(value) || value < min || value > max;

//   label.classList.toggle("error", hasError);
//   input.classList.toggle("error-border", hasError);
//   errorElement.textContent = hasError ? msg : "";

//   return !hasError;
// };

// const validateDay = () =>
//   validateInput(
//     dayInput,
//     labels[0],
//     1,
//     31,
//     errorMessages[0],
//     "Must be a valid day"
//   );

// const validateMonth = () =>
//   validateInput(
//     monthInput,
//     labels[1],
//     1,
//     12,
//     errorMessages[1],
//     "Must be a valid month"
//   );

// const validateYear = () =>
//   validateInput(
//     yearInput,
//     labels[2],
//     1,
//     new Date().getFullYear(),
//     errorMessages[2],
//     "Must be in the past"
//   );

// // Utility Functions
// const getMaxDaysInMonth = (month, year) => {
//   if (month === 2) {
//     const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
//     return isLeapYear ? 29 : 28;
//   }

//   return [4, 6, 9, 11].includes(month) ? 30 : 31;
// };

// const clearInputs = () => {
//   inputs.forEach((input) => {
//     input.value = "";
//     input.classList.remove("error-border");
//   });

//   labels.forEach((label) => label.classList.remove("error"));
//   errorMessages.forEach((msg) => (msg.textContent = ""));

//   errorModal.style.display = "none";
//   backdrop.style.display = "none";
// };

// const animateOutput = (el) => el.classList.add("output-number-animate");
// const resetOutputAnimation = (el) =>
//   el.classList.remove("output-number-animate");

// // Age Calculation
// const calculateAge = () => {
//   // Reset previous animations
//   [dayOutput, monthOutput, yearOutput].forEach(resetOutputAnimation);

//   // Validate basic ranges
//   const valid =
//     validateDay() & validateMonth() & validateYear() &&
//     dayInput.value &&
//     monthInput.value &&
//     yearInput.value;

//   if (!valid) return openModal("Must be a valid date");

//   const day = Number(dayInput.value);
//   const month = Number(monthInput.value);
//   const year = Number(yearInput.value);

//   // Validate day against real-world months
//   if (day > getMaxDaysInMonth(month, year)) {
//     return openModal("Invalid day for the selected month");
//   }

//   // Calculate age
//   const birthDate = new Date(`${month}/${day}/${year}`);
//   const diff = Date.now() - birthDate;
//   const ageDate = new Date(diff);

//   const years = ageDate.getUTCFullYear() - 1970;
//   const months = ageDate.getUTCMonth();
//   const days = ageDate.getUTCDate() - 1;

//   // Animate + output
//   setTimeout(() => {
//     [dayOutput, monthOutput, yearOutput].forEach(animateOutput);
//   }, 20);

//   dayOutput.textContent = days;
//   monthOutput.textContent = months;
//   yearOutput.textContent = years;

//   clearInputs();
// };

// // Event Listeners
// dayInput.addEventListener("input", validateDay);
// monthInput.addEventListener("input", validateMonth);
// yearInput.addEventListener("input", validateYear);

// submitButton.addEventListener("click", calculateAge);

// backdrop.addEventListener("click", clearInputs);
// errorModalButton.addEventListener("click", clearInputs);

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
