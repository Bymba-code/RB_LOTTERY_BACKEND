const { notificationToken } = require("../../../Services/notificationToken")
const { pushNotification } = require("../../../Services/sendNotification")


const SEND_SELECTED_USER = async (req , res) => {
    try 
    {
        const {user, title, body} = req.body

        const userToken = await notificationToken(parseInt(user))

        if(!userToken)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Хэрэглэгч notification системд бүртгэлгүй байна."
            })
        }

        pushNotification(userToken, title, body)

        return res.status(200).json({
            success:false,
            data:[],
            message: "Амжилттай илгээлээ."
        })
    }
    catch(err)
    {
        console.log(err)
    }
    finally
    {

    }
}

module.exports = SEND_SELECTED_USER