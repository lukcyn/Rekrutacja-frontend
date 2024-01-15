import { ActivityStatus } from "@/types/ActivityStatus";
import { axiosPrivate } from "./axios";

export const changeActivityStatus = async (activityStatus: ActivityStatus) => {
    try {
        await axiosPrivate.patch(`/employee/active-status?status=${activityStatus}`);
    } catch (error) {
        console.log(error);
        throw error;
    }
}