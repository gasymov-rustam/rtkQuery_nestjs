import { useRef, Fragment } from 'react';
import { useQuery, useMutation, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import axios from 'axios';

import { getTodos, Todo, updateTodo, deleteTodo, createTodo } from './lib/api';
import { queryClient } from '.';

export const axiosClient = axios.create({
  baseURL: 'http://localhost:4000/',
});

export const App = () => {
  const textRef = useRef<HTMLInputElement>(null);

  /** Using fetch from libs folder */
  // const { data: todos } = useQuery<Todo[]>("todos", getTodos, {
  //   initialData: [],
  // });
  // const updateMutation = useMutation(updateTodo, {
  //   onSuccess: () => queryClient.invalidateQueries("todos"),
  // });
  // const deleteMutation = useMutation(deleteTodo, {
  //   onSuccess: () => queryClient.invalidateQueries("todos"),
  // });
  // const createMutation = useMutation(createTodo, {
  //   onSuccess: () => queryClient.invalidateQueries("todos"),
  // });

  /** Using axios */

  const { data: todos } = useQuery<Todo[]>(
    'todos',
    async () => (await axiosClient.get<Todo[]>('/todos')).data,
    {
      initialData: [],
    }
  );

  const updateMutation = useMutation<Response, unknown, Todo>(
    (todo) => axiosClient.put(`/todos/${todo.id}`, todo),
    {
      onSettled: () => queryClient.invalidateQueries('todos'),
    }
  );

  const deleteMutation = useMutation<Response, unknown, Todo>(
    ({ id }) => axiosClient.delete(`/todos/${id}`),
    {
      onSettled: () => queryClient.invalidateQueries('todos'),
    }
  );

  const createMutation = useMutation<Response, unknown, { text: string }>(
    (data) => axiosClient.post('/todos', data),
    {
      onSettled: () => {
        queryClient.invalidateQueries('todos');
        textRef.current!.value = '';
      },
    }
  );

  return (
    <div className='App'>
      <div className='todos'>
        {todos?.map((todo) => (
          <Fragment key={todo.id}>
            <div>
              <input
                type='checkbox'
                checked={todo.done}
                onChange={() => {
                  updateMutation.mutate({ ...todo, done: !todo.done });
                }}
              />

              <span>{todo.text}</span>
            </div>

            <button
              onClick={() => {
                deleteMutation.mutate(todo);
              }}
            >
              Delete
            </button>
          </Fragment>
        ))}
      </div>

      <div className='add'>
        <input type='text' ref={textRef} />

        <button
          onClick={() => {
            createMutation.mutate({ text: textRef.current!.value ?? '' });
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};
