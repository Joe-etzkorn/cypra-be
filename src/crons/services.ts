import Service from '../models/service.model';
import sendAspireRequest from '../utils/aspire-request';
import { getDataPerPageAndDateField } from './common';

const getServices = async (companyId: number, accessToken: string) => {
  try {
    console.log('-- Services getting data.....');

    const services = await sendAspireRequest(
      'GET',
      '/Services',
      null,
      accessToken,
    );

    if (!services) {
      console.log('-- No new Services returned');
      return;
    }

    for (const service of services) {
      await Service.upsert({
        companyId: companyId,
        serviceId: service.ServiceID,
        serviceTypeName: service.ServiceTypeName,
        serviceName: service.ServiceName,
        serviceNameAbr: service.ServiceNameAbr,
        displayName: service.DisplayName,
        active: service.Active,
      });
    }
  } catch (error) {
    console.error('Error while pulling Services data from Aspire API:', error);
  }
};

export default getServices; 