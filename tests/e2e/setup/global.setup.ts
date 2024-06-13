import { test as setup } from '@playwright/test';

setup('create test database', async ({}) => {
  console.log('creating test database...');
  // Initialize the database
});

setup('create test tables', async ({}) => {
  console.log('creating test tables...');
  // Initialize the tables
});

setup('create lookup data', async ({}) => {
  console.log('creating lookup data...');
  // Initialize the lookup data
});

setup('create test master data', async ({}) => {
  console.log('creating test master data...');
  // Initialize the test master data
});
