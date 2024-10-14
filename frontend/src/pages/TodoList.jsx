import axios from 'axios';
import { useEffect, useState } from 'react';
import BaseURL from '../components/BaseURL';
import TodoItem from '../components/TodoItem';

export default function TodoList() {
    const [todoTitle, setTodoTitle] = useState('');
    const [allTodos, setAllTodos] = useState([]);

    const user = sessionStorage.getItem('user_id');

    const getFormattedDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = async () => {
        try {
            if (!todoTitle) {
                return;
            }

            const response = await axios.post(
                `${BaseURL()}/api/users/insertTodo`,
                {
                    todoTitle,
                    user,
                    date: getFormattedDate(),
                }
            );

            if (response.status === 201) {
                setTodoTitle('');
                fetchTodos();
            } else {
                console.log('error');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const fetchTodos = async () => {
        try {
            const response = await axios.post(
                `${BaseURL()}/api/users/getPendingTodos`,
                {
                    user,
                }
            );

            if (response.status === 200) {
                console.log(response.data);
                setAllTodos(response.data.getTodos);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div className="flex flex-col gap-4 w-full h-full items-start justify-start bg-background px-4 py-6">
            <div className="w-full h-full border-2 p-6 rounded-2xl shadow-xl">
                <h1 className="text-3xl font-semibold uppercase mb-4">Todolist</h1>
                <div className="w-full h-full items-start justify-start gap-10">
                    <div className="w-full flex items-start justify-start gap-6">
                        <input
                            type="text"
                            name=""
                            className="w-[25rem] h-12 pl-3 pr-3 rounded-full border-2 border-primary text-slate-800"
                            id=""
                            value={todoTitle}
                            onKeyDown={handleKeyDown}
                            onChange={(e) => setTodoTitle(e.target.value)}
                            placeholder="Add new task"
                        />
                        <button
                            onClick={handleSubmit}
                            className="w-12 h-12 bg-primary hover:scale-110 transition-all text-white flex items-center justify-center font-semibold rounded-full"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-tabler icons-tabler-outline icon-tabler-send-2"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                />
                                <path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" />
                                <path d="M6.5 12h14.5" />
                            </svg>
                        </button>
                    </div>
                    <div className="w-full h-auto grid mt-10 grid-cols-3 gap-3">
                        {allTodos.map((todo) => (
                            <TodoItem
                                title={todo.title}
                                status={todo.status == 'pending' ? false : true}
                                id={todo._id}
                                key={todo._id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
