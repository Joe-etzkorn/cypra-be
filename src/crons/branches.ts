import Branch from '../models/branch.model';
import sendAspireRequest from '../utils/aspire-request';

const getBranches = async (companyId: number, accessToken: string) => {
  try {
    const branches = await sendAspireRequest(
      'GET',
      '/Branches?%24pageNumber=1&%24limit=100',
      null,
      accessToken,
    );

    for (const branch of branches) {
      await Branch.upsert({
        companyId: companyId,
        branchId: branch.BranchID,
        branchName: branch.BranchName,
      });
    }

    console.log('-- Branches pulled and saved successfully!');
  } catch (error) {
    console.error('Error while pulling data Branches from Aspire API:', error);
  }
};

export default getBranches;
