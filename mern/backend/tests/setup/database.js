const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

const connect = async () => {
  // launchTimeout: the in-memory mongod can be slow to become ready on its
  // first cold start (binary extraction, AV scanning a large .exe). 60s is
  // generous; warm runs start in well under a second.
  mongod = await MongoMemoryServer.create({
    instance: { launchTimeout: 60000 },
  });
  const uri = mongod.getUri();
  await mongoose.connect(uri);
};

const closeDatabase = async () => {
  if (mongod) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
  }
};

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};

module.exports = {
  connect,
  closeDatabase,
  clearDatabase,
};
