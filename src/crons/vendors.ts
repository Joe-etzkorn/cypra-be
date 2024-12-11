import Vendor from '../models/vendor.model';
import { getDataPerPageAndDateField } from './common';

const getVendors = async (companyId: number, accessToken: string) => {
  try {
    console.log('-- Vendors getting data.....');

    // let vendors = await getAllDataPerPageAndDateField(accessToken, 'Vendors', 'CreatedDateTime');
    let vendors = await getDataPerPageAndDateField(
      accessToken,
      'Vendors',
      'CreatedDateTime',
      '2024-01-01T00:00:00.000Z',
      '2024-12-31T23:59:59.999Z',
    );

    if (!vendors) {
      console.log('-- No new Vendors returned');
      return;
    }

    for (const vendor of vendors) {
      await Vendor.upsert({
        companyId: companyId,
        vendorId: vendor.VendorID,
        vendorName: vendor.VendorName,
        vendorNumber: vendor.VendorNumber,
        active: vendor.Active,
        createdDateTime: vendor.CreatedDateTime,
        lastModifiedDateTime: vendor.LastModifiedDateTime,
      });
    }
  } catch (error) {
    console.error('Error while pulling Vendors data from Aspire API:', error);
  }
};

export default getVendors; 