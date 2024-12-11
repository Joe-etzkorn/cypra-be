import cron from 'node-cron';
import pullDataFromAspire from './pull-data-from-aspire';

cron.schedule('* * * * *', async () => {
  console.log('Starting scheduled Aspire data pull...');
  await pullDataFromAspire();
});

console.log('Cron job for Aspire API data pull has been scheduled.');
