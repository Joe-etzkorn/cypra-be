import ItemAllocation from "../models/item-allocations.model";
import { getDataPerPageAndDateField } from "./common";

const getItemAllocations = async (companyId: number, accessToken: string) => {
  try {
    console.log('-- Item Allocations getting data.....');

    // let itemAllocations = await getAllDataPerPageAndDateField(accessToken, 'ItemAllocations', 'CreatedDateTime');
    let itemAllocations = await getDataPerPageAndDateField(
      accessToken,
      'ItemAllocations',
      'CreatedDateTime',
      '2024-01-01T00:00:00.000Z',
      '2024-12-31T23:59:59.999Z',
    );
    if (!itemAllocations) {
      console.log('-- No new Item Allocations returned');
      return;
    }

    for (const itemAllocation of itemAllocations) {
      await ItemAllocation.upsert({
        companyId: companyId,
        workTicketId: itemAllocation.WorkTicketID,
        workTicketNumber: itemAllocation.WorkTicketNumber,
        itemAllocationId: itemAllocation.ItemAllocationID,
        inventoryLocationName: itemAllocation.InventoryLocationName,
        itemName: itemAllocation.ItemName,
        itemType: itemAllocation.ItemType,
        catalogItemId: itemAllocation.CatalogItemID,
        catalogItemName: itemAllocation.CatalogItemName,
        itemQuantity: itemAllocation.ItemQuantity,
        itemUnitCost: itemAllocation.ItemUnitCost,
        itemTotalCost: itemAllocation.ItemTotalCost,
        createdDateTime: itemAllocation.CreatedDateTime,
        acceptedDateTime: itemAllocation.AcceptedDateTime,
        allocationStatus: itemAllocation.AllocationStatus,
        itemAllocationDate: itemAllocation.ItemAllocationDate,
        lastModifiedDateTime: itemAllocation.LastModifiedDateTime,
        subcontractorServicesRenderedDate: itemAllocation.SubcontractorServicesRenderedDate
      });
    }
  } catch (error) {
    console.error('Error while pulling data from Aspire API:', error);
  }
};

export default getItemAllocations;