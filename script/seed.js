"use strict";

const {
  db,
  models: { User, Product, Order },
} = require("../server/db");

const usersSeed = require("./users_data.json");
const productsSeed = require("./products_data.json");

async function seed() {
  await db.sync({ force: true });

  console.log("db synced!");

  const users = await User.bulkCreate(usersSeed);

  const products = await Product.bulkCreate(productsSeed);

  console.log(`seeded ${users.length} users and ${products.length} products`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
