const User = require("../models/user");
const usersData = require("./advanceData/users");

async function seedUsers() {
  console.log("🌱 Seeding users...");

  // Clear existing users (DEV ONLY)
  await User.deleteMany({});
  console.log("🧹 Old users removed");

  const createdUsers = [];

  for (let user of usersData) {
    const newUser = new User({
      username: user.username,
      email: user.email,
    });

    // passport-local-mongoose handles hashing
    const registeredUser = await User.register(newUser, process.env.SEED_USER_PASSWORD);
    createdUsers.push(registeredUser);
  }

  console.log(`✅ ${createdUsers.length} users created`);
  return createdUsers;
}

module.exports = seedUsers;
