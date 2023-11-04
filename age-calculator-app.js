const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const yearOutput = document.querySelector("h1:first-child span");
const monthOutput = document.querySelector("h1:nth-child(2) span");
const dayOutput = document.querySelector("h1:nth-child(3) span");
const submitButton = document.querySelector(".submit-button");
const dayError = document.querySelector(".day-error");
const monthError = document.querySelector(".month-error");
const yearError = document.querySelector(".year-error");
const errorModal = document.querySelector(".error-modal");
const errorModalButton = document.querySelector(".error-modal-button");
const backdrop = document.querySelector(".backdrop");

const labels = document.querySelectorAll("label");
const inputs = document.querySelectorAll("input");
const outputs = document.querySelectorAll("span");
const errorElements = document.querySelectorAll("small");

// Reset inputs on page reload
window.onload = () => {
  inputs.forEach(input => input.value = "");
};

// Validate inputs
function validateInput(input, label, minValue, maxValue, errorElement, errorMessage) {
  const number = +input.value;
  if (number < minValue || number > maxValue || isNaN(number)) {
    input.classList.add("error-border");
    label.classList.add("error");
    errorElement.textContent = errorMessage;
    return false;
  } else {
    input.classList.remove("error-border");
    label.classList.remove("error");
    errorElement.textContent = "";
    return true;
  }
}

// Handle each input separately
function handleDayInput() {
  validateInput(dayInput, labels[0], 1, 31, dayError, "Must be a valid day");
}

function handleMonthInput() {
  validateInput(monthInput, labels[1], 1, 12, monthError, "Must be a valid month");
}

function handleYearInput() {
  validateInput(yearInput, labels[2], 1, 2023, yearError, "Must be in the past");
}

// Getet the number of days in specific month, depending on a year/leap year
function getMaxDaysForMonth(month, year) {
  const monthsWith31Days = [1, 3, 5, 7, 8, 10, 12];
  const monthsWith30Days = [4, 6, 9, 11];

  //February
  if (month === 2) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      return 29;
    } else {
      return 28;
    }
  } else if (monthsWith31Days.includes(month)) {
    return 31;
  } else if (monthsWith30Days.includes(month)) {
    return 30;
  }
}

// Calculate
function calculateAge() {
  // Remove the 'output-number-animate' class from the elements(so the class/animation can be added again)
  removeOutputAnimation(dayOutput);
  removeOutputAnimation(monthOutput);
  removeOutputAnimation(yearOutput);

  let isValid = true; /* 
    Reset isValid variable for each calculation(after each click, the function assumes
     that the input is valid until it encounters an error during the validation process)
     */

  isValid = validateInput(dayInput, labels[0], 1, 31, dayError, "Must be a valid day") && isValid;
  isValid = validateInput(monthInput, labels[1], 1, 12, monthError, "Must be a valid month") && isValid;
  isValid = validateInput(yearInput, labels[2], 1, 2023, yearError, "Must be in the past") && isValid;

  if (!isValid || !dayInput.value || !monthInput.value || !yearInput.value) {
    displayError("Must be a valid date");
    return;
  }

  const day = +dayInput.value;
  const month = +monthInput.value;
  const year = +yearInput.value;

  if (day > getMaxDaysForMonth(month, year)) {
    displayError("Invalid day for the selected month");
    return;
  }

  const birthDateString = `${monthInput.value}/${dayInput.value}/${yearInput.value}`;
  const birthDate = new Date(birthDateString);

  const totalMilliseconds = Date.now() - birthDate;
  const ageDate = new Date(totalMilliseconds);

  const ageDays = ageDate.getUTCDay();
  const ageMonths = ageDate.getUTCMonth();
  const ageYears = ageDate.getUTCFullYear() - 1970;

 
  setTimeout(() => {
    animateOutputNumbers(dayOutput);
    animateOutputNumbers(monthOutput);
    animateOutputNumbers(yearOutput);
  }, 20); // Delay adding animation to output numbers to ensure the class is removed first

   // output result
  dayOutput.textContent = ageDays;
  monthOutput.textContent = ageMonths;
  yearOutput.textContent = ageYears;

  resetInputs();
}

function animateOutputNumbers(element) {
  element.classList.add("output-number-animate");
}

function removeOutputAnimation(element) {
  element.classList.remove("output-number-animate");
}

function displayError(errorMessage) {
  inputs.forEach((input) => input.classList.add("error-border"));
  labels.forEach((label) => label.classList.add("error"));
  errorModal.style.display = "flex";
  backdrop.style.display = "block";
  dayError.textContent = errorMessage;
  monthError.textContent = "";
  yearError.textContent = "";
}

function resetInputs() {
  inputs.forEach(input => input.classList.remove("error-border"));
  labels.forEach(label => label.classList.remove("error"));
  inputs.forEach(input => input.value = "");
  errorElements.forEach(errorElement => errorElement.textContent = "");
  errorModal.style.display = "none";
  backdrop.style.display = "none";
}

// Event Listeners
dayInput.addEventListener("input", handleDayInput);
monthInput.addEventListener("input", handleMonthInput);
yearInput.addEventListener("input", handleYearInput);
submitButton.addEventListener("click", calculateAge);
backdrop.addEventListener("click", resetInputs);
errorModalButton.addEventListener("click", resetInputs);
