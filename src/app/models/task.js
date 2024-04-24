import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,
    },
title:{
    type:String,
    required:true,
},
content:{
    type:String,
    required:true,
},
addedDate:{
    type:Date,
    required:true,
    default:Date.now()
},
status:{
    type:String,
    enum:["PENDING","COMPLETED"],// It can take either of two values
    default:"PENDING",
},
});

export const TaskModel = mongoose.models.tasks || mongoose.model('tasks',TaskSchema);