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
  UPDATE_UNSUCCESSFULL: (modelName) => `Failed to update${formatModelName(modelName)}!`,

  // Constant messages
  UPDATE_STARTED_RESERVATION: 'You cannot updated reservation that has already started.',
  UPDATE_EXPIRED_RESERVATION: 'You cannot updated expired reservation.',
  USER_PERMISSION_ERROR: 'You do not have access for this action.',
  OVERLAP_RESERVATION_CONFLICT: 'This reservations overlaps with one of your existing reservations.',
  WORKSPACE_PERMANENTLY_RESERVED: 'You cannot create new reservations for this workspace, this workspace is permanenlty reserved.',
  PERMANENT_RESERVATION_CONFLICT: 'You cannot create new reservations for this workspace, you already have 1 permanent reservation.',
  DAILY_LIMIT_EXCEDEED: 'You exceeded daily limit of reservations for this workspace type.',
  OVERALL_LIMIT_EXCEDEED: 'You exceeded overall limit of reservations for this workspace type.',
  RESERVATION_UNIQUE_CONSTRAINT_ERROR: 'Another reservation for this workspace exists within the given range.',
  NO_BODY: 'You must not send empty body on this request.',
  INVALID_RESERVATION_INTERVAL: 'Invalid reservation start time.',
  RESERVATION_MAX_TIME_EXCEEDED: 'Reservation time range is larger than maximum.',
  INVALID_ID_TYPE: 'Invalid ID type provided!',
  INVALID_NAME_LENGTH: 'Name must have at least 3 characters!',
  UNIQUE_USER_ERROR: 'User with this email already exits!',
  MISSING_AUTHORIZATION: 'Missing authorization from headers!',
  INVALID_TOKEN: 'Invalid token, you are not allowed to view this page!',
  MISSING_EMAIL_OR_PASSWORD: 'Please enter email and password',
  LOGIN_AUTHORIZATION_ERROR: 'Invalid email or password!',
  LOGIN_SUCCESS: 'Successfully logged in!',
  INVALID_PAGE: 'Invalid page requested',
  INVALID_ACCESS: 'You do not have access to this page',
  RESERVATION_EXISTS: 'There are existing reservations for this workspace. Are you sure you want to delete ?',
  WORKSPACE_PERNAMENT_RESERVATION_CONFLICT: 'You cannot create pernament reservation for this workspace. Workspace is already reserved.',
  USER_PERNAMENT_RESERVATION_CONFLICT: 'You cannot create pernament reservation for this user. User already has 1 pernament reservation.',
  CREATE_UNSUCCESSFULL_INTERNAL: 'Creation unsuccessfull. Please try again later, we are facing an issue on our side.'
};

module.exports = responseMessages;
