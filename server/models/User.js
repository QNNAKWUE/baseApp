import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    min: 5,
    max: 25,
    required: [true, "can't be blank"],
},

email: {
    type: String,
    min: 5,
    max: 255,
    required: [true, "can't be blank"],
    unique: true,
    lowercase: true,
},

password: {
    type: String,
    required: [true, "can't be blank"],
    min: 5,
    max: 255
},
  
});

const User = mongoose.model('User', userSchema);
const user = new User({});

export default User;
