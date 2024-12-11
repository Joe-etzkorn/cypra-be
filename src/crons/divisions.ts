import Division from '../models/division.model';
import sendAspireRequest from '../utils/aspire-request';

const getDivisions = async (companyId: number, accessToken: string) => {
  try {
    const divisions = await sendAspireRequest(
      'GET',
      '/Divisions?%24pageNumber=1&%24limit=100',
      null,
      accessToken,
    );

    for (const division of divisions) {
      await Division.upsert({
        companyId: companyId,
        divisionId: division.DivisionID,
        divisionName: division.DivisionName,
      });
    }
    console.log('-- Divisions pulled and saved successfully!');
  } catch (error) {
    console.error('Error while pulling data Divisions from Aspire API:', error);
  }
};

export default getDivisions;
