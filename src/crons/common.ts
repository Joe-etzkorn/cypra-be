import Branch from '../models/branch.model';
import Opportunity from '../models/opportunity.model';
import sendAspireRequest from '../utils/aspire-request';

export const getDataPerPageAndDateField = async (
  accessToken: string,
  endpoint: string = '',
  dateField: string = '',
  startDate: string = '',
  endDate: string = '',
) => {
  try {
    let pageNumber = 1;
    let pagedData: any[] = [];
    while (true) {
      console.log(`-- ${endpoint} getting data for page: `, pageNumber);
      const response = await sendAspireRequest(
        'GET',
        `/${endpoint}?%24filter=${dateField}%20gt%20${startDate}%20and%20${dateField}%20lt%20${endDate}&%24pageNumber=${pageNumber}&%24limit=100`,
        null,
        accessToken,
      );
      if (response.length === 0) {
        break;
      }
      pagedData = pagedData.concat(response);
      pageNumber++;
    }

    return pagedData;
  } catch (error) {
    console.error(
      `Error while pulling paged Data ${endpoint} from Aspire API:`,
      error,
    );
  }
};

export const getAllDataPerPageAndDateField = async (
  accessToken: string,
  endpoint: string = 'Opportunities',
  dateField: string = 'CreatedDateTime',
) => {
  try {
    let allData: any[] = [];
    let year = new Date().getFullYear();
    while (true) {
      let startDate = `${year}-01-01T00:00:00.000Z`;
      let endDate = `${year}-12-31T23:59:59.999Z`;

      console.log(`-- ${endpoint} getting data for year: `, year);
      let pagedData = await getDataPerPageAndDateField(
        accessToken,
        endpoint,
        dateField,
        startDate,
        endDate,
      );
      if (pagedData?.length === 0) {
        break;
      }
      allData = allData.concat(pagedData);
      year--;
    }

    return allData;
  } catch (error) {
    console.error(
      `Error while pulling paged Data ${endpoint} from Aspire API:`,
      error,
    );
  }
};
