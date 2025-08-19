import axios from 'axios';
import { API_BASE_URL } from '@/utils/constant';
import { Tribute, TributeSubmitRequest } from '@/types/tribute.type';

const getToken = (): string | null => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn('No token found in localStorage');
  }
  return token;
};

export const submitTributeService = async (data: TributeSubmitRequest): Promise<{ status: boolean; data: Tribute | null; message: string }> => {
  const token = getToken();
  if (!token) {
    throw new Error('User is not authenticated');
  }
  try {
    console.log('Sending tribute submission request:', data);
    const response = await axios.post(`${API_BASE_URL}/tributes`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Tribute submission response:', response.data);
    return {
      status: true,
      data: response.data,
      message: 'Success',
    };
  } catch (err: any) {
    const errorResponse = err.response ? err.response.data : { message: err.message };
    console.error('Error submitting tribute:', errorResponse);
    return {
      status: false,
      data: null,
      message: errorResponse.message || 'Error submitting tribute',
    };
  }
};


interface ApiResponse {
  status: boolean;
  data?: Tribute[];
  message?: string;
}
export const getAllTributesService = async (): Promise<ApiResponse> => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('User is not authenticated');
    }
    const response = await axios.get(`${API_BASE_URL}/tributes`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return {
      status: true,
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : "Failed to fetch tributes",
    };
  }
};


