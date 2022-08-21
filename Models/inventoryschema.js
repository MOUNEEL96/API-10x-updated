const mongoose = require("mongoose");

const inventoryschema = new mongoose.Schema({
    inventory_id: {
        type: String,
       
    },
    inventory_type:{
        type: String,
      
    },

    item_name:{
        type: String,
      
    },

    available_quantity:{
        type: Number,
    }
})

const inventoryModel = mongoose.model("inventory", inventoryschema);

module.exports = inventoryModel;