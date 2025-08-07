const admin = require('firebase-admin');
const serviceAccount = require("../Utils/red-bull-lottery-firebase-adminsdk-fbsvc-f22afeb991.json")

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;
