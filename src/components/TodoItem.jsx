import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import BaseURL from './BaseURL';

export default function TodoItem({ title = '', status = false, id = 0 }) {

    const [checkStatus, setCheckStatus] = useState(status);

    const toggleStatus = async() => {
        try {
            const newStatus = !status;
            setCheckStatus(newStatus);
            console.log('status', newStatus);
            const response = await axios.post(`${BaseURL()}/api/users/updateTodo`, {
                id,
                status: 'completed'
            });

            console.log(response.data);

            if (response.status === 200) {
                console.log(response.data);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = (param) => {
        try {
            console.log('handleDelete');
            console.log(param);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full h-12 flex pl-5 cursor-pointer text-white bg-primary font-semibold text-lg items-center justify-start gap-3 hover:bg-slate-800 rounded-3xl relative">
            <input
                type="checkbox"
                checked={checkStatus}
                onChange={toggleStatus}
                className="w-5 h-5 rounded-full border-2"
            />
            <span>{title}</span>
            <button onClick={() => handleDelete(id)} className="absolute h-8 w-8 rounded-full hover:bg-red-500 flex items-center justify-center right-5 top-1/2 -translate-y-1/2">
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
                    className="icon icon-tabler icons-tabler-outline icon-tabler-trash-x"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7h16" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    <path d="M10 12l4 4m0 -4l-4 4" />
                </svg>
            </button>
        </div>
    );
}

TodoItem.propTypes = {
    title: PropTypes.string,
    status: PropTypes.bool,
    id: PropTypes.number,
};
