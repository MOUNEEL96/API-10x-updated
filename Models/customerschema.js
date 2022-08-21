const mongoose = require("mongoose");

const customerschema = new mongoose.Schema({
    customer_id:  {
        type: String,
       
    },
    customer_name: {
        type: String,
       
    },
    email:{
        type: String,
      
    },
    
})

const customerModel = mongoose.model("customer", customerschema);

module.exports = customerModel;