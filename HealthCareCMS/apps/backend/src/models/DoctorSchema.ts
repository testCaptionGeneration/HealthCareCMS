import mongoose, { Document } from "mongoose";

interface DoctorSignUp extends Document {
    fullName: string;
    email: string;
    phone: string;
    position: string;
    createdAt: Date;
    password: string;
}

const DoctorSignUpSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    password: {
        type: String,
        
    },
});

export const DoctorSignUpModel = mongoose.model<DoctorSignUp>(
    'DoctorSignUp',
    DoctorSignUpSchema
);

interface DoctorSignIn extends Document {
    email: string;
    password: string;
}

const DoctorSignInSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export const DoctorSignInModel = mongoose.model<DoctorSignIn>(
    'DoctorSignIn',
    DoctorSignInSchema
);