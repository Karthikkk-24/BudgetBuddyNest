import axios from 'axios';
import { useEffect, useState } from 'react';
import BaseURL from '../components/BaseURL';
import TodoItem from '../components/TodoItem';

export default function Completed() {
    const [allTodos, setAllTodos] = useState([]);

    const user = sessionStorage.getItem('user_id');

    const fetchTodos = async () => {
        try {
            const response = await axios.post(
                `${BaseURL()}/api/users/getCompletedTodos`,
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
        <div className="flex flex-col gap-12 w-full h-full items-start justify-start bg-background px-4 py-6">
            <div className="w-full h-full border-2 p-6 rounded-2xl shadow-xl">
                <h1 className="text-3xl font-semibold uppercase">Todolist</h1>
                <div className="w-full h-full items-start justify-start gap-10">
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
