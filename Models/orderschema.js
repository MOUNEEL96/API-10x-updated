const mongoose = require("mongoose");

const orderschema = new mongoose.Schema({
    item_name:  {
        type: String,
       
    },
    inventory_id: {
        type: String,
       
    },
    customer_id:{
        type: String,
      
    },
    quantity:{
        type: Number,
    }
})

const orderModel = mongoose.model("order", orderschema);

module.exports = orderModel;