import user from "../models/userModel.js";

const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        console.log(loggedInUserId)
        const filteredUsers = await user.find({ _id: { $ne: loggedInUserId.toString() } });
        res.status(200).json(filteredUsers);
        console.log(filteredUsers);
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

export default getUsersForSidebar;
