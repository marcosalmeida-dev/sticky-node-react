import axiosInterceptorInstance from './interceptors/axios.auth.interceptor';
import { StickyNote, CreateStickyNoteDto, UpdateStickyNoteDto } from '../types/sticky';

const PORT = process.env.PORT || 5000;
const API_BASE_URL = `http://localhost:${PORT}/api`;

export const getAllStickyNotes = async (): Promise<StickyNote[]> => {
  const response = await axiosInterceptorInstance.get<StickyNote[]>(API_BASE_URL + "/sticky/list");
  return response.data;
};

export const getStickyNoteById = async (id: string): Promise<StickyNote> => {
  const response = await axiosInterceptorInstance.get<StickyNote>(`${API_BASE_URL}/sticky/${id}/get`);
  return response.data;
};

export const createStickyNote = async (data: CreateStickyNoteDto): Promise<StickyNote> => {
  const response = await axiosInterceptorInstance.post<StickyNote>(API_BASE_URL + "/sticky/create", data);
  return response.data;
};

export const updateStickyNote = async (id: string, data: UpdateStickyNoteDto): Promise<StickyNote> => {
  const response = await axiosInterceptorInstance.put<StickyNote>(`${API_BASE_URL}/sticky/${id}/update`, data);
  return response.data;
};

export const deleteStickyNote = async (id: string): Promise<void> => {
  await axiosInterceptorInstance.delete(`${API_BASE_URL}/sticky/${id}/delete`);
};
