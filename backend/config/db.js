import mongoose from "mongoose";

 export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://Maheswaran:Mahes2203@cluster0.rvy5kal.mongodb.net/food-app').then(()=>console.log("DB Connected"));
 }