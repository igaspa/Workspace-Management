module.exports.schemeName = 'table_management';
module.exports.notificationStatus = {
  failed: 'failed',
  sent: 'sent'
};
module.exports.EXCLUDE_LIST = ['createdAt', 'updatedAt', 'deletedAt', 'password'];

module.exports.paginationValues = {
  DEFAULT_LIMIT: 25,
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
  userRole: 'user_role'
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
  roleUser: 'user_user_role'
};
