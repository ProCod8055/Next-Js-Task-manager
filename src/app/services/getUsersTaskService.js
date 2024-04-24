import { httpAxios } from "../database/httpAxios";

export default async function getUsersTaskService(userId){
const response = await httpAxios.get(`/api/users/${userId}/usersTask`)
const result = response.data;
return result;

}