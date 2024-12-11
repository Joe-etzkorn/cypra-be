import OpportunityServiceDefaultPayCode from '../models/opportunity-service-default-pay-code.model';
import OpportunityServiceItem from '../models/opportunity-service-item.model';
import OpportunityServiceRoute from '../models/opportunity-service-route.model';
import OpportunityService from '../models/opportunity-service.model';
import sendAspireRequest from '../utils/aspire-request';
import { getDataPerPageAndDateField } from './common';

const getOpportunityServices = async (
  companyId: number,
  accessToken: string,
) => {
  try {
    console.log('-- Opportunity Services getting data.....');

    // let opportunityServices = await getAllDataPerPageAndDateField(accessToken, 'OpportunityServices', 'CreatedDateTime');
    let opportunityServices = await getDataPerPageAndDateField(
      accessToken,
      'OpportunityServices',
      'CreatedDateTime',
      '2024-01-01T00:00:00.000Z',
      '2024-12-31T23:59:59.999Z',
    );

    if (!opportunityServices) {
      console.log('-- No new Opportunity Services returned');
      return;
    }

    for (const service of opportunityServices) {
      await OpportunityService.upsert({
        companyId: companyId,
        opportunityServiceId: service.OpportunityServiceID,
        opportunityServiceGroupId: service.OpportunityServiceGroupID,
        branchId: service.BranchID,
        branchName: service.BranchName,
        serviceId: service.ServiceID,
        displayName: service.DisplayName,
        serviceDescription: service.ServiceDescription,
        operationNotes: service.OperationNotes,
        occur: service.Occur,
        invoiceType: service.InvoiceType,
        asNeeded: service.AsNeeded,
        complexityPercent: service.ComplexityPercent,
        perHours: service.PerHours,
        extendedHours: service.ExtendedHours,
        perPrice: service.PerPrice,
        extendedPrice: service.ExtendedPrice,
        laborTaxable: service.LaborTaxable,
        materialTaxable: service.MaterialTaxable,
        equipmentTaxable: service.EquipmentTaxable,
        subTaxable: service.SubTaxable,
        otherTaxable: service.OtherTaxable,
        sortOrder: service.SortOrder,
        tmMaterialMarkupPercent: service.TMMaterialMarkupPercent,
        laborMarkup: service.LaborMarkup,
        materialMarkup: service.MaterialMarkup,
        equipmentMarkup: service.EquipmentMarkup,
        subMarkup: service.SubMarkup,
        otherMarkup: service.OtherMarkup,
        netProfitPercent: service.NetProfitPercent,
        laborExtendedPrice: service.LaborExtendedPrice,
        materialExtendedPrice: service.MaterialExtendedPrice,
        equipmentExtendedPrice: service.EquipmentExtendedPrice,
        subExtendedPrice: service.SubExtendedPrice,
        otherExtendedPrice: service.OtherExtendedPrice,
        taxableExtendedPrice: service.TaxableExtendedPrice,
        laborPerExtendedCost: service.LaborPerExtendedCost,
        materialPerExtendedCost: service.MaterialPerExtendedCost,
        equipmentPerExtendedCost: service.EquipmentPerExtendedCost,
        subPerExtendedCost: service.SubPerExtendedCost,
        otherPerExtendedCost: service.OtherPerExtendedCost,
        opportunityId: service.OpportunityID,
        minimumPrice: service.MinimumPrice,
        createdDateTime: service.CreatedDateTime,
        lastModifiedDateTime: service.LastModifiedDateTime,
      });

      if (service.OpportunityServiceRoutes.length > 0) {
        for (const opportunityServiceRoute of service.OpportunityServiceRoutes) {
          await OpportunityServiceRoute.upsert({
            companyId: companyId,
            opportunityServiceId: service.OpportunityServiceID,
            routeId: opportunityServiceRoute.RouteID,
            routeName: opportunityServiceRoute.RouteName,
          });
        }
      }

      if (service.OpportunityServiceDefaultPayCodes.length > 0) {
        for (const opportunityServiceDefaultPayCode of service.OpportunityServiceDefaultPayCodes) {
          await OpportunityServiceDefaultPayCode.upsert({
            companyId,
            opportunityServiceId: service.OpportunityServiceID, 
            opportunityServiceDefaultPayCodeId: opportunityServiceDefaultPayCode.OpportunityServiceDefaultPayCodeId, 
            payCodeId: opportunityServiceDefaultPayCode.PayCodeId, 
            payScheduleId: opportunityServiceDefaultPayCode.PayScheduleId, 
          })
        }
      }
      const opportunityServiceItems = await sendAspireRequest(
        'GET',
        `/OpportunityServiceItems?%24filter=OpportunityServiceID%20eq%20${service.OpportunityServiceID}`,
        null,
        accessToken,
      );

      for (const opportunityServiceItem of opportunityServiceItems) {
        await OpportunityServiceItem.upsert({
          companyId: companyId,
          opportunityServiceItemId:
            opportunityServiceItem.OpportunityServiceItemID,
          opportunityServiceId: opportunityServiceItem.OpportunityServiceID,
          catalogItemId: opportunityServiceItem.CatalogItemID,
          itemName: opportunityServiceItem.ItemName,
          itemDescription: opportunityServiceItem.ItemDescription,
          itemQuantity: opportunityServiceItem.ItemQuantity,
          itemCost: opportunityServiceItem.ItemCost,
          itemCostOrig: opportunityServiceItem.ItemCostOrig,
          occur: opportunityServiceItem.Occur,
          perPrice: opportunityServiceItem.PerPrice,
          perPriceOverride: opportunityServiceItem.PerPriceOverride,
          extendedPrice: opportunityServiceItem.ExtendedPrice,
          sortOrder: opportunityServiceItem.SortOrder,
          itemType: opportunityServiceItem.ItemType,
          allocationUnitTypeId: opportunityServiceItem.AllocationUnitTypeID,
          allocationUnitTypeName: opportunityServiceItem.AllocationUnitTypeName,
          catalogItemCategoryId: opportunityServiceItem.CatalogItemCategoryID,
          catalogItemCategoryName:
            opportunityServiceItem.CatalogItemCategoryName,
          perHours: opportunityServiceItem.PerHours,
          extendedHours: opportunityServiceItem.ExtendedHours,
          perHoursOrig: opportunityServiceItem.PerHoursOrig,
          overhead: opportunityServiceItem.Overhead,
          breakEven: opportunityServiceItem.BreakEven,
          extendedCost: opportunityServiceItem.ExtendedCost,
          extendedHoursOrig: opportunityServiceItem.ExtendedHoursOrig,
          overridePrice: opportunityServiceItem.OverridePrice,
          unitPriceOverride: opportunityServiceItem.UnitPriceOverride,
          overrideUnitPrice: opportunityServiceItem.OverrideUnitPrice,
          forceUnitPricing: opportunityServiceItem.ForceUnitPricing,
          estimatingNotes: opportunityServiceItem.EstimatingNotes,
          laborExtendedCost: opportunityServiceItem.LaborExtendedCost,
          materialExtendedCost: opportunityServiceItem.MaterialExtendedCost,
          equipmentExtendedCost: opportunityServiceItem.EquipmentExtendedCost,
          subExtendedCost: opportunityServiceItem.SubExtendedCost,
          otherExtendedCost: opportunityServiceItem.OtherExtendedCost,
          laborOverhead: opportunityServiceItem.LaborOverhead,
          materialOverhead: opportunityServiceItem.MaterialOverhead,
          equipmentOverhead: opportunityServiceItem.EquipmentOverhead,
          subOverhead: opportunityServiceItem.SubOverhead,
          otherOverhead: opportunityServiceItem.OtherOverhead,
          laborProfit: opportunityServiceItem.LaborProfit,
          materialProfit: opportunityServiceItem.MaterialProfit,
          equipmentProfit: opportunityServiceItem.EquipmentProfit,
          subProfit: opportunityServiceItem.SubProfit,
          otherProfit: opportunityServiceItem.OtherProfit,
        });
      }
    }
  } catch (error) {
    console.error(
      'Error while pulling Opportunity Services data from Aspire API:',
      error,
    );
  }
};

export default getOpportunityServices;
