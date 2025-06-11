const mongoose = require("mongoose");
const addSoftDeleteHook = require("../utils/softDelete");

const orderSchema = new mongoose.Schema(
  {
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    userType: { type: String, enum: ["guest", "registered"], default: "guest" },
    sessionId: {type:String, required: true, select: false},
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        notes: { type: String },
      },
    ],
    status: {
      type: String,
      enum: ["inProgress", "delivered", "paid"],
      default: "inProgress",
      required: false
    },
    paymentMethod: { type: String, enum: ["cash", "card"], default: "cash" },
    cardDetails: [
      {
        fullName: {
          type: String,
          required: function () {
            return this.paymentMethod === "card";
          },
          minlength: 5,
          maxlength: 50,
          select: false,
        },
        cardNumber: {
          type: String,
          required: function () {
            return this.paymentMethod === "card";
          },
          minlength: 16,
          maxlength: 16,
          match: [/^\d{16}$/, "Card number must be exactly 16 digits"],
          select: false,
        },
        cvc: {
          type: String,
          required: function () {
            return this.paymentMethod === "card";
          },
          minlength: 3,
          maxlength: 3,
          match: [/^\d{3}$/, "Card verification code must be exactly 3 digits"],
          select: false,
        },
      },
    ],
    totalPrice: { type: Number, required: true },

    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

//Metode custom pentru a tipul de user care a facut comanda
orderSchema.methods.isGuest = function () {
  return this.userType === "guest";
};

orderSchema.methods.isRegistered = function () {
  return this.userType === "registered";
};

addSoftDeleteHook(orderSchema);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
