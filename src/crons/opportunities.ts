import Branch from '../models/branch.model';
import Opportunity from '../models/opportunity.model';
import sendAspireRequest from '../utils/aspire-request';
import {
  getAllDataPerPageAndDateField,
  getDataPerPageAndDateField,
} from './common';

const getOpportunities = async (companyId: number, accessToken: string) => {
  try {
    console.log('-- Opportunities getting data.....');
    // let opportunities = await getAllDataPerPageAndDateField(accessToken, 'Opportunities', 'CreatedDateTime');
    let opportunities = await getDataPerPageAndDateField(
      accessToken,
      'Opportunities',
      'CreatedDateTime',
      '2024-01-01T00:00:00.000Z',
      '2024-12-31T23:59:59.999Z',
    );

    if (!opportunities) {
      console.log('-- No new Opportunities returned');
      return;
    }

    for (const opportunity of opportunities) {
      Opportunity.upsert({
        companyId: companyId,
        opportunityId: opportunity.OpportunityID,
        propertyId: opportunity.PropertyID,
        opportunityStatusId: opportunity.OpportunityStatusID,
        opportunityStatusName: opportunity.OpportunityStatusName,
        salesRepContactId: opportunity.SalesRepContactID,
        salesRepContactName: opportunity.SalesRepContactName,
        operationsManagerContactId: opportunity.OperationsManagerContactID,
        operationsManagerContactName: opportunity.OperationsManagerContactName,
        divisionId: opportunity.DivisionID,
        divisionName: opportunity.DivisionName,
        branchId: opportunity.BranchID,
        branchName: opportunity.BranchName,
        salesTypeName: opportunity.SalesTypeName,
        leadSourceName: opportunity.LeadSourceName,
        masterOpportunityId: opportunity.MasterOpportunityID,
        opportunityType: opportunity.OpportunityType,
        startDate: opportunity.StartDate,
        endDate: opportunity.EndDate,
        approvedDate: opportunity.ApprovedDate,
        proposedDate: opportunity.ProposedDate,
        wonDate: opportunity.WonDate,
        lostDate: opportunity.LostDate,
        probability: opportunity.Probability,
        anticipatedCloseDate: opportunity.AnticipatedCloseDate,
        invoiceType: opportunity.InvoiceType,
        estimatedDollars: opportunity.EstimatedDollars,
        createdByUserName: opportunity.CreatedByUserName,
        createdByUserId: opportunity.CreatedByUserID,
        approvedUserId: opportunity.ApprovedUserID,
        approvedUserName: opportunity.ApprovedUserName,
        closedUserId: opportunity.ClosedUserID,
        closedUserName: opportunity.ClosedUserName,
        competitorName: opportunity.CompetitorName,
        lostReason: opportunity.LostReason,
        opportunityNumber: opportunity.OpportunityNumber,
        estimatedCostDollars: opportunity.EstimatedCostDollars,
        estimatedOverheadDollars: opportunity.EstimatedOverheadDollars,
        estimatedBreakEvenDollars: opportunity.EstimatedBreakEvenDollars,
        estimatedNetProfitPercent: opportunity.EstimatedNetProfitPercent,
        estimatedGrossMarginPercent: opportunity.EstimatedGrossMarginPercent,
        estimatedGrossMarginDollars: opportunity.EstimatedGrossMarginDollars,
        estimatedLaborHours: opportunity.EstimatedLaborHours,
        estimatedLaborCostPerHour: opportunity.EstimatedLaborCostPerHour,
        estimatedRealizeRate: opportunity.EstimatedRealizeRate,
        estimatedEquipmentCost: opportunity.EstimatedEquipmentCost,
        estimatedLaborCost: opportunity.EstimatedLaborCost,
        estimatedMaterialCost: opportunity.EstimatedMaterialCost,
        estimatedOtherCost: opportunity.EstimatedOtherCost,
        estimatedSubCost: opportunity.EstimatedSubCost,
        actualCostDollars: opportunity.ActualCostDollars,
        actualGrossMarginPercent: opportunity.ActualGrossMarginPercent,
        actualGrossMarginDollars: opportunity.ActualGrossMarginDollars,
        actualLaborHours: opportunity.ActualLaborHours,
        actualLaborCostPerHour: opportunity.ActualLaborCostPerHour,
        actualEarnedRevenue: opportunity.ActualEarnedRevenue,
        percentComplete: opportunity.PercentComplete,
        renewalDate: opportunity.RenewalDate,
        modifiedDate: opportunity.ModifiedDate,
        jobStatusName: opportunity.JobStatusName,
        propertyName: opportunity.PropertyName,
        actualCostSub: opportunity.ActualCostSub,
        actualCostMaterial: opportunity.ActualCostMaterial,
        actualCostLabor: opportunity.ActualCostLabor,
        completeDate: opportunity.CompleteDate,
        opportunityStageId: opportunity.OpportunityStageID,
        opportunityStageName: opportunity.OpportunityStageName,
        opportunityStage: opportunity.OpportunityStage,
        opportunityStatus: opportunity.OpportunityStatus,
      });
    }

    console.log('-- Opportunities pulled and saved successfully!');
  } catch (error) {
    console.error(
      'Error while pulling data Opportunities from Aspire API:',
      error,
    );
  }
};

export default getOpportunities;
