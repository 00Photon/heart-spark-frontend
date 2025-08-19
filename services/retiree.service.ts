import axios from 'axios';
import { API_BASE_URL } from '@/utils/constant';

export interface Retiree {
  id: number;
  name: string;
  biography: string;
  imageUrl: string;
  comments: string;
  position: string;
  department: string;
  yearsOfExperience: string;
  retirementDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRetireeRequest {
  name: string;
  biography: string;
  imageUrl?: string;
  comments?: string;
  position: string;
  department: string;
  yearsOfExperience: string;
  retirementDate: string;
}

export interface UpdateRetireeRequest {
  name?: string;
  biography?: string;
  imageUrl?: string;
  comments?: string;
  position?: string;
  department?: string;
  yearsOfExperience?: string;
  retirementDate?: string;
}

export interface RetireeStats {
  totalTributes: number;
  averageRating: number;
  totalViews: number;
}

export const getRetireesService = async (): Promise<{ status: boolean; data: Retiree[] | null; message: string }> => {
    const token = localStorage.getItem('token');
  if (!token) throw new Error("User is not authenticated");

  try {
    console.log('Sending request for retirees');
    const response = await axios.get(`${API_BASE_URL}/retirees`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Retirees response:', response.data);
    return {
      status: true,
      data: response.data,
      message: 'Success',
    };
  } catch (err: any) {
    const errorResponse = err.response ? err.response.data : { message: err.message };
    console.error('Error fetching retirees:', errorResponse);
    return {
      status: false,
      data: null,
      message: errorResponse.message || 'Error fetching retirees',
    };
  }
};

export const getRetireeService = async (id: number): Promise<{ status: boolean; data: Retiree | null; message: string }> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("User is not authenticated");

  try {
    console.log(`Sending request for retiree ${id}`);
    const response = await axios.get(`${API_BASE_URL}/retirees/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Retiree response:', response.data);
    return {
      status: true,
      data: response.data,
      message: 'Success',
    };
  } catch (err: any) {
    const errorResponse = err.response ? err.response.data : { message: err.message };
    console.error(`Error fetching retiree ${id}:`, errorResponse);
    return {
      status: false,
      data: null,
      message: errorResponse.message || `Error fetching retiree ${id}`,
    };
  }
};

export const createRetireeService = async (data: CreateRetireeRequest): Promise<{ status: boolean; data: Retiree | null; message: string }> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User is not authenticated');
  }
  try {
    console.log('Sending request to create retiree:', data);
    const response = await axios.post(`${API_BASE_URL}/retirees`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Create retiree response:', response.data);
    return {
      status: true,
      data: response.data,
      message: 'Success',
    };
  } catch (err: any) {
    const errorResponse = err.response ? err.response.data : { message: err.message };
    console.error('Error creating retiree:', errorResponse);
    return {
      status: false,
      data: null,
      message: errorResponse.message || 'Error creating retiree',
    };
  }
};

export const updateRetireeService = async (id: number, data: UpdateRetireeRequest): Promise<{ status: boolean; data: Retiree | null; message: string }> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User is not authenticated');
  }
  try {
    console.log(`Sending request to update retiree ${id}:`, data);
    const response = await axios.put(`${API_BASE_URL}/retirees/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Update retiree response:', response.data);
    return {
      status: true,
      data: response.data,
      message: 'Success',
    };
  } catch (err: any) {
    const errorResponse = err.response ? err.response.data : { message: err.message };
    console.error(`Error updating retiree ${id}:`, errorResponse);
    return {
      status: false,
      data: null,
      message: errorResponse.message || `Error updating retiree ${id}`,
    };
  }
};

export const deleteRetireeService = async (id: number): Promise<{ status: boolean; data: null; message: string }> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User is not authenticated');
  }
  try {
    console.log(`Sending request to delete retiree ${id}`);
    await axios.delete(`${API_BASE_URL}/retirees/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Retiree deleted successfully');
    return {
      status: true,
      data: null,
      message: 'Success',
    };
  } catch (err: any) {
    const errorResponse = err.response ? err.response.data : { message: err.message };
    console.error(`Error deleting retiree ${id}:`, errorResponse);
    return {
      status: false,
      data: null,
      message: errorResponse.message || `Error deleting retiree ${id}`,
    };
  }
};

export const getRetireeStatsService = async (id: number): Promise<{ status: boolean; data: RetireeStats | null; message: string }> => {
  try {
    console.log(`Sending request for retiree stats ${id}`);
    const response = await axios.get(`${API_BASE_URL}/retirees/${id}/stats`);
    console.log('Retiree stats response:', response.data);
    return {
      status: true,
      data: response.data,
      message: 'Success',
    };
  } catch (err: any) {
    const errorResponse = err.response ? err.response.data : { message: err.message };
    console.error(`Error fetching retiree stats ${id}:`, errorResponse);
    return {
      status: false,
      data: null,
      message: errorResponse.message || `Error fetching retiree stats ${id}`,
    };
  }
};

export const searchRetireesService = async (query: string): Promise<{ status: boolean; data: Retiree[] | null; message: string }> => {
  try {
    console.log(`Sending request to search retirees with query "${query}"`);
    const response = await axios.get(`${API_BASE_URL}/retirees/search?q=${encodeURIComponent(query)}`);
    console.log('Search retirees response:', response.data);
    return {
      status: true,
      data: response.data,
      message: 'Success',
    };
  } catch (err: any) {
    const errorResponse = err.response ? err.response.data : { message: err.message };
    console.error(`Error searching retirees with query "${query}":`, errorResponse);
    return {
      status: false,
      data: null,
      message: errorResponse.message || `Error searching retirees with query "${query}"`,
    };
  }
};

export const getRetireesByDepartmentService = async (department: string): Promise<{ status: boolean; data: Retiree[] | null; message: string }> => {
  try {
    console.log(`Sending request for retirees by department "${department}"`);
    const response = await axios.get(`${API_BASE_URL}/retirees?department=${encodeURIComponent(department)}`);
    console.log('Retirees by department response:', response.data);
    return {
      status: true,
      data: response.data,
      message: 'Success',
    };
  } catch (err: any) {
    const errorResponse = err.response ? err.response.data : { message: err.message };
    console.error(`Error fetching retirees by department "${department}":`, errorResponse);
    return {
      status: false,
      data: null,
      message: errorResponse.message || `Error fetching retirees by department "${department}"`,
    };
  }
};