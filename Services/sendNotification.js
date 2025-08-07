const admin = require("./notificationService");

const pushNotification = async (token, title, body) => {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
    return { success: true, response };
  } catch (error) {
    console.error("Error sending message:", error);
    return { success: false, error };
  }
};

const pushNotificationToAll = async (title, body) => {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    topic: "all", 
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent to all users:", response);
    return { success: true, response };
  } catch (error) {
    console.error("Error sending to all users:", error);
    return { success: false, error };
  }
};

module.exports = {
  pushNotification,
  pushNotificationToAll
};
