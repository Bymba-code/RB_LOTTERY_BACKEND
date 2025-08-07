const prisma = require("../Middlewares/prisma")

const notificationToken = async (id) => {
    const user = await prisma.users.findUnique({
        where:{
            id:parseInt(id)
        }
    })

    return user.token
}

module.exports = { notificationToken }