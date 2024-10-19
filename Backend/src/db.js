import mongoose from 'mongoose'
export const connectDB = async() =>{
    try {
        /* await mongoose.connect("mongodb://localhost/puntoShein"); */
        await mongoose.connect("mongodb+srv://luis2004hdez:P55LiaCTmaeL4qDj@cluster0.exewy.mongodb.net/puntoShein");
        console.log("DB is connected");
    } catch (error) {
        console.log(error);
    }
};