"use client"

import React, { useState } from 'react'
import Image from 'next/image';
import AddTaskImage from '../../../public/addTask.svg'
import { ServiceAddtask } from '../services/taskservice';
import { toast } from 'react-toastify'
// export const metadata={
//   title:"Add Task"
// }
// 
const AddTask = () => {
  // document.title = metadata.title; //just to chnaget the page title
 const [task,setTask] = useState({
  title:" ",
  content:" ",
  status:" ",
  // to use the current user Id 
  userId:"",
 })

const HandelAddTask= async (event)=>{
  event.preventDefault();
console.log(task)
//validate task data
try {
  const result  = await ServiceAddtask(task)
  console.log(result)
  toast.success("your Task Added !!",{
    position:'top-center'
  })
  setTask({
    title:" ",
  content:" ",
  status:" ",
  
  })
} catch (error) {
  toast.error(" Task Not Added !!",{
    position:'top-center'
  })
  console.log('Error',error)
}

}

  return (
    <div className=' justify-center grid grid-cols-12 ' >
        <div className='flex col-span-4 col-start-2   '  >
        <Image src= {AddTaskImage}  priority={true} alt='todoimage' className=' mb-30 ' />
        </div>
    <div className='  p-5 col-span-5 col-start-6 '>
   
        <h1 className=' text-3xl font-bold text-center ' >
          Add Your Daily Task Here !
        </h1> 
       
       <form action='#!' onSubmit={HandelAddTask} >
        {/* // for Title */}
          <div className=' m-4 '>
           
            <label className=' text-2xl ' htmlFor='task-title'>Title : </label>
              <input  type="text" id='task-title' className='
               text-sm rounded-lg block w-full p-3 dark:bg-gray-700 
              dark:placeholder-gray-400 ' 
             placeholder='Add Title'
             name='task-title'
             onChange={(event)=> setTask({...task,title:event.target.value}) }
             value={task.title}
              />
         </div>
           
          {/* for Content */}
          <div className=' m-4 '>
            <label className=' text-2xl ' htmlFor='task-content'>Content : </label>
              <textarea id='task-content'  className='
               text-sm rounded-lg block w-full p-3 dark:bg-gray-700 
              dark:placeholder-gray-400 '  
              placeholder='Add content' rows={6}
              name='task-content'
              onChange={(event)=> setTask({...task,content:event.target.value}) }
              value={task.content}
               />
         </div>

         {/* for Status */}
         <div className=' mt-4 ' >
          <label htmlFor='task-status' className='block text-2xl font-medium ml-5 ' >
            Status
          </label>
          <select id='task-status' className=' ml-5 mt-2 
               text-sm rounded-lg block w-full p-3 dark:bg-gray-700 
              dark:placeholder-gray-400 '  
              name='task-status'
              onChange={(event)=> setTask({...task,status:event.target.value}) }
              value={task.status} >

            <option value='none'  >Select One</option>
            <option value='PENDING'>PENDING</option> 
            { /*Inside value this is the same value which we have given during our creation of Taskmodel*/  }
            <option value='COMPLETED'>COMPLETED</option>
          </select>
         </div>

          <div className=' mt-4 flex justify-center '>
            <button className=' bg-green-600 py-2 px-3 rounded-lg hover:bg-green-800 ' >Add Todo</button>
            <button className=' bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800 ms-5  '>Clear</button>
          </div>

       </form>
    </div>
    </div>
  )
}
export default AddTask;