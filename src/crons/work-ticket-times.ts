import WorkTicketTime from '../models/work-ticket-time.model';
import { getDataPerPageAndDateField } from './common';

const getWorkTicketTimes = async (companyId: number, accessToken: string) => {
  try {
    console.log('-- Work Ticket Times getting data.....');

    // let workTicketTimes = await getAllDataPerPageAndDateField(accessToken, 'WorkTicketTimes', 'LastModifiedDateTime');
    let workTicketTimes = await getDataPerPageAndDateField(
      accessToken,
      'WorkTicketTimes',
      'CreatedDateTime',
      '2024-01-01T00:00:00.000Z',
      '2024-12-31T23:59:59.999Z',
    );

    if (!workTicketTimes) {
      console.log('-- No new Work Ticket Times returned');
      return;
    }

    for (const time of workTicketTimes) {
      await WorkTicketTime.upsert({
        companyId: companyId,
        workTicketTimeId: time.WorkTicketTimeID,
        workTicketId: time.WorkTicketID,
        workTicketNumber: time.WorkTicketNumber,
        contactId: time.ContactID,
        contactName: time.ContactName,
        workTicketTimeDate: time.WorkTicketTimeDate,
        startTime: time.StartTime,
        endTime: time.EndTime,
        opportunityServiceLaborRate: time.OpportunityServiceLaborRate,
        hours: time.Hours,
        otHours: time.OTHours,
        warrantyTime: time.WarrantyTime,
        distributedTime: time.DistributedTime,
        burdenedCost: time.BurdenedCost,
        invoiceId: time.InvoiceID,
        invoiceNumber: time.InvoiceNumber,
        createdDateTime: time.CreatedDateTime,
        lastModifiedDateTime: time.LastModifiedDateTime,
        approvedDateTime: time.ApprovedDateTime,
        acceptedDateTime: time.AcceptedDateTime,
        breakTime: time.BreakTime,
        baseHourlyRate: time.BaseHourlyRate,
        routeId: time.RouteID,
        routeName: time.RouteName,
        crewLeaderContactId: time.CrewLeaderContactID,
        crewLeaderContactName: time.CrewLeaderContactName,
        branchId: time.BranchID,
        branchName: time.BranchName,
      });
    }
  } catch (error) {
    console.error('Error while pulling Work Ticket Times data from Aspire API:', error);
  }
};

export default getWorkTicketTimes; 