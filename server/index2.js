import crypto, { Verify } from 'crypto';

// Implementing pbkdf2 with all its parameters

const salt = crypto.randomBytes(16).toString('hex'); // Generates a random salt

crypto.pbkdf2('secret', salt, 100000, 64, 'sha512', (err, derivedKey) => {
  if (err) throw err;

  // Prints derivedKey
  console.log(derivedKey.toString('hex'));
});
