import Property from '../models/properties.model';
import { getDataPerPageAndDateField } from './common';

const getProperties = async (companyId: number, accessToken: string) => {
  try {
    console.log('-- Properties getting data.....');

    // let properties = await getAllDataPerPageAndDateField(accessToken, 'Properties', 'CreatedDate');
    let properties = await getDataPerPageAndDateField(
      accessToken,
      'Properties',
      'CreatedDate',
      '2024-01-01T00:00:00.000Z',
      '2024-12-31T23:59:59.999Z',
    );

    if (!properties) {
      console.log('-- No new Properties returned');
      return;
    }
    for (const property of properties) {
      await Property.upsert({
        companyId: companyId,
        propertyId: property.PropertyID,
        propertyStatusNumber: property.PropertyStatusName,
        branchName: property.BranchName,
        productionManagerContactName: property.ProductionManagerContactName,
        propertyAddressLine1: property.PropertyAddressLine1,
        propertyAddressLine2: property.PropertyAddressLine2,
        propertyAddressCity: property.PropertyAddressCity,
        propertyAddressStateProvinceCode:
          property.PropertyAddressStateProvinceCode,
        propertyAddressZipCode: property.PropertyAddressZipCode,
        leadSourceName: property.LeadSourceName,
        propertyName: property.PropertyName,
        earliestOpportunityWonDate: property.EarliestOpportunityWonDate,
      });
    }
  } catch (error) {
    console.error('Error while pulling data from Aspire API:', error);
  }
};

export default getProperties;
