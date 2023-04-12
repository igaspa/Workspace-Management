'use strict';
const { tableName } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(tableName.notificationTemplate, [
      {
        id: 'fc06d6a8-15b9-4134-89f9-49e490947f76',
        name: 'reservation_confirmation_template',
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
        id: '855798c2-c224-43df-bc9e-b7b761976674',
        name: 'reservation_updated_template',
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
    
                                <p><b>{workspaceName}</b> you have reserved has been updated to:
                                 <br><br> <b>{dateTime}</b> <br> has been confirmed.</p><br>
                      
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
        id: '174cd318-1a47-41a6-9dff-f7a15bda77fe',
        name: 'reservation_canceled_template',
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
    
                                <p><b>{workspaceName}</b> you have reserved has been canceled.<br><br> 
                      
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
      }
    ], {}, { template: { type: new Sequelize.JSONB() } });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete(tableName.notificationTemplate, null, {});
  }
};
