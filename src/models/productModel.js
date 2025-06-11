const mongoose = require("mongoose");
const addSoftDeleteHook = require("../utils/softDelete");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: [
        "mic-dejun",
        "pranz",
        "cina",
        "desert",
        "bauturi-alcoolice",
        "bauturi-nealcoolice",
      ],
      required: true,
    },
    imageUrl: {
      type: String,
      default:
        "https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015264987-TAGZZ34KP1L39K2IF6NJ/placeholder-image-horizontal.png",
    },
    stock: { type: Number, default: 0 },
    available: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", function (next) {
  this.available = this.stock > 0;
  next();
});

addSoftDeleteHook(productSchema);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;