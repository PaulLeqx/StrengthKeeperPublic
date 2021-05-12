export const REQUEST_VALIDATION_EMAIL = 'REQUEST_VALIDATION_EMAIL';
export const requestValidationEmail = (activationToken) => ({
  type: REQUEST_VALIDATION_EMAIL,
  activationToken,
});