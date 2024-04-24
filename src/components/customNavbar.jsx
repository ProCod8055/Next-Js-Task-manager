'use client'
import React, { useContext } from 'react'
import Link from 'next/link'
import UserContext from '../context/userContext'
import { LogoutService } from '../app/services/logoutService'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const CustomNavbar = () => {
    //using contextAPI to get the currenyUser
  const context =  useContext(UserContext)
//   console.log(context)
  const router = useRouter()

  const DoLogout =async () => {
    try {
        const result = await LogoutService();
        console.log(result);
        context.setUser(undefined)
        router.push('/login')
    } catch (error) {
        console.log(error)
        toast.error("Logout error",{
            position:'top-center'})
    }
  }

  return (
    
    <nav className='bg-blue-600 h-24 pd-2 px-4 flex justify-between items-center '>
        <div className='Logo' >
            <h1 className='text-2xl font-semibold '> 
            <a href='/'> WORK MANAGER </a>
            </h1> 
        </div>
        <div>
            <ul className='flex space-x-5 pd-5 ' >
              {
                context.user && (
                    <>
                     {/* <li> 
               <Link href={'/'} className=' hover:text-blue-300 text-2xl font-extrabold ' >HOME</Link>
                </li> */}
                <li>
                    <Link href={'/add-task' }className=' hover:text-blue-300 text-2xl font-extrabold '>ADD-TASK</Link>
                </li>
                <li>
                    <Link href={'/show-task'}className=' hover:text-blue-300 text-2xl font-extrabold '>SHOW-TASK</Link>
                </li>
                    </>
                )
              }
                
            </ul>
        </div>
        <div>
            <ul className='flex space-x-3'>
               { context.user && (
                    <>
                     <li>
                        <Link href={"#!"} >{context.user.Fname}</Link>
                    </li>
                     <li>
                        <button onClick={DoLogout} >LogOut</button>
                     </li>
                    </>
                )
               }

               {!context.user && (
                <>
                    <li>
                        <Link href="/login" >Login</Link>
                    </li>
                    <li>
                        <Link href="/signup" >SignUp</Link>
                    </li>
                </>
                )}
            </ul>
        </div>
    </nav>
    
  )
} 

export default CustomNavbar