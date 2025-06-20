const mongoose = require("mongoose");
const addSoftDeleteHook = require("../utils/softDelete")
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true},
    phoneNumber: { type: String, required: false },
    role: { type: String, enum: ["client", "admin"], default: "client" },
    deleted: { type: Boolean, default: false, select: false },
  },
  {
    timestamps: true,
  }
);

//Override default "find", "findOne" and ... functions to exclude delete records
addSoftDeleteHook(userSchema);

const User = mongoose.model('User', userSchema)

module.exports = User;