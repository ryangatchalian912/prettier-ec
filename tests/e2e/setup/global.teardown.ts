import { test as teardown } from '@playwright/test';

teardown('delete lookup data', async ({}) => {
  console.log('deleting lookup data...');
  // Delete the lookup data
});

teardown('delete test master data', async ({}) => {
  console.log('deleting test master data...');
  // Delete the test master data
});

teardown('reset autonumber fields', async ({}) => {
  console.log('resetting autonumber fields...');
  // Reset the autonumber fields
});

teardown('delete test tables', async ({}) => {
  console.log('deleting test tables...');
  // Delete the tables
});

teardown('delete test database', async ({}) => {
  console.log('deleting test database...');
  // Delete the database
});
