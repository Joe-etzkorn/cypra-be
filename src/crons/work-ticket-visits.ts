import WorkTicketVisit from '../models/work-ticket-visit.model';
import sendAspireRequest from '../utils/aspire-request';
import { getDataPerPageAndDateField } from './common';

const getWorkTicketVisits = async (companyId: number, accessToken: string) => {
  try {
    console.log('-- Work Ticket Visits getting data.....');

    const workTicketVisits = await sendAspireRequest(
      'GET',
      '/WorkTicketVisits',
      null,
      accessToken,
    );
    if (!workTicketVisits) {
      console.log('-- No new Work Ticket Visits returned');
      return;
    }

    for (const visit of workTicketVisits) {
      await WorkTicketVisit.upsert({
        companyId: companyId,
        workTicketVisitId: visit.WorkTicketVisitID,
        routeId: visit.RouteID,
        scheduledDate: visit.ScheduledDate,
        sequenceNum: visit.SequenceNum,
        workTicketId: visit.WorkTicketID,
        hours: visit.Hours,
        routeName: visit.RouteName,
        workTicketNumber: visit.WorkTicketNumber,
      });
    }
  } catch (error) {
    console.error('Error while pulling Work Ticket Visits data from Aspire API:', error);
  }
};

export default getWorkTicketVisits; 