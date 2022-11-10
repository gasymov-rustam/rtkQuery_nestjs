import axios from 'axios';
import { Todo } from './api';

export const axiosApi = axios.create({
  baseURL: 'http://localhost:4000/todos',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAxiosTodos = async () => await axiosApi.get<Todo[]>('/');

export const getAxiosTodo = async (id: number) => await axiosApi.get<Todo>(`/${id}`);

export const createAxiosTodo = async (data: any) => await axiosApi.post<Todo>(`/`, data);

export const updateAxiosTodo = async (todo: Todo) => await axiosApi.put<Todo>(`/${todo?.id}`, todo);

export const deleteAxiosTodo = async (id: number) => await axiosApi.delete(`/${id}`);
