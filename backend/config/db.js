import mongoose from "mongoose";

 export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://Maheswaran:1234@cluster0.rvy5kal.mongodb.net/food-app').then(()=>console.log("DB Connected"));
 }