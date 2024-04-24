import { httpAxios } from "../database/httpAxios";


export default async function UpdateStatusService(taskId, { title, content, newStatus }) {
    const response = await httpAxios.put(`/api/tasks/${taskId}`, {
        title,
        content,
        status: newStatus,
    });
    const updatedStatus = response.data.status;
    return updatedStatus;
}