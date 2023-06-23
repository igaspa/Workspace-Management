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
  canceledReservationTemplate: '07dc7676-a383-460e-893b-2b43444d0901',
  createdReservationParticipantTemplate: '82f4ef25-ce5f-41e7-b69c-4fb90a71b91c',
  updatedReservationParticipantTemplate: '07f94f84-1210-463f-ad66-849a9edda46a',
  canceledReservationParticipantTemplate: '4505ef57-ad78-4584-96f4-251a67c2e078',
  userInvitationTemplate: '2a4b415d-f93c-487d-8f45-46b61fe56439',
  userPasswordResetTemplate: '8771f0f6-cf9a-43db-9538-af765b5678ec'
};

module.exports.notificationNames = {
  reservationCreated: 'reservation_created_template',
  reservationUpdate: 'reservation_updated_template',
  reservationCancel: 'reservation_canceled_template',
  reservationCreatedParticipant: 'reservation_created_participant_template',
  reservationUpdatedParticipant: 'reservation_updated_participant_template',
  reservationCanceledParticipant: 'reservation_canceled_participant_template',
  userInvitation: 'user_invitation_template',
  userPasswordReset: 'user_password_reset_template'
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
