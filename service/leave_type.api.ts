import { formatDateToLocalISO } from "@/app/api/utils/functions";
import { Base_URL, ENDPOINTS } from "@/constants/end_points";
import axios from "axios";
const url = `${Base_URL}${ENDPOINTS.LEAVE_ENTITLEMENTS}`;
export const getAllLeaveType = async () => {
  try {
    const res = await axios.get(url);
    return res.data.data;
  } catch (err) {
    console.error("Error fetching LeaveType:", err);
  }
};
export const getOneLeaveType = async (id:string) => {
  try {
    const res = await axios.get(`${url}/${id}`);
    return res.data.data;
  } catch (err) {
    console.error("Error fetching LeaveType profile:", err);
  }
};
export const createLeaveType = async (data: any) => {
  try {
    const res = await axios.post(url, data);
    return res.data;
  } catch (err: any) {
    console.error("Error saving LeaveType:", err.response?.data);
    throw err.response?.data || { message: "Unknown error" };
  }
};



export const editLeaveType = async (data: any) => {
  try {
    const res = await axios.put(
      `${url}/${data.id}`,
      data
    );
    return res.data.data;
  } catch (err) {
    console.error("Error saving LeaveType:", err);
  }
};
export const deleteLeaveType = async (id: string) => {
  try {
    const res = await axios.delete(`${url}/${id}`);
    return res.data.data;
  } catch (err) {
    console.error("Error deleting LeaveType:", err);
  }
};
