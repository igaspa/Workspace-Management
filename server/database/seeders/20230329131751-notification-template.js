'use strict';
const { tableName } = require('../../utils/constants');
const { notificationTemplates, notificationNames } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      tableName.notificationTemplate,
      [
        {
          id: notificationTemplates.createdReservationTemplate,
          name: notificationNames.reservationCreated,
          template: {
            title: 'Workspace Management: You reservation has been confirmed!',
            body: `<body style="background-color:white">
          <table align="center" border="0" cellpadding="0" cellspacing="0" 
                 width="600" bgcolor="AliceBlue">
              <tbody>
                  <tr>
                      <td align="center">
                          <br />
                          <table align="center" border="0" cellpadding="50"
                                 cellspacing="0" class="col-550" width="550">
                              <tbody>
                                <h3>Dear {userName},</h3>
    
                                <p><b>{workspaceName}</b> you have reserved for: <br><br> <b>{dateTime}</b> <br> has been confirmed.</p><br>

                                Thank you for your reservation,<br>
                        
                                <em>Workspace Management</em>
                              </tbody>
                          </table>
                      </td>
                  </tr>
              </tbody>
          </table>
        </body>`
          },
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: notificationTemplates.updatedReservationTemplate,
          name: notificationNames.reservationUpdate,
          template: {
            title: 'Workspace Management: You reservation has been updated!',
            body: `<body style="background-color:white">
          <table align="center" border="0" cellpadding="0" cellspacing="0" 
                 width="600" bgcolor="AliceBlue">
              <tbody>
                  <tr>
                      <td align="center">
                          <br />
                          <table align="center" border="0" cellpadding="50"
                                 cellspacing="0" class="col-550" width="550">
                              <tbody>
                                <h3>Dear {userName},</h3>
    
                                <p>Reservation for <b>{workspaceName}</b> you have reserved has been updated to:
                                 <br><br> <b>{dateTime}</b>.</p><br>
                      
                                Thank you for your reservation,<br>
                        
                                <em>Workspace Management</em>
                              </tbody>
                          </table>
                      </td>
                  </tr>
              </tbody>
          </table>
        </body>`
          },
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: notificationTemplates.canceledReservationTemplate,
          name: notificationNames.reservationCancel,
          template: {
            title: 'Workspace Management: You reservation has been canceled!',
            body: `<body style="background-color:white">
          <table align="center" border="0" cellpadding="0" cellspacing="0" 
                 width="600" bgcolor="AliceBlue">
              <tbody>
                  <tr>
                      <td align="center">
                          <br />
                          <table align="center" border="0" cellpadding="50"
                                 cellspacing="0" class="col-550" width="550">
                              <tbody>
                                <h3>Dear {userName},</h3>
    
                                <p>Reservation for <b>{workspaceName}</b> at
                                <br> <b>{dateTime}</b> <br>
                                 has been canceled.
                                <br><br>
                                <em>Workspace Management</em>
                              </tbody>
                          </table>
                      </td>
                  </tr>
              </tbody>
          </table>
        </body>`
          },
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: notificationTemplates.createdReservationParticipantTemplate,
          name: notificationNames.reservationCreatedParticipant,
          template: {
            title: 'Workspace Management: Invitation!',
            body: `<body style="background-color:white">
            <table align="center" border="0" cellpadding="0" cellspacing="0" 
                width="600" bgcolor="AliceBlue">
                <tbody>
                    <tr>
                        <td align="center">
                            <br />
                            <table align="center" border="0" cellpadding="50"
                                cellspacing="0" class="col-550" width="550">
                                <tbody>
                                    <h3>Dear {userName},</h3>
        
                                    <p>You have been invited to join the workspace: <br><b>{workspaceName}</b></p>
        
                                    <p>Details:</p>
                                      Date and Time: <b>{dateTime}</b>
                                      Host: <b>{hostName}</b>
                    
                                    <p>Thank you,<br>
                                    Workspace Management</p>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </body>`
          },
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: notificationTemplates.updatedReservationParticipantTemplate,
          name: notificationNames.reservationUpdatedParticipant,
          template: {
            title: 'Workspace Management: Reservation Update',
            body: `<body style="background-color:white">
            <table align="center" border="0" cellpadding="0" cellspacing="0" 
                width="600" bgcolor="AliceBlue">
                <tbody>
                    <tr>
                        <td align="center">
                            <br />
                            <table align="center" border="0" cellpadding="50"
                                cellspacing="0" class="col-550" width="550">
                                <tbody>
                                    <h3>Dear {userName},</h3>
        
                                    <p>There has been an update on reservation you have been invited for the workspace: <br><b>{workspaceName}</b></p><br>
        
                                    <p>Updated Details:</p>
                                    New Date and Time: <b>{dateTime}</b>
                                    Host: <b>{hostName}</b>

                                    <p>Thank you,<br>
                                    Workspace Management</p>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </body>`
          },
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: notificationTemplates.canceledReservationParticipantTemplate,
          name: notificationNames.reservationCanceledParticipant,
          template: {
            title: 'Workspace Management: Reservation Cancellation',
            body: `<body style="background-color:white">
            <table align="center" border="0" cellpadding="0" cellspacing="0" 
                width="600" bgcolor="AliceBlue">
                <tbody>
                    <tr>
                        <td align="center">
                            <br />
                            <table align="center" border="0" cellpadding="50"
                                cellspacing="0" class="col-550" width="550">
                                <tbody>
                                    <h3>Dear {userName},</h3>
        
                                <p>We regret to inform you that reservation for <b>{workspaceName}</b> at
                                <br> <b>{dateTime}</b> <br>
                                 has been canceled.
                                <br><br>
                                <em>Workspace Management</em>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </body>`
          },
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: notificationTemplates.userInvitationTemplate,
          name: notificationNames.userInvitation,
          template: {
            title: 'Workspace Management: Invitation',
            body: `<body style="background-color:white">
            <table align="center" border="0" cellpadding="0" cellspacing="0" 
                   width="600" bgcolor="AliceBlue">
                <tbody>
                    <tr>
                        <td align="center">
                            <br />
                            <table align="center" border="0" cellpadding="50"
                                   cellspacing="0" class="col-550" width="550">
                                <tbody>
                                  <h3>Dear {userName},</h3>
                                  <p>You have been invited to use Workspace Management application!</p>
                                  <p>Please open the link below to create your password.</p>
                                  <p><a href={link}>Create Password</a></p>
                                  <br>
                                  <em>Workspace Management</em>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
          </body>`
          },
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: notificationTemplates.userPasswordResetTemplate,
          name: notificationNames.userPasswordReset,
          template: {
            title: 'Workspace Management: PasswordReset',
            body: `<body style="background-color:white">
            <table align="center" border="0" cellpadding="0" cellspacing="0" 
                   width="600" bgcolor="AliceBlue">
                <tbody>
                    <tr>
                        <td align="center">
                            <br />
                            <table align="center" border="0" cellpadding="50"
                                   cellspacing="0" class="col-550" width="550">
                                <tbody>
                                  <h3>Dear {userName},</h3>
                                  <p>Please open the link below to reset your password.</p>
                                  <p>If you did not request to reset your password, ignore this message.</p>
                                  <p><a href={link}>Reset Password</a></p>
                                  <br>
                                  <em>Workspace Management</em>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
          </body>`
          },
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {},
      { template: { type: new Sequelize.JSONB() } }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete(tableName.notificationTemplate, null, {});
  }
};
