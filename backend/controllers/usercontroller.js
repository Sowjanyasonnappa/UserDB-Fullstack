const User = require("../models/user");

exports.saveUserDetails = async (req, res) => {
  try {
    const { id } = req.user; 
    const { name, middlename, lastname, number, aadhaar, permanentAddress, currentAddress } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { name, middlename, lastname, number, aadhaar, permanentAddress, currentAddress },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
