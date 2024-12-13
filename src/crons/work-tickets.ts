import WorkTicket from "../models/work-ticket.model";
import { getAllDataPerPageAndDateField, getDataPerPageAndDateField } from "./common";

const getWorkTickets = async (companyId: number, accessToken: string) => {
  try {
    console.log('-- Work Tickets getting data.....');

    // let workTickets = await getAllDataPerPageAndDateField(accessToken, 'WorkTickets', 'CreatedDateTime');
    let workTickets = await getDataPerPageAndDateField(
      accessToken,
      'WorkTickets',
      'CreatedDateTime',
      '2024-01-01T00:00:00.000Z',
      '2024-12-31T23:59:59.999Z',
    );

    if (!workTickets) {
      console.log('-- No new Work Tickets returned');
      return;
    }

    for (const workTicket of workTickets) {
      await WorkTicket.upsert({
        companyId: companyId,
        workTicketId: workTicket.WorkTicketID,
        opportunityServiceId: workTicket.OpportunityServiceID,
        contractYear: workTicket.ContractYear,
        occur: workTicket.Occur,
        annualizedOccur: workTicket.AnnualizedOccur,
        createdDateTime: workTicket.CreatedDateTime,
        anticStartDate: workTicket.AnticStartDate,
        scheduledStartDate: workTicket.ScheduledStartDate,
        completeDate: workTicket.CompleteDate,
        approvedDate: workTicket.ApprovedDate,
        workTicketStatusId: workTicket.WorkTicketStatusID,
        workTicketStatusName: workTicket.WorkTicketStatusName,
        crewLeaderContactId: workTicket.CrewLeaderContactID,
        crewLeaderContactName: workTicket.CrewLeaderName,
        hoursEst: workTicket.HoursEst,
        hourCostEst: workTicket.HourCostEst,
        materialCostEst: workTicket.MaterialCostEst,
        equipCostEst: workTicket.EquipCostEst,
        subCostEst: workTicket.SubCostEst,
        otherCostEst: workTicket.OtherCostEst,
        price: workTicket.Price,
        tmCalcAmount: workTicket.TMCalcAmount,
        tmOverrideAmount: workTicket.TMOverrideAmount,
        invoicedAmount: workTicket.InvoicedAmount,
        workTicketNumber: workTicket.WorkTicketNumber,
        hoursAct: workTicket.HoursAct,
        warrantyHoursAct: workTicket.WarrantyHoursAct,
        laborCostAct: workTicket.LaborCostAct,
        materialCostAct: workTicket.MaterialCostAct,
        equipmentCostAct: workTicket.EquipmentCostAct,
        subCostAct: workTicket.SubCostAct,
        otherCostAct: workTicket.OtherCostAct,
        totalCostAct: workTicket.TotalCostAct,
        earnedRevenue: workTicket.EarnedRevenue,
        realizeRateRevenue: workTicket.RealizeRateRevenue,
        opportunityId: workTicket.OpportunityID,
        opportunityNumber: workTicket.OpportunityNumber,
        estRealizeRateRevenue: workTicket.EstRealizeRateRevenue,
        distributedHours: workTicket.DistributedHours,
        partialOccurence: workTicket.PartialOccurence,
        branchName: workTicket.BranchName,
        lastModifiedDateTime: workTicket.LastModifiedDateTime,
        workTicketStatus: workTicket.WorkTicketStatus,
        hoursScheduled: workTicket.HoursScheduled,
        hoursUnscheduled: workTicket.HoursUnscheduled,
        reviewedDateTime: workTicket.ReviewedDateTime,
        reviewedUserId: workTicket.ReviewedUserID,
        reviewedUserName: workTicket.ReviewedUserName,
        propertyId: workTicket.PropertyID
      });
    }

  } catch (error) {
    console.error('Error while pulling data from Aspire API:', error);
  }
};

export default getWorkTickets;
