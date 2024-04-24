import { httpAxios } from "../database/httpAxios";

export async function LogoutService(){
    const logout = await httpAxios.post('/api/logout').then((response) =>response.data);
    return logout
}