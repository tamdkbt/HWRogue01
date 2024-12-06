const bcrypt = require('bcryptjs');

async function generateHash(password) {
  const hash = await bcrypt.hash(password, 10);
  console.log('Generated hash:', hash);
}

// Chạy script này với: node scripts/generate-hash.js "your-password"
const password = process.argv[2];
if (!password) {
  console.error('Please provide a password to hash.');
  process.exit(1);
}

generateHash(password);
