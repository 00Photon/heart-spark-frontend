import { Gallery } from "@/types/gallery.type";
import { API_BASE_URL } from "@/utils/constant";


// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    return { status: false, message: error.message || 'Request failed' };
  }
  const data = await response.json();
  return { status: true, data };
};

// Fetch all galleries
export const getGalleriesService = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("User is not authenticated");

    const response = await fetch(`${API_BASE_URL}/gallery`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching galleries:', error);
    return { status: false, message: 'Failed to fetch galleries' };
  }
};

// Fetch a specific gallery item by ID
export const getGalleryByIdService = async (id: number) => {
  try {
        const token = localStorage.getItem('token');
    if (!token) throw new Error("User is not authenticated");
    const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error fetching gallery ${id}:`, error);
    return { status: false, message: `Failed to fetch gallery ${id}` };
  }
};

// Create a new gallery item with file upload
export const createGalleryService = async (galleryData: {
  title: string;
  type: 'image' | 'video';
  file?: File;
  description: string;
}) => {
  try {
    const formData = new FormData();
    formData.append('title', galleryData.title);
    formData.append('type', galleryData.type);
    if (galleryData.file) {
      formData.append('file', galleryData.file);
    }
        const token = localStorage.getItem('token');
    if (!token) throw new Error("User is not authenticated");

    const response = await fetch(`${API_BASE_URL}/gallery/with-file`, {
      method: 'POST',
      headers: {
          Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error creating gallery:', error);
    return { status: false, message: 'Failed to create gallery' };
  }
};

// Update an existing gallery item
export const updateGalleryService = async (
  id: number,
  galleryData: {
    title?: string;
    type?: 'image' | 'video';
    file?: File;
    description?: string;
  }
) => {
  try {

    const formData = new FormData();
    if (galleryData.title) formData.append('title', galleryData.title);
    if (galleryData.type) formData.append('type', galleryData.type);
    if (galleryData.description) formData.append('description', galleryData.description);
    if (galleryData.file) formData.append('file', galleryData.file);
    const token = localStorage.getItem('token');
    if (!token) throw new Error("User is not authenticated");
    const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
      method: 'PATCH',
      headers: {
          Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error updating gallery:', error);
    return { status: false, message: 'Failed to update gallery' };
  }
};

// Delete a gallery item
export const deleteGalleryService = async (id: number) => {
  try {
        const token = localStorage.getItem('token');
    if (!token) throw new Error("User is not authenticated");
    const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error deleting gallery:', error);
    return { status: false, message: 'Failed to delete gallery' };
  }
};