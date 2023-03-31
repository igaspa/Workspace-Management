const responseMessages = {
  // common functions
  NOT_FOUND: (modelName) => `${modelName} not found!`,
  NOT_FOUND_JOIN_TABLE: (modelName) => `Combination is not found in a join table ${modelName}`,
  DELETE_SUCCESS: (modelName) => `${modelName} successfully deleted!`,
  UPDATE_SUCCESS: (modelName) => `${modelName} successfully updated!`,
  CREATE_SUCCESS: (modelName) => `${modelName} successfully created!`,
  ASSOCIATION_NOT_FOUND: (association, modelName) => {
    return `Association with '${association}' does not exist on '${modelName}'`;
  },

  // Constant messages
  INVALID_ID_TYPE: 'Invalid ID type provided!',
  INVALID_NAME_LENGTH: 'Name must have at least 3 characters!',
  UNIQUE_USER_ERROR: 'User with this email already exits!',
  MISSING_AUTHORIZATION: 'Missing authorization from headers!',
  INVALID_TOKEN: 'Invalid token, you are not allowed to view this page!',
  LOGIN_AUTHORIZATION_ERROR: 'Invalid email or password!',
  LOGIN_SUCCESS: 'Successfully logged in!',
  INVALID_PAGE: 'Invalid page requested'
};

module.exports = responseMessages;
