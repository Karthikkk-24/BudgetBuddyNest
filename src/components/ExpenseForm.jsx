import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import BaseURL from '../components/BaseURL';

export default function ExpenseForm ({ onExpenseAdded = () => {} }) {
    const [expenseCategories, setExpenseCategories] = useState([]);
    const [amount, setAmount] = useState(0);
    const [expenseName, setExpenseName] = useState('');
    const [expenseDate, setExpenseDate] = useState('');
    const [expenseCategory, setExpenseCategory] = useState('');

    useEffect(() => {
        getExpenseCategories();
    }, []);

    const user = sessionStorage.getItem('user_id');

    const getExpenseCategories = async () => {
        try {
            const response = await axios.post(
                `${BaseURL()}/api/finance/getExpenseCategories`,
                { user }
            );

            if (response.status === 200) {
                setExpenseCategories(response.data.expenseCategories);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleExpenseSubmit = async () => {
        try {
            const response = await axios.post(
                `${BaseURL()}/api/finance/addExpense`,
                {
                    user,
                    expenseName,
                    expenseCategory,
                    amount,
                    expenseDate,
                }
            );

            if (response.status === 201) {
                setAmount(0);
                setExpenseName('');
                setExpenseDate('');
                setExpenseCategory('');
                getExpenseCategories();
                onExpenseAdded();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col items-start justify-start w-full h-auto gap-4 mb-4">
            <div className="flex items-center justify-center w-full h-auto gap-6">
                <div className="w-1/2 flex flex-col items-start justify-start gap-2">
                    <label className="font-semibold text-sm">Expense Name</label>
                    <input
                        type="text"
                        name="name"
                        value={expenseName}
                        onChange={(e) => setExpenseName(e.target.value)}
                        id="name"
                        className="w-full h-12 border-2 border-slate-100 rounded-lg p-2"
                        required
                    />
                </div>
                <div className="w-1/2 flex flex-col items-start justify-start gap-2">
                    <label className="font-semibold text-sm">Date</label>
                    <input
                        type="date"
                        name="name"
                        value={expenseDate}
                        onChange={(e) => setExpenseDate(e.target.value)}
                        id="name"
                        className="w-full h-12 border-2 border-slate-100 rounded-lg p-2"
                        required
                    />
                </div>
            </div>
            <div className="flex items-center justify-center w-full h-auto gap-6">
                <div className="w-1/2 flex flex-col items-start justify-start gap-2">
                    <label className="font-semibold text-sm">Select Expense Category</label>
                    <select
                        name="category"
                        id="category"
                        className="w-full h-12 border-2 border-slate-100 rounded-lg p-2"
                        required
                        value={expenseCategory}
                        onChange={(e) => setExpenseCategory(e.target.value)}
                    >
                        <option value="">Select Expense Category</option>
                        {expenseCategories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-1/2 flex flex-col items-start justify-start gap-2">
                    <label className="font-semibold text-sm">Enter Amount</label>
                    <input
                        type="number"
                        name="amount"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full h-12 border-2 border-slate-100 rounded-lg p-2"
                        required
                    />
                </div>
            </div>
            <button
                onClick={handleExpenseSubmit}
                type="submit"
                className="w-auto h-auto hover:scale-110 transition-all bg-primary rounded-lg text-white px-5 py-3 flex items-center justify-center gap-1"
            >
                Submit
            </button>
        </div>
    );
}

ExpenseForm.propTypes = {
    onExpenseAdded: PropTypes.func
};