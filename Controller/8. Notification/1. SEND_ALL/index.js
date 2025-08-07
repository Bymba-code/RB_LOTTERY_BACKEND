const prisma = require("../../../Middlewares/prisma");
const admin = require("../../../Middlewares/fireBaseAdmin");

const SEND_ALL = async (req, res) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({
        success: false,
        message: "Гарчиг болон тайлбарыг бөглөнө үү.",
      });
    }

    const userTokens = await prisma.users.findMany({
      where: {
        token: {
          not: null,
        },
      },
      select: {
        token: true,
      },
    });

    const tokens = userTokens.map(u => u.token);

    if (tokens.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Илгээх токен олдсонгүй.",
      });
    }

    let successCount = 0;
    let failCount = 0;
    const failedTokens = [];

    for (const token of tokens) {
      const message = {
        notification: { title, body },
        token,
      };

      try {
        await admin.messaging().send(message);
        successCount++;
      } catch (err) {
        console.error(`Failed to send notification to token: ${token}`, err);
        failCount++;
        failedTokens.push(token);
      }
    }

    return res.status(200).json({
      success: true,
      message: `Notifications sent. Success: ${successCount}, Failed: ${failCount}`,
      failedTokens,
    });

  } catch (err) {
    console.error("SEND_ALL error:", err);
    return res.status(500).json({
      success: false,
      message: "Серверийн алдаа гарлаа.",
      error: err.message,
    });
  }
};

module.exports = SEND_ALL;
