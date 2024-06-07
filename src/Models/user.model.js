import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        dob: { type: String, required: true }, // DOB Format: D/M
        email: {type: String, require:true},
        Pmessage: {type: String},
    }
);

export default mongoose.model('birthdayReminder', userSchema);