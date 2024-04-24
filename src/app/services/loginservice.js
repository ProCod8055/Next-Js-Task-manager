import { httpAxios } from "../database/httpAxios";

export  default async function userLogin(loginData){
    const Loginresult  = await  httpAxios.post("/api/login",loginData)
    .then((response) => response.data);
    console.log(Loginresult)
    return Loginresult ;
    }

        
