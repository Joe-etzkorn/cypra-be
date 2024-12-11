import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db';
import sendAspireRequest from '../utils/aspire-request';
import User from '../models/user.model';
import Branch from '../models/branch.model';
import getBranches from './branches';
import getDivisions from './divisions';
import getOpportunities from './opportunities';
import getOpportunityServices from './opportunity-services';
import getReceipts from './receipts';
import getWorkTickets from './work-tickets';
import getItemAllocations from './item-allocations';
import getProperties from './properties';
import getServices from './services';
import getVendors from './vendors';
import getWorkTicketTimes from './work-ticket-times';
import getWorkTicketVisits from './work-ticket-visits';
import getInvoices from './invoices';
import getWorkTicketRevenues from './work-ticket-revenues';

const pullDataFromAspire = async () => {
  try {
    console.log('Pulling data from Aspire API...');

    const users = await User.findAll({
      where: {
        roleId: 2,
      },
      attributes: ['id', 'email', 'roleId', 'clientId', 'clientSecret'],
    });

    if (!users) return;

    for (const user of users) {
      const creds = await sendAspireRequest('POST', '/Authorization', {
        ClientId: user.clientId,
        Secret: user.clientSecret,
      });
      const accessToken = creds.Token;

      getBranches(user.id, accessToken);
      getDivisions(user.id, accessToken);
      getOpportunities(user.id, accessToken);
      getProperties(user.id, accessToken);
      getVendors(user.id, accessToken);
      getWorkTicketVisits(user.id, accessToken);
      getInvoices(user.id, accessToken);
      getItemAllocations(user.id, accessToken);
      getWorkTicketTimes(user.id, accessToken);
      getWorkTickets(user.id, accessToken);
      getWorkTicketRevenues(user.id, accessToken);
      getServices(user.id, accessToken);
      getReceipts(user.id, accessToken);
      getOpportunityServices(user.id, accessToken);
    }
  } catch (error) {
    console.error('Error while pulling data from Aspire API:', error);
  }
};

export default pullDataFromAspire;
