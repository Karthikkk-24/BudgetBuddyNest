import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import BaseURL from './BaseURL';


export default function IncomeTable({ refresh = false }) {
    const [incomeData, setIncomeData] = useState([]);

    useEffect(() => {
        getAllIncome();
    }, [refresh]);

    const user = sessionStorage.getItem('user_id');

    const getAllIncome = async () => {
        try {
            const response = await axios.post(
                `${BaseURL()}/api/finance/getAllIncome`,
                {
                    user,
                }
            );

            console.log(response.data);

            if (response.status === 200) {
                console.log(response.data.getIncome);
                setIncomeData(response.data.getIncome);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full h-auto flex flex-col items-start justify-start">
            <table className="border-2 w-full border-slate-100">
                <thead>
                    <tr>
                        <th className="py-3">Sr. No</th>
                        <th className="py-3">Date</th>
                        <th className="py-3">Category</th>
                        <th className="py-3">Title</th>
                        <th className="py-3">Amount</th>
                        <th className="py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {incomeData.map((income, index) => {
                        return (
                            <tr key={index}>
                                <td className="py-3 text-center">
                                    {index + 1}
                                </td>
                                <td className="py-3 text-center">
                                    {income.date}
                                </td>
                                <td className="py-3 text-center">
                                    {income.category}
                                </td>
                                <td className="py-3 text-center">
                                    {income.title}
                                </td>
                                <td className="py-3 text-center">
                                    {income.amount}
                                </td>
                                <td className="py-3 text-center">
                                    <div className="w-12 h-12 flex items-center justify-center">
                                        <button className="w-auto h-auto px-3 py-3 rounded-xl bg-blue-500 flex items-center justify-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="icon icon-tabler icons-tabler-outline icon-tabler-edit"
                                            >
                                                <path
                                                    stroke="none"
                                                    d="M0 0h24v24H0z"
                                                    fill="none"
                                                />
                                                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                                                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                                                <path d="M16 5l3 3" />
                                            </svg>
                                        </button>
                                        &emsp;
                                        <button className="w-auto h-auto px-3 py-3 rounded-xl bg-red-500 flex items-center justify-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                                            >
                                                <path
                                                    stroke="none"
                                                    d="M0 0h24v24H0z"
                                                    fill="none"
                                                />
                                                <path d="M4 7l16 0" />
                                                <path d="M10 11l0 6" />
                                                <path d="M14 11l0 6" />
                                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

IncomeTable.propTypes = {
    refresh: PropTypes.bool,
};