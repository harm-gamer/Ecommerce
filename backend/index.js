import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Stripe from "stripe";

const app = express();

import path from "path"
import { type } from "os";
import { Console, error } from "console";

app.use((express.json({limit : "50mb"})))
app.use(cors());
dotenv.config();
 const port = process.env.PORT || 3000;
 const mongourl = process.env.mongodb_url;
 
async function main(){
   await mongoose.connect(mongourl)
}

main();

app.listen(port,() =>{
    console.log(`connected to port ${port}`)
})
 // image storage Engine
 const storage = multer.diskStorage({destination: './upload/images',
    filename : (req,file,cb) =>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
 })
 const upload = multer({storage: storage});
 // creating Upload Endpoint for images
 app.use('/images', express.static('upload/images'))

 app.post('/upload',upload.single('product'),(req,res)=>{
    res.json({success : 1,image_url : `http://localhost:${port}/images/${req.file.filename}`}) 
 })

 const Product = mongoose.model("product", {
    
    id:{
        type : Number,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    image : {
        type: String,
        required : true,
    },
    category : {
        type : String,
        required : true,
    },
    new_price : {
        type : Number,
        required : true,
    },
    old_price : {
        type : Number,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now,
    },
    avilable : {
        type : Boolean,
        default : true,
    }
 })

 app.post('/addproduct', async (req,res) =>{
    const products = await  Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else{
        id = 1;
    }
    const product = new Product ({
        id : id,
        name : req.body.name,
        image : req.body.image,
        category : req.body.category,
        new_price : req.body.new_price,
        old_price : req.body.old_price,
       
    });
    console.log(product);
    await product.save();
    res.json({
        success : true,
        name :   req.body.name,
    });
 })
 app.post("/removeProduct", async (req,res) =>{
    await Product.findOneAndDelete({id : req.body.id});
    console.log("removed");
    res.json({
        success : true,
        name : req.body.name});
 })

 app.get("/allProducts", async (req,res) =>{
    let products = await Product.find({});
    
   
    res.send(products) 

 })
 app.post("/editProduct" ,async (req,res) =>{
    const product = await Product.find({})
  })

 const User = mongoose.model("user",{
    name :{
        type : String
    },
    email :{
        type : String,
        unique : true,
    },
    password : {
        type : String,
    },
    cartData : {
        type : Object,
    },
    date : {
        type : Date,
        default : Date.now,
    }

 })

 app.post("/signUp", async(req,res) =>{
    const user = await User.findOne({email : req.body.email});
    if(user){
       return res.status(400).json({error : "user with given email id already exit"})
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

     const cart = {};
     for (let i = 0; i < 300; i++) {
        cart[i] = 0;
     }
     const newUser = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword,
        cartData : cart,
     })
     
     await newUser.save()

     const data = {
        user_id : {
            id : newUser.id
        }
     }
     if(newUser){
        const token =  jwt.sign(data,"user_token");
        res.status(200).json({
            success : true,
            token
        })
     }
    
 })
 app.post("/login", async (req,res) =>{
   const user = await User.findOne({email :req.body.email});
   if(user){
    const isMatch=  bcrypt.compare(req.body.password,user.password )
    if(isMatch){
        const data = {
            user_id :{
                id : user.id
            }
            
        }
        const token = jwt.sign(data,"user_token")
        res.status(200).json({
           success : true,
            token,
        })
    }
    else{
        res.status(400).json({error : "wrrong password"})

    }

   }
   else{
    res.status(400).json({error : "user not exist"})
   }
 })
 // creating endpoint for newcollections
 app.get("/newcollection", async (req,res) =>{
    const products = await Product.find({});
    let new_product = products.slice(1).slice(-8);
    console.log("new collection fetched");
    res.send(new_product)
 })

 app.get("/popularInWomen", async (req,res) =>{
    const products = await Product.find({category : "women"})
    let popular = products.slice(0,4);
    console.log("popular women product fetched")
    res.send(popular);
 })
  const fetch_token = async(req,res,next) =>{
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error : "please authenticate using valid password"})
    }
    else{
        try{
            const data = jwt.verify(token,"user_token")
            console.log(data)
            req.user = data.user_id
            next()
        }
        catch(err){
            res.status(401).send({ err : "please try with valid token"})
        }
    }
  }

  app.post("/addtocart",fetch_token, async (req,res) =>{
    console.log("added to cart",req.user.id)
      const userData = await User.findOne({_id:req.user.id});
     
      userData.cartData[req.body.ItemId] += 1;
     await User.findOneAndUpdate({_id:req.user.id},{cartData: userData.cartData})
     
  })
  app.post("/removefromcart",fetch_token,async(req,res) =>{
    console.log("remove from cart",req.user.id)
      const userData = await User.findOne({_id:req.user.id});
     if(userData.cartData.length>0){
        userData.cartData[req.body.ItemId] -= 1;
     }
     await User.findOneAndUpdate({_id:req.user.id},{cartData: userData.cartData})
     
  })
  app.post("/getCart",fetch_token,async (req,res)=>{
    const userData = await User.findOne({_id:req.user.id});
    console.log(userData)
    res.json(userData.cartData);
  })
   const Order = mongoose.model("order",{
    userId :{type:String,required: true},
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:Date.now()}
   })
// placeorder api

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

   app.post("/Order" ,fetch_token,async(req,res)=>{
    
    try{
        const newOrder = new Order({
            userId : req.user.id,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await User.findByIdAndUpdate(req.user.id,{cartData:{}})

         const line_items = req.body.items.map((item) =>({
            price_data :{
                currency :"inr",
                product_data:{
                    name : item.name
                },
                unit_amount : item.price*100*80
            },
            quantity:item.quantity
         }))
         line_items.push({
            price_data:{
                currency:"inr",
                product_data :{
                    name:"Devivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity :1
         })
        
         const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`http://localhost:5173/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`http://localhost:5173/verify?success=false&orderId=${newOrder._id}`
         })
          res.json({success:true,session_url:session.url})
    }catch(err){
        console.log(err)
        res.json({success :false,message:"Error"})
    }
   })

   app.post("/verify" ,async(req,res)=>{
    const {orderId,success} = req.body;
    try{
      if(success=="true"){
        await Order.findByIdAndUpdate(orderId,{payment : true});
        res.json({success:true,message:"Paid"})
      }
      else{
        await Order.findByIdAndDelete(orderId);
        res.json({success:false,message:"Not paid"})
      }
    }catch(err){
   console.log(err)
   res.json({success:false,message:""})
    }
   })
 //myorders of user
   app.post("/myorders",fetch_token,async(req,res)=>{
    try{
        const orders = await Order.find({userId : req.user.id})
        res.json({success:true,data:orders})
    }catch(err){
    console.log(err)
    res.json({success:false,message:"Error"})
    }
     
      
   })

// orders in admin pannel

app.get("/listorder",async(req,res)=>{
    try{
        const orders = await Order.find({})
        res.json({success :true,data:orders})
    }catch(err){
        res.json({success:false,message: "Error"})
    }
})

app.get('/',(req,res)=>{
    res.send('welcome to my api');
    console.log("connected")
})
