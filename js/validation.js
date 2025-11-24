// Input Validation Functions

export const validateInput = (input, label, min, max, errorElement, msg) => {
  const value = Number(input.value);
  const hasError = isNaN(value) || value < min || value > max;

  label.classList.toggle("error", hasError);
  input.classList.toggle("error-border", hasError);
  errorElement.textContent = hasError ? msg : "";

  return !hasError;
};

export const validateDay = (dayInput, labels, errorMessages) =>
  validateInput(
    dayInput,
    labels[0],
    1,
    31,
    errorMessages[0],
    "Must be a valid day"
  );

export const validateMonth = (monthInput, labels, errorMessages) =>
  validateInput(
    monthInput,
    labels[1],
    1,
    12,
    errorMessages[1],
    "Must be a valid month"
  );

export const validateYear = (yearInput, labels, errorMessages) =>
  validateInput(
    yearInput,
    labels[2],
    1,
    new Date().getFullYear(),
    errorMessages[2],
    "Must be in the past"
  );
