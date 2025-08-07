var admin = require("firebase-admin");

var serviceAccount = require("../Utils/red-bull-lottery-firebase-adminsdk-fbsvc-f22afeb991.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin