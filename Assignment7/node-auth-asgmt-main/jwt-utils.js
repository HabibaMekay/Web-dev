const crypto = require('crypto');

function signJWT(secret, expiresInSeconds = 3000, payload) {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  //hn geeb el current time 34n nshof when to expire
  const now = Math.floor(Date.now() / 1000);
  const fullPayload = {
    ...payload,
    exp: now + expiresInSeconds
  };

  const base64Header = Buffer.from(JSON.stringify(header)).toString('base64url');
  const base64Payload = Buffer.from(JSON.stringify(fullPayload)).toString('base64url');
  const data = base64Header + '.' + base64Payload;
  
  const signature = crypto.createHmac('sha256', secret)
    .update(data)
    .digest('base64url');
  
  return base64Header + '.' + base64Payload + '.' + signature;
  
}

function verifyJWT(token, secret) {
  const [header, payload, signature] = token.split('.');
  
  const data = header + '.' + payload;
  const expected = crypto.createHmac('sha256', secret)
    .update(data)
    .digest('base64url');
  
  if (signature !== expected) {
    throw new Error('Invalid signature');
  }
  
  // hn-decode the payload
  const decodedPayload = JSON.parse(Buffer.from(payload, 'base64url').toString());
  
  if (decodedPayload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error('Token expired');
  }
  return decodedPayload;
}
module.exports = { signJWT, verifyJWT };