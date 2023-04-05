const formatModelName = (modelName) => {
  let formattedModelName = modelName[0].toUpperCase() + modelName.slice(1);

  // Add space before every capital letter
  formattedModelName = formattedModelName.charAt(0) + formattedModelName.slice(1).replace(/([A-Z])/g, ' $1');

  return formattedModelName;
};

const responseMessages = {
  // common functions
  NOT_FOUND: (modelName) => `${formatModelName(modelName)} not found!`,
  NOT_FOUND_JOIN_TABLE: (modelName) => `Combination is not found in a join table ${modelName}`,
  DELETE_SUCCESS: (modelName) => `${formatModelName(modelName)} successfully deleted!`,
  UPDATE_SUCCESS: (modelName) => `${formatModelName(modelName)} successfully updated!`,
  CREATE_SUCCESS: (modelName) => `${formatModelName(modelName)} successfully created!`,
  ASSOCIATION_NOT_FOUND: (association, modelName) => {
    return `Association with '${association}' does not exist on '${formatModelName(modelName)}'`;
  },
  UNIQUE_CONSTRAINT_ERROR: (messageObj) => `${messageObj.table} with this ${messageObj.elements} already exits!`,

  // Constant messages
  INVALID_RESERVATION_START_TIME: 'Invalid reservation start time.',
  MINIMUM_RESERVATION_TIME_ERROR: 'The reservation time range is invalid.',
  MINIMUM_RESERVATION_START_ERROR: 'Reservation start time is below the minimum.',
  INVALID_ID_TYPE: 'Invalid ID type provided!',
  INVALID_NAME_LENGTH: 'Name must have at least 3 characters!',
  UNIQUE_USER_ERROR: 'User with this email already exits!',
  MISSING_AUTHORIZATION: 'Missing authorization from headers!',
  INVALID_TOKEN: 'Invalid token, you are not allowed to view this page!',
  MISSING_EMAIL_OR_PASSWORD: 'Please enter email and password',
  LOGIN_AUTHORIZATION_ERROR: 'Invalid email or password!',
  LOGIN_SUCCESS: 'Successfully logged in!',
  INVALID_PAGE: 'Invalid page requested.',
  INVALID_ACCESS: 'You do not have access to this page.'
};

module.exports = responseMessages;
