import { useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';

export default function Expenses() {
    const [refresh, setRefresh] = useState(false);

    const handleExpenseAdded = () => {
        setRefresh(!refresh);
    };

    return (
        <div className="flex w-full h-full items-start justify-start gap-10 bg-background px-4 py-6 flex-col">
            <div className="w-full h-full border-2 p-6 rounded-2xl shadow-xl">
                <h1 className="text-5xl mb-4">Expense</h1>
                <ExpenseForm onExpenseAdded={handleExpenseAdded} />
                <ExpenseTable refresh={refresh} />
            </div>
        </div>
    );
}
