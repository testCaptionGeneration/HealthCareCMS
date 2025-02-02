import mongoose, { Schema,model } from "mongoose"

const PatientSchema=new Schema({
    name:String,
    age:Number,
    birth:String,
    gender:String,
    disease:String,
    severity:String,
    number:String,
    date:{type:Date, default:Date.now()},
    // userId:{type:mongoose.Types.ObjectId, required:true}
});



const PrescritptionSchema=new Schema({
    prescription:[]
})

export const PatientModel= model("patient",PatientSchema);
