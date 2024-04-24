
import { httpAxios } from "../database/httpAxios"

// export default async function userSignupService(user){
// const result = await httpAxios.post("/api/users",user).then((response) => response.data);
// console.log("userSignupService======>>>",result)
// return result;
// }

const userSignupService=async (user)=>{
const response = await httpAxios.post("/api/users",user)
const result = response.data
console.log("RREESSUUULLTT====>>.",result)
return result ;
}
export default userSignupService;

