import Invoice from '../models/invoice.model';
import { getDataPerPageAndDateField } from './common';

const getInvoices = async (companyId: number, accessToken: string) => {
  try {
    console.log('-- Invoices getting data.....');

    // let invoices = await getAllDataPerPageAndDateField(accessToken, 'Invoices', 'CreatedDateTime');
    let invoices = await getDataPerPageAndDateField(
      accessToken,
      'Invoices',
      'InvoiceDate',
      '2024-01-01T00:00:00.000Z',
      '2024-12-31T23:59:59.999Z',
    );

    if (!invoices) {
      console.log('-- No new Invoices returned');
      return;
    }

    for (const invoice of invoices) {
      await Invoice.upsert({
        companyId: companyId,
        invoiceId: invoice.InvoiceID,
        invoiceBatchId: invoice.InvoiceBatchID,
        invoiceBatchNumber: invoice.InvoiceBatchNumber,
        invoiceAccountingPeriod: invoice.InvoiceAccountingPeriod,
        branchId: invoice.BranchID,
        branchName: invoice.BranchName,
        branchCode: invoice.BranchCode,
        propertyId: invoice.PropertyID,
        propertyName: invoice.PropertyName,
        primaryContactId: invoice.PrimaryContactID,
        primaryContactName: invoice.PrimaryContactName,
        billingContactId: invoice.BillingContactID,
        billingContactName: invoice.BillingContactName,
        invoiceNumber: invoice.InvoiceNumber,
        invoiceDate: invoice.InvoiceDate,
        amount: invoice.Amount,
        invoiceAddressId: invoice.InvoiceAddressID,
        addressLine1: invoice.AddressLine1,
        addressLine2: invoice.AddressLine2,
        city: invoice.City,
        stateProvinceCode: invoice.StateProvinceCode,
        zipCode: invoice.ZipCode,
        amountRemaining: invoice.AmountRemaining,
        origAmount: invoice.OrigAmount,
        paymentTermsId: invoice.PaymentTermsID,
        paymentTermsName: invoice.PaymentTermsName,
        invoiceNote: invoice.InvoiceNote,
        emailStatus: invoice.EmailStatus,
        dueDate: invoice.DueDate,
        reportLayoutId: invoice.ReportLayoutID,
        reportLayoutName: invoice.ReportLayoutName,
        taxJurisdictionId: invoice.TaxJurisdictionID,
        taxJurisdictionName: invoice.TaxJurisdictionName,
        invoiceNumberPrefix: invoice.InvoiceNumberPrefix,
        lastModifiedDateTime: invoice.LastModifiedDateTime,
        lastModifiedByUserId: invoice.LastModifiedByUserID,
        lastModifiedByUserName: invoice.LastModifiedByUserName,
        completedDateTime: invoice.CompletedDateTime,
      });
    }
  } catch (error) {
    console.error('Error while pulling Invoices data from Aspire API:', error);
  }
};

export default getInvoices; 