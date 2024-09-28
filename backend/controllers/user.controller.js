import user from "../models/userModel.js";

const getUsersForSidebar = async (req, res) => {
    try {
        const logedInUserId = req.user._id;

        const filteredUsers = await user.find({ _id: { $ne: logedInUserId } });
        console.log(filteredUsers);
        res.status(200).json(filteredUsers);
    } 
    
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

export default getUsersForSidebar;
