const {generateGuestToken }= require("../utils/guestJwt")

exports.guestJwtCheck = async (req,res) => {
    const {sessionId, table} = req.body;
    
    try {
        if (!sessionId || !table) {
            return res.status(400).json({message: "Missing sessionId or tableId"});
        }
        const token = generateGuestToken({sessionId, table})
        res.json({token})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error", error})
    }
}