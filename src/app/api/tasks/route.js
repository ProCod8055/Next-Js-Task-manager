import { TaskModel } from "@/app/models/task";
import { NextResponse } from "next/server";
import { connectDb } from "../../database/db";
import jwt from 'jsonwebtoken'


//GET all task

export async function GET(request){
    await connectDb();
    const getAlltask = await TaskModel.find();

    return NextResponse.json(getAlltask);
}

//POST create new task

export async function POST(request){

   const { title, content, userId,status } = await request.json();

// fetching the current user id, so that the user can add the task (user Specific Task)

        const LoginToken = request.cookies.get("LoginToken")?.value;
        const data = jwt.verify(LoginToken,process.env.JWT_KEY)

    const task = new TaskModel({
    userId:data._id, // 
    title,
    content,
    status,
    })
    await connectDb();
    const taskCreated = await task.save();

    return NextResponse.json(taskCreated);
}