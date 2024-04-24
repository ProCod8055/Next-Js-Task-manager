'use client'
import React,{useEffect, useState} from 'react'
import UserContext from './userContext'
import CurrentLoginService from '@/app/services/currentLoginService';
import {toast} from 'react-toastify'
const UserProvider =  ({children}) => {
const [user,setUser] = useState(undefined)


useEffect(() => {
    const fetchData = async () => {
        try {
            const currentUser = await CurrentLoginService();
          
            setUser({ ...currentUser });
              console.log("userrrrr == > . > ",currentUser)
        } catch (error) {
            console.log(error);
            toast.error("Error in loading User");
            setUser(undefined)
        }
    };
    fetchData();
}, []);

  return (
<UserContext.Provider value={{user,setUser}}>{children}</UserContext.Provider>
  )
}

export default UserProvider;