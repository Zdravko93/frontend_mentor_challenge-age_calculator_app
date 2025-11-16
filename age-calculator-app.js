// Element Selectors
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const dayOutput = document.querySelector("h1:nth-child(3) span");
const monthOutput = document.querySelector("h1:nth-child(2) span");
const yearOutput = document.querySelector("h1:first-child span");

const submitButton = document.querySelector(".submit-button");
const errorModal = document.querySelector(".error-modal");
const errorModalButton = document.querySelector(".error-modal-button");
const backdrop = document.querySelector(".backdrop");

const labels = document.querySelectorAll("label");
const inputs = document.querySelectorAll("input");
const errorMessages = document.querySelectorAll("small");

// Initialization
window.onload = () => clearInputs();

// Validation Helpers
const validateInput = (input, label, min, max, errorElement, msg) => {
  const value = Number(input.value);

  const hasError = isNaN(value) || value < min || value > max;

  label.classList.toggle("error", hasError);
  input.classList.toggle("error-border", hasError);
  errorElement.textContent = hasError ? msg : "";

  return !hasError;
};

const validateDay = () =>
  validateInput(
    dayInput,
    labels[0],
    1,
    31,
    errorMessages[0],
    "Must be a valid day"
  );

const validateMonth = () =>
  validateInput(
    monthInput,
    labels[1],
    1,
    12,
    errorMessages[1],
    "Must be a valid month"
  );

const validateYear = () =>
  validateInput(
    yearInput,
    labels[2],
    1,
    new Date().getFullYear(),
    errorMessages[2],
    "Must be in the past"
  );

// Utility Functions
const getMaxDaysInMonth = (month, year) => {
  if (month === 2) {
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    return isLeapYear ? 29 : 28;
  }

  return [4, 6, 9, 11].includes(month) ? 30 : 31;
};

const showError = (msg) => {
  inputs.forEach((i) => i.classList.add("error-border"));
  labels.forEach((l) => l.classList.add("error"));

  errorMessages[0].textContent = msg;
  errorMessages[1].textContent = "";
  errorMessages[2].textContent = "";

  errorModal.style.display = "flex";
  backdrop.style.display = "block";
};

const clearInputs = () => {
  inputs.forEach((input) => {
    input.value = "";
    input.classList.remove("error-border");
  });

  labels.forEach((label) => label.classList.remove("error"));
  errorMessages.forEach((msg) => (msg.textContent = ""));

  errorModal.style.display = "none";
  backdrop.style.display = "none";
};

const animateOutput = (el) => el.classList.add("output-number-animate");
const resetOutputAnimation = (el) =>
  el.classList.remove("output-number-animate");

// Age Calculation
const calculateAge = () => {
  // Reset previous animations
  [dayOutput, monthOutput, yearOutput].forEach(resetOutputAnimation);

  // Validate basic ranges
  const valid =
    validateDay() & validateMonth() & validateYear() &&
    dayInput.value &&
    monthInput.value &&
    yearInput.value;

  if (!valid) return showError("Must be a valid date");

  const day = Number(dayInput.value);
  const month = Number(monthInput.value);
  const year = Number(yearInput.value);

  // Validate day against real-world months
  if (day > getMaxDaysInMonth(month, year)) {
    return showError("Invalid day for the selected month");
  }

  // Calculate age
  const birthDate = new Date(`${month}/${day}/${year}`);
  const diff = Date.now() - birthDate;
  const ageDate = new Date(diff);

  const years = ageDate.getUTCFullYear() - 1970;
  const months = ageDate.getUTCMonth();
  const days = ageDate.getUTCDate() - 1;

  // Animate + output
  setTimeout(() => {
    [dayOutput, monthOutput, yearOutput].forEach(animateOutput);
  }, 20);

  dayOutput.textContent = days;
  monthOutput.textContent = months;
  yearOutput.textContent = years;

  clearInputs();
};

// Event Listeners
dayInput.addEventListener("input", validateDay);
monthInput.addEventListener("input", validateMonth);
yearInput.addEventListener("input", validateYear);

submitButton.addEventListener("click", calculateAge);
backdrop.addEventListener("click", clearInputs);
errorModalButton.addEventListener("click", clearInputs);
