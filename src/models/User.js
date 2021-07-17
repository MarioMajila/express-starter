import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String }
})

export default mongoose.model('User', schema);