export const getTributesByIdService = async (id: number): Promise<{ status: boolean; data: Tribute | null; message: string }> => {
  const token = getToken();
  if (!token) {
    throw new Error('User is not authenticated');
  }
  try {
    console.log('Sending request for tribute by id:', id);
    const response = await axios.get(`${API_BASE_URL}/tributes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Tribute by id response:', response.data);
    return {
      status: true,
      data: response.data,
      message: 'Success',
    };
  } catch (err: any) {
    const errorResponse = err.response ? err.response.data : { message: err.message };
    console.error('Error fetching tribute by id:', errorResponse);
    return {
      status: false,
      data: null,
      message: errorResponse.message || 'Error fetching tribute by id',
    };
  }
};

export const getMyTributesService = async (): Promise<{ status: boolean; data: Tribute[] | null; message: string }> => {
  const token = getToken();
  if (!token) {
    throw new Error('User is not authenticated');
  }
  try {
    console.log('Sending request for my tributes');
    const response = await axios.get(`${API_BASE_URL}/tributes/my-tributes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('My tributes response:', response.data);
    return {
      status: true,
      data: response.data,
      message: 'Success',
    };
  } catch (err: any) {
    const errorResponse = err.response ? err.response.data : { message: err.message };
    console.error('Error fetching my tributes:', errorResponse);
    return {
      status: false,
      data: null,
      message: errorResponse.message || 'Error fetching my tributes',
    };
  }
};

export const getAllAdminTributesService = async (): Promise<{ status: boolean; data: Tribute[] | null; message: string }> => {
  const token = getToken();
  if (!token) {
    throw new Error('User is not authenticated');
  }
  try {
    console.log('Sending request for all tributes');
    const response = await axios.get(`${API_BASE_URL}/tributes/admin/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('All tributes response:', response.data);
    return {
      status: true,
      data: response.data,
      message: 'Success',
    };
  } catch (err: any) {
    const errorResponse = err.response ? err.response.data : { message: err.message };
    console.error('Error fetching all tributes:', errorResponse);
    return {
      status: false,
      data: null,
      message: errorResponse.message || 'Error fetching all tributes',
    };
  }
};

export const updateTributeStatusService = async (id: number, status: string): Promise<{ status: boolean; data: Tribute | null; message: string }> => {
  const token = getToken();
  if (!token) {
    throw new Error('User is not authenticated');
  }
  try {
    console.log('Sending request to update tribute status:', { id, status });
    const response = await axios.patch(`${API_BASE_URL}/tributes/admin/${id}/status`, { status }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Update tribute status response:', response.data);
    return {
      status: true,
      data: response.data,
      message: 'Success',
    };
  } catch (err: any) {
    const errorResponse = err.response ? err.response.data : { message: err.message };
    console.error('Error updating tribute status:', errorResponse);
    return {
      status: false,
      data: null,
      message: errorResponse.message || 'Error updating tribute status',
    };
  }
};

export const updateTributeService = async (id: number, data: Partial<Tribute>): Promise<{ status: boolean; data: Tribute | null; message: string }> => {
  const token = getToken();
  if (!token) {
    throw new Error('User is not authenticated');
  }
  try {
    console.log('Sending request to update tribute:', { id, data });
    const response = await axios.patch(`${API_BASE_URL}/tributes/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Update tribute response:', response.data);
    return {
      status: true,
      data: response.data,
      message: 'Success',
    };
  } catch (err: any) {
    const errorResponse = err.response ? err.response.data : { message: err.message };
    console.error('Error updating tribute:', errorResponse);
    return {
      status: false,
      data: null,
      message: errorResponse.message || 'Error updating tribute',
    };
  }
};

export const deleteTributeService = async (id: number): Promise<{ status: boolean; data: null; message: string }> => {
  const token = getToken();
  if (!token) {
    throw new Error('User is not authenticated');
  }
  try {
    console.log('Sending request to delete tribute:', id);
    await axios.delete(`${API_BASE_URL}/tributes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Tribute deleted successfully');
    return {
      status: true,
      data: null,
      message: 'Success',
    };
  } catch (err: any) {
    const errorResponse = err.response ? err.response.data : { message: err.message };
    console.error('Error deleting tribute:', errorResponse);
    return {
      status: false,
      data: null,
      message: errorResponse.message || 'Error deleting tribute',
    };
  }
};

export const likeTributeService = async (id: number): Promise<{ status: boolean; data: any | null; message: string }> => {
  const token = getToken();
  if (!token) {
    throw new Error('User is not authenticated');
  }
  try {
    console.log('Sending request to like tribute:', id);
    const response = await axios.post(`${API_BASE_URL}/tributes/${id}/like`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Like tribute response:', response.data);
    return {
      status: true,
      data: response.data,
      message: 'Success',
    };
  } catch (err: any) {
    const errorResponse = err.response ? err.response.data : { message: err.message };
    console.error('Error liking tribute:', errorResponse);
    return {
      status: false,
      data: null,
      message: errorResponse.message || 'Error liking tribute',
    };
  }
};

export const unlikeTributeService = async (id: number): Promise<{ status: boolean; data: { likeCount: number } | null; message: string }> => {
  const token = getToken();
  if (!token) {
    throw new Error('User is not authenticated');
  }
  try {
    console.log('Sending request to unlike tribute:', id);
    const response = await axios.delete(`${API_BASE_URL}/tributes/${id}/like`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Unlike tribute successful, response:', response.data);
    return {
      status: true,
      data: { likeCount: response.data.likeCount || 0 }, // Extract likeCount from server response
      message: response.data.message || 'Tribute unliked successfully',
    };
  } catch (err: any) {
    const errorResponse = err.response ? err.response.data : { message: err.message };
    console.error('Error unliking tribute:', errorResponse);
    return {
      status: false,
      data: null,
      message: errorResponse.message || 'Error unliking tribute',
    };
  }
};

export const addCommentService = async (tributeId: number, content: string): Promise<{ status: boolean; data: Comment | null; message: string }> => {
  const token = getToken();
  if (!token) {
    throw new Error('User is not authenticated');
  }
  try {
    console.log('Sending request to add comment:', { tributeId, content });
    const response = await axios.post(`${API_BASE_URL}/tributes/${tributeId}/comments`, { content }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Add comment response:', response.data);
    return {
      status: true,
      data: response.data,
      message: 'Success',
    };
  } catch (err: any) {
    const errorResponse = err.response ? err.response.data : { message: err.message };
    console.error('Error adding comment:', errorResponse);
    return {
      status: false,
      data: null,
      message: errorResponse.message || 'Error adding comment',
    };
  }
};

export const getCommentsService = async (tributeId: number): Promise<{ status: boolean; data: Comment[] | null; message: string }> => {
  const token = getToken();
  if (!token) {
    throw new Error('User is not authenticated');
  }
  try {
    console.log('Sending request for comments:', tributeId);
    const response = await axios.get(`${API_BASE_URL}/tributes/${tributeId}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Comments response:', response.data);
    return {
      status: true,
      data: response.data,
      message: 'Success',
    };
  } catch (err: any) {
    const errorResponse = err.response ? err.response.data : { message: err.message };
    console.error('Error fetching comments:', errorResponse);
    return {
      status: false,
      data: null,
      message: errorResponse.message || 'Error fetching comments',
    };
  }
};

export const deleteCommentService = async (commentId: number): Promise<{ status: boolean; data: null; message: string }> => {
  const token = getToken();
  if (!token) {
    throw new Error('User is not authenticated');
  }
  try {
    console.log('Sending request to delete comment:', commentId);
    await axios.delete(`${API_BASE_URL}/tributes/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Comment deleted successfully');
    return {
      status: true,
      data: null,
      message: 'Success',
    };
  } catch (err: any) {
    const errorResponse = err.response ? err.response.data : { message: err.message };
    console.error('Error deleting comment:', errorResponse);
    return {
      status: false,
      data: null,
      message: errorResponse.message || 'Error deleting comment',
    };
  }
};