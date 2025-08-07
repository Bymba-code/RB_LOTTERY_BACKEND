const prisma = require("../../../Middlewares/prisma");

const GET_ALL_WINNERS = async (req, res) => {
    try {
        const { page, size, user } = req.query;

        const take = size ? parseInt(size) : undefined;
        const skip = page && size ? (page - 1) * size : undefined; 

        let winners;

        if (!page && !size) 
        {
            const winners = await prisma.lottery_race_winners.findMany({
                include: {
                  users: true,
                  lottery_race_prizes: {
                    include: {
                      lottery_races: {
                        include: {
                          lottery_lottery_races_lotteryTolottery: true,
                        },
                      },
                    },
                  },
                },
              });
        } 

        if(!page && !size && user)
        {
            winners = await prisma.lottery_race_winners.findMany({
                include:{
                    users:true,
                    lottery_race_prizes: {
                        include: {
                          lottery_races: {
                            include: {
                              lottery_lottery_races_lotteryTolottery: true,
                            },
                          },
                        },
                      },
                },
                where:{
                    user:parseInt(user)
                }
            })
        }

        else 
        {
            winners = await prisma.lottery_race_winners.findMany({
                skip: skip,
                take: take,
                include: {
                    users: true,
                    lottery_race_prizes: {
                        include: {
                          lottery_races: {
                            include: {
                              lottery_lottery_races_lotteryTolottery: true,
                            },
                          },
                        },
                      },
                },
            });
        }

        if (winners.length === 0) 
        {
            return res.status(404).json({
                success: false,
                data: [],
                message: "Өгөгдөл олдсонгүй.",
            });
        }

        let response = 
        {
            success: true,
            data: winners,
            message: "Амжилттай",
        };

        if (page && size) 
        {
            const totalPrizes = await prisma.lottery_race_winners.count();
            const maxPage = Math.ceil(totalPrizes / size);
            response.maxPage = maxPage;
        }

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: [],
            message: "Серверийн алдаа гарлаа." + err.message, 
        });
    }
};

module.exports = GET_ALL_WINNERS;
