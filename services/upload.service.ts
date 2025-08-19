import axios from 'axios';

import { API_BASE_URL } from "@/utils/constant";

export const uploadFileService = async (file: File, type: 'image' | 'video' | 'document'): Promise<{ status: boolean; data: { url: string }; message: string }> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("User is not authenticated");

    const formData = new FormData();
    formData.append('file', file);

    console.log(`Sending ${type} upload request`);
    const response = await axios.post(`${API_BASE_URL}/uploads/r2/${type}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(`${type} upload response:`, response.data);
    return {
      status: true,
      data: { url: response.data.url },
      message: 'File uploaded successfully',
    };
  } catch (err: any) {
    const errorResponse = err.response ? err.response.data : { message: err.message };
    console.error(`Error uploading ${type}:`, errorResponse);
    return {
      status: false,
      data: { url: '' },
      message: errorResponse.message || `Error uploading ${type}`,
    };
  }
}