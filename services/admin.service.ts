import axios from 'axios';

import { API_BASE_URL } from "@/utils/constant";

export const getAdminStatsService = async (): Promise<{ status: boolean; data: any; message: string }> => {
  try {
      const token = localStorage.getItem('token');
  if (!token) throw new Error("User is not authenticated");

    console.log("Sending request for admin stats");
    const response = await axios.get(`${API_BASE_URL}/auth/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Admin stats response:', response.data);
    return {
      status: true,
      data: response.data,
      message: 'Success',
    };
  } catch (err: any) {
    const errorResponse = err.response ? err.response.data : { message: err.message };
    console.error("Error fetching admin stats:", errorResponse);
    return {
      status: false,
      data: null,
      message: errorResponse.message || "Error fetching admin stats",
    };
  }
}