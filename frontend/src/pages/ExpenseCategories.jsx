import axios from 'axios';
import { useEffect, useState } from 'react';
import BaseURL from '../components/BaseURL';

export default function ExpenseCategories() {
    const [expenseCategoryName, setExpenseCategoryName] = useState('');
    const [expenseCategories, setExpenseCategories] = useState([]);

    useEffect(() => {
        getExpenseCategories();
    }, []);

    const user = sessionStorage.getItem('user_id');

    const getExpenseCategories = async () => {
        try {
            const response = await axios.post(
                `${BaseURL()}/api/finance/getExpenseCategories`,
                {
                    user,
                }
            );

            console.log(response.data);

            if (response.status === 200) {
                console.log(response.data);
                setExpenseCategoryName('');
                setExpenseCategories(response.data.expenseCategories);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async () => {
        try {
            if (!expenseCategoryName) {
                return;
            }

            const response = await axios.post(
                `${BaseURL()}/api/finance/addExpenseCategory`,
                {
                    user,
                    expenseCategoryName,
                }
            );

            console.log(response.data);

            if (response.status === 201) {
                console.log(response.data);
                setExpenseCategoryName('');
                getExpenseCategories();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h3 className="text-2xl font-semibold text-primary">Expense Categories</h3>
            <div className="flex flex-col items-start justify-start gap-2 w-full h-auto">
                <label
                    htmlFor="expense"
                    className="font-semibold text-primary text-sm text-left"
                >
                    Expense Category Name
                </label>
                <input
                    type="text"
                    className="border-2 rounded-xl border-slate-100 pl-3 pr-3 h-10 w-96"
                    value={expenseCategoryName}
                    id="expense"
                    onChange={(e) => setExpenseCategoryName(e.target.value)}
                />
            </div>
            <button
                type="submit"
                onClick={handleSubmit}
                className="bg-primary h-auto w-auto py-3 px-5 font-semibold text-sm rounded-lg text-white hover:scale-110 transition-all"
            >
                Submit
            </button>
            <table className="w-full border-2 mt-5 border-slate-100">
                <thead>
                    <tr>
                        <th className="py-3">Sr. No</th>
                        <th className="py-3">Income Category Name</th>
                        <th className="py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenseCategories.map((expenseCategory, index) => (
                        <tr key={expenseCategory._id}>
                            <td className="text-center py-3">{index + 1}</td>
                            <td className="text-center py-3">
                                {expenseCategory.title}
                            </td>
                            <td className="text-center py-3">
                                <button
                                    type="submit"
                                    className="bg-red-500 h-auto w-auto py-3 px-5 font-semibold text-sm rounded-lg text-white hover:scale-110 transition-all"
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
                                        className="icon icon-tabler icons-tabler-outline icon-tabler-trash-x"
                                    >
                                        <path
                                            stroke="none"
                                            d="M0 0h24v24H0z"
                                            fill="none"
                                        />
                                        <path d="M4 7h16" />
                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                        <path d="M10 12l4 4m0 -4l-4 4" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
