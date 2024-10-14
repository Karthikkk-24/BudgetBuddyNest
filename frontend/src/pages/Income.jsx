import { useState } from 'react';
import IncomeForm from '../components/IncomeForm';
import IncomeTable from '../components/IncomeTable';

export default function Income() {
    const [refresh, setRefresh] = useState(false);

    const handleIncomeAdded = () => {
        setRefresh(!refresh);
    };

    return (
        <div className="flex w-full h-full items-start justify-start gap-10 bg-background px-4 py-6 flex-col">
            <div className="w-full h-full border-2 p-6 rounded-2xl shadow-xl">
                <h1 className="text-5xl mb-4">Income</h1>
                <IncomeForm onIncomeAdded={handleIncomeAdded} />
                <IncomeTable refresh={refresh} />
            </div>
        </div>
    );
}
