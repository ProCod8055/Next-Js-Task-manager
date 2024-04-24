import { httpAxios } from "../database/httpAxios";

export  default async function CurrentLoginService(){
    const CurrentLoginResult  = await  httpAxios.get("/api/currentLogin").then((response) => response.data );
    return CurrentLoginResult ;
    }