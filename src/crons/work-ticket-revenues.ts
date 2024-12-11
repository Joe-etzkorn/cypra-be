import WorkTicketRevenue from "../models/work-ticket-revenue.model";
import { getDataPerPageAndDateField } from "./common";

const getWorkTicketRevenues = async (companyId: number, accessToken: string) => {
  try {
    console.log('-- Work Ticket Revenues getting data.....');

    // let workTicketRevenues = await getAllDataPerPageAndDateField(accessToken, 'WorkTicketRevenues', 'CreatedDateTime');
    let workTicketRevenues = await getDataPerPageAndDateField(
      accessToken,
      'WorkTicketRevenues',
      'CreatedDateTime',
      '2024-01-01T00:00:00.000Z',
      '2024-12-31T23:59:59.999Z',
    );

    if (!workTicketRevenues) {
      console.log('-- No new Work Ticket Revenues returned');
      return;
    }

    for (const workTicketRevenue of workTicketRevenues) {
      await WorkTicketRevenue.upsert({
        companyId: companyId,
        workTicketRevenueId: workTicketRevenue.WorkTicketRevenueID,
        revenueMonth: workTicketRevenue.RevenueMonth,
        revenueAmount: workTicketRevenue.RevenueAmount,
        createdDateTime: workTicketRevenue.CreatedDateTime,
        accountingPeriodName: workTicketRevenue.AccountingPeriodName,
        accountingPeriodYear: workTicketRevenue.AccountingPeriodYear,
        accountingPeriodId: workTicketRevenue.AccountingPeriodID,
      });
    }

  } catch (error) {
    console.error('Error while pulling data from Aspire API:', error);
  }
};

export default getWorkTicketRevenues;
