const express = require("express");
const mongoose = require("mongoose");
const customerModel = require("./Models/customerschema");
const inventoryModel = require("./Models/inventoryschema");
const orderModel = require("./Models/orderschema");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
const path = require("path");
const bodyParser=require('body-parser')
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const urlencodedParse=bodyParser.urlencoded({extended:false})

app.listen(3005, (err)=>{
    if(!err){
        console.log("Server started at port 3005")
    }else{
        console.log(err);
    }
})

mongoose.connect("mongodb+srv://MOUNEEL213:mouneel2purkas@project-1.vmb9zsr.mongodb.net/Webtech_api?retryWrites=true&w=majority",()=> {
    console.log("Connected to db")
}, (err)=> {
    console.log(err);
});



const userid='OD100'


//get all customer
app.get("/customer", (req, res)=> {
    customerModel.find().then((customerData)=> {
       res.render("customer",{customerData})
    })
});


//add customer
app.post("/customer/add", (req, res)=> {
    customerModel.find({email: req.body.email}).then((userData)=> {
        if(userData.length) {
            res.status(400).send("customer Exist");
        } else {
            customerModel.create({customer_id: req.body.customer_id, customer_name: req.body.customer_name,email:req.body.email}).then((data)=> {
               res.send(data)
                
            }).catch((err)=> {
                console.log(err)
            })
        }
    })
});



//get all inventory
app.get("/inventory", (req, res)=> {
    
    inventoryModel.find().then((inventoryData)=> {
        res.render("inventory",{inventoryData})
     })
    
});


//get only electornic inventory
app.get("/inventory/electronics", (req, res)=> {
    
    inventoryModel.find({inventory_type:"Electronics"}).then((inventoryData)=> {
        res.render("inventory",{inventoryData})
     })
    
});


//get only furniture
app.get("/inventory/furniture", (req, res)=> {
    
    inventoryModel.find({inventory_type:"Furniture"}).then((inventoryData)=> {
        res.render("inventory",{inventoryData})
     })
    
});



//add  inventory
app.post("/inventory/add", (req, res)=> {
    inventoryModel.find({inventory_id: req.body.inventory_id}).then((inventoryData)=> {
        if(inventoryData.length) {
            res.status(400).send("same inventory already Exist");
        } else {
            inventoryModel.create({inventory_id: req.body.inventory_id, inventory_type: req.body.inventory_type,item_name:req.body.item_name,
                available_quantity:req.body.available_quantity}).then((data)=> {
               res.send(data)
                
            }).catch((err)=> {
                console.log(err)
            })
        }
    })
});


//get order
app.get("/order", (req, res)=> {
    
    orderModel.find().then((orderData)=> {
        res.render("order",{orderData})
     })
    
});



//create order post
app.post("/order", (req, res)=> {

    customerModel.find({customer_id: req.body.customer_id}).then((customerInfo)=> {

        if(customerInfo.length) {

            inventoryModel.find({inventory_id: req.body.inventory_id}).then((inventoryInfo)=> {

               
               const orderedquantity=req.body.quantity;
               const availableinventory=inventoryInfo[0].available_quantity;
               console.log(availableinventory)


                if(inventoryInfo.length) {

                    if(orderedquantity<availableinventory){
                        orderModel.create({customer_id: req.body.customer_id, inventory_id: req.body.inventory_id,item_name:req.body.item_name,
                        quantity:req.body.quantity}).then((data)=> {
                            // inventoryModel.find({inventory_id: req.body.inventory_id}).then((inventry)=> {
                                
                            inventoryModel.findOneAndUpdate({inventory_id: req.body.inventory_id},{available_quantity: availableinventory-orderedquantity}).then(()=> {
                                res.send("order placed")
                            }).catch((err)=> {
                                res.status(400).send(err)
                            })
                        // }).catch((err)=>{
                        //     console.log(err)
                        // })
                       
                        
                    }).catch((err)=> {
                        console.log(err)
                    })}else{
                        res.send("out of stock")
                    }
                   
                    
                } else {
                    res.status(400).send("no such item");
                }
        
        
            }).catch((err)=> {
                console.log(err)
            })
            
        } else {
            res.status(400).send("customer doesnot Exist");
        }


    }).catch((err)=> {
        console.log(err)
    })
    
  
});
