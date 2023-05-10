const dotenv = require('dotenv');

const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

const uri = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASEPASSWORD
);

async function main() {
  await mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 5000,
    })
    .catch((err) => console.log(err));

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Listening on port ${port}...`));
}

main();
