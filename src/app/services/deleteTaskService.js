import { httpAxios } from "../database/httpAxios";

export default async function DeleteTaskService(taskId){
const response = await httpAxios.delete(`/api/tasks/${taskId}`, { isDeleted: true })
const result = response.data;
return result;

}