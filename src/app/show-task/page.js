'use client'
import React, { useContext, useEffect, useState } from 'react'
import getUsersTaskService from '../services/getUsersTaskService'
import UserContext from '@/context/userContext'
import AllTask from './AllTask'
import { toast } from 'react-toastify'
import DeleteTaskService from '../services/deleteTaskService'
// export const metadata={
//     title:"Show Task"
//   } // not working in client side
const Showtask = () => {
  const [tasks,setTasks] = useState([])
  const context = useContext(UserContext)
  console.log("CONTEXT = > ",context)
  const ViewTask= async (userId) => {
    try {
      const tasks = await getUsersTaskService(userId) 
      setTasks([...tasks].reverse())
      // console.log("TTTTAAASSSKKKK",tasks)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    if(context.user){
      ViewTask(context.user._id);
    }
    
  },[context.user])

 async function DeleteTaskParent(tasksId) {
     try {
      const result= await DeleteTaskService(tasksId)
      console.log(result)
      const newTasks = tasks.filter((item) => item._id != tasksId); // deletetask instantly from page no need to refresh
       console.log("NewTask",newTasks);
      setTasks(newTasks);
      toast.success("Task deleted !!",{
        position:'top-center'
       })
     } catch (error) {
      console.log(Error)
      toast.error("Error in deleting task")
     }  
  }

  return (
    <div className='container grid  grid-cols-12 mb-3 '> 
    
        <div className=' col-span-8 col-start-4 ' >
           <h1 className=' text-3xl text-center '>YOUR - TASKS ({tasks.length}) </h1>
           {
            tasks.map((task) =>(
              <AllTask task ={task} 
              key={task._id} 
              DeleteTaskParent={DeleteTaskParent}
              />
            ))
           }
        </div>

    </div>
  )
}

export default Showtask