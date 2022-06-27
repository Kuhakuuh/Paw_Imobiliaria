const mongoose = require("mongoose");

const vendedorSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    }
});

module.exports = mongoose.model("Vendedor",vendedorSchema);