import bcrypt from 'bcrypt';

const plainPassword = 'admin123'; // The password you want to test
const hashedPassword = '$2b$10$lM0/g0PNKmcp1lVny.fiNOdW.nD521P/huXRrnIDKINmNjW7LNG4y'; // Replace with actual hash

bcrypt.compare(plainPassword, hashedPassword).then((result) => {
  console.log('Password matches:', result);
}).catch((err) => {
  console.error('Error during password comparison:', err);
});
