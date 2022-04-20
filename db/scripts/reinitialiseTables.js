const { createAllTables } = require('./createTables');
const { dropAllTables } = require('./dropTables');
const { populateAllTables } = require('./populateTables');
const { getAllTables } = require('./getTables');

async function reinitialiseAllTables() {
  await dropAllTables();
  await createAllTables();
  await populateAllTables();
  await getAllTables();
  console.log('Tables should be reinitialised now.');
}

if (require.main === module) {
  reinitialiseAllTables();
}
