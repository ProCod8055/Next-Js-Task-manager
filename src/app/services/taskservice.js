import { httpAxios } from "../database/httpAxios"

export async function ServiceAddtask (task){
        const result = await httpAxios.post('/api/tasks',task)
        .then((response) =>  response.data)
        return result                                                                                
}