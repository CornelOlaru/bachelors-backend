const Order = require("../models/orderModel");

//Create new order
exports.createOrder = async (req, res) => {
  try {
    const {
      table,
      user,
      items,
      status,
      paymentMethod,
      totalPrice,
      cardDetails,
    } = req.body;

    const userType = user ? "registered" : "guest";

    const orderData = {
      table,
      user,
      userType,
      items,
      status,
      paymentMethod,
      totalPrice,
      createdAt: new Date(),
    };
    //Checking if payment method is card, if yes, send it to db
    if (paymentMethod === "card" && cardDetails) {
      orderData.cardDetails = [cardDetails];
    }
    //Basic validation for required fields
    if (!table || !items || !paymentMethod || !totalPrice) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Order must have at least one item." });
    }

    for (const item of items) {
      if (!item.product || !item.quantity || !item.price) {
        return res.status(400).json({
          message: "Each item must have product, quantity, and price.",
        });
      }
    }

    // Validation only if payment method is card
    if (paymentMethod === "card") {
      const { fullName, cardNumber, cvc } = cardDetails || {};

      if (!fullName || fullName.length < 5) {
        return res
          .status(400)
          .json({ message: "Full name on card is too short." });
      }

      if (!/^\d{16}$/.test(cardNumber)) {
        return res
          .status(400)
          .json({ message: "Card number must be exactly 16 digits." });
      }

      if (!/^\d{3}$/.test(cvc)) {
        return res
          .status(400)
          .json({ message: "CVC must be exactly 3 digits." });
      }
    }

    const order = new Order(orderData);

    await order.save();

    res.status(201).json(order);
  } catch (error) {
    console.error({ message: "The order could not be sent" });
    res.status(500).json({ message: "Internal server error" });
  }
};

//Get all orders
exports.getOrders = async (req, res) => {
  try {
    const status = req.query.status; //e.g. ?status=inProgress
    const query = { deleted: false };
    if (status) {
      query.status = status;
    }
    const orders = await Order.find(query)
      .populate("user")
      .populate("items.product");
    res.json(orders);
  } catch (error) {
    console.error({ message: "Orders could not be retrieved" });
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id)
        .populate("user")
        .populate("items.product");
      if (!order) {
        return res.status(400).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

// Delete order
exports.deleteOrder = async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { $set: { deleted: true } },
        { new: true }
      );
      console.log("Updated order:", order);
      if (!order) {
        return res.status(400).json({ message: "Order not found" });
      }
      res.json({ message: "Order soft deleted", order });
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };


  // Update order
exports.updateOrder = async (req, res) => {
    const updates = req.body;
    try {
        if ("deleted" in updates) {
            return res
              .status(400)
              .json({ message: 'Cannot directly update the "deleted" field' });
          }
      const order = await Order.findByIdAndUpdate(req.params.id, updates, {
        new: true,
      })
        .populate("user")
        .populate("items.product");
      if (!order) {
        return res.status(400).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

