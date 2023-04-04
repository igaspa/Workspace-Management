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
                                <h3>Dear {customerName},</h3>
    
                                <p>{Space} you have reserved for {datetime} has been confirmed.</p><br>
                      
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

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(tableName.notificationTemplate, null, {});
  }
};
