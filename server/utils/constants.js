module.exports.schemaName = 'workspace_management';
module.exports.EXCLUDE_LIST = ['createdAt', 'updatedAt', 'deletedAt', 'password'];

module.exports.notificationStatus = {
  failed: 'failed',
  sent: 'sent'
};
module.exports.userNotificationAttributes = ['firstName', 'lastName', 'email'];
module.exports.workspaceNotificationAttributes = ['name'];
module.exports.NOTIFICATION_KEY = 'notificationTemplate';

// limit how many workspaces can be created with 1 request
module.exports.MAX_WORKSPACE_CREATION_LIMIT = 200;

module.exports.notificationTemplates = {
  createdReservationTemplate: 'fc06d6a8-15b9-4134-89f9-49e490947f76',
  updatedReservationTemplate: '855798c2-c224-43df-bc9e-b7b761976674',
  userInvitationTemplate: '2a4b415d-f93c-487d-8f45-46b61fe56439'
};

module.exports.notificationNames = {
  reservationConfirmation: 'reservation_confirmation_template',
  reservationUpdate: 'reservation_updated_template',
  userInvitation: 'user_invitation_template'
};

module.exports.paginationValues = {
  DEFAULT_LIMIT: 24,
  DEFAULT_OFFSET: 0,
  DEFAULT_PAGE: 0
};

module.exports.tableName = {
  role: 'role',
  location: 'location',
  area: 'area',
  user: 'user',
  notification: 'notification',
  notificationTemplate: 'notification_template',
  workspaceType: 'workspace_type',
  workspace: 'workspace',
  reservation: 'reservation',
  userRole: 'user_role',
  equipment: 'equipment',
  workspaceEquipment: 'workspace_equipment'
};

module.exports.constraintName = {
  notificationTemplate: 'notification_template',
  notificationReservation: 'notification_reservation',
  reservationUser: 'reservation_user',
  reservationWorkspace: 'reservation_workspace',
  workspaceType: 'workspace_type',
  workspaceArea: 'workspace_area',
  areaLocation: 'area_location',
  userRole: 'role_user_role',
  roleUser: 'user_user_role',
  equipmentWorkspace: 'equipment_workspace',
  workspaceEquipment: 'workspace_equipment'
};
