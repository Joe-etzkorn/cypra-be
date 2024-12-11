import ReceiptItem from '../models/receipt-item.model';
import Receipt from '../models/receipt.model';
import { getDataPerPageAndDateField } from './common';

const getReceipts = async (companyId: number, accessToken: string) => {
  try {
    console.log('-- Receipts getting data.....');

    // let receipts = await getAllDataPerPageAndDateField(accessToken, 'Receipts', 'CreatedDateTime');
    let receipts = await getDataPerPageAndDateField(
      accessToken,
      'Receipts',
      'CreatedDateTime',
      '2024-01-01T00:00:00.000Z',
      '2024-12-31T23:59:59.999Z',
    );

    if (!receipts) {
      console.log('-- No new Receipts returned');
      return;
    }

    for (const receipt of receipts) {
      await Receipt.upsert({
        companyId: companyId,
        receiptId: receipt.ReceiptID,
        branchId: receipt.BranchID,
        branchName: receipt.BranchName,
        vendorId: receipt.VendorID,
        receiptNumber: receipt.ReceiptNumber,
        vendorInvoiceDate: receipt.VendorInvoiceDate,
        receiptStatusName: receipt.ReceiptStatusName,
        workTicketId: receipt.WorkTicketID,
        workTicketNumber: receipt.WorkTicketNumber,
        createdDateTime: receipt.CreatedDateTime,
        lastModifiedDateTime: receipt.LastModifiedDateTime,
        receivedDate: receipt.ReceivedDate,
        approvedDate: receipt.ApprovedDate,
        receiptTotalCost: receipt.ReceiptTotalCost,
        opportunityId: receipt.OpportunityID,
        opportunityNumber: receipt.OpportunityNumber,
      });
      if (receipt.ReceiptItems.length === 0) continue;

      for (const receiptItem of receipt.ReceiptItems) {
        await ReceiptItem.upsert({
          companyId: companyId,
          receiptId: receipt.ReceiptID,
          receiptItemId: receiptItem.ReceiptItemID,
          catalogItemId: receiptItem.CatalogItemID,
          catalogItemName: receiptItem.CatalogItemName,
          itemName: receiptItem.ItemName,
          itemQuantity: receiptItem.ItemQuantity,
          itemUnitCost: receiptItem.ItemUnitCost,
          itemExtendedCost: receiptItem.ItemExtendedCost,
          itemType: receiptItem.ItemType,
          itemEstUnitCost: receiptItem.ItemEstUnitCost,
          receivedQuantity: receiptItem.ReceivedQuantity,
          catalogItemCategoryId: receiptItem.CatalogItemCategoryID,
        });
      }
    }
  } catch (error) {
    console.error('Error while pulling Receipts data from Aspire API:', error);
  }
};

export default getReceipts;
