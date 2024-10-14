import axios from 'axios';
import { useEffect, useState } from 'react';
import BaseURL from '../components/BaseURL';

export default function Cashbook() {
    const [cashbookEntries, setCashbookEntries] = useState([]);

    useEffect(() => {
        fetchCashbookEntries();
    }, []);

    const user = sessionStorage.getItem('user_id');

    const fetchCashbookEntries = async () => {
        try {
            const response = await axios.post(
                `${BaseURL()}/api/finance/getCashbookEntries`,
                {
                    user,
                }
            );

            console.log(response.data);

            if (response.status === 200) {
                console.log(response.data);
                setCashbookEntries(response.data.cashbookEntries);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const formatDate = (param) => {
        const arr = param.split('-');
        return arr[2] + ' / ' + arr[1] + ' / ' + arr[0];
    };

    return (
        <div className="flex w-full h-full flex-col items-start justify-start gap-5 bg-background px-4 py-6">
            <div className="w-full h-full border-2 p-6 rounded-2xl shadow-xl">
                <h1 className="text-5xl mb-4">Cashbook</h1>
                <div className="w-full h-auto flex flex-col items-center justify-center">
                    <table className="border-2 border-slate-100 w-full">
                        <thead>
                            <tr>
                                <th className="border-2 py-3 border-slate-100">
                                    Date
                                </th>
                                <th className="border-2 py-3 border-slate-100">
                                    Title
                                </th>
                                <th className="border-2 py-3 border-slate-100">
                                    Debit
                                </th>
                                <th className="border-2 py-3 border-slate-100">
                                    Credit
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cashbookEntries.map((entry) => (
                                <tr key={entry._id}>
                                    <td className="text-center border-2 py-3 border-slate-100">
                                        {formatDate(entry.date)}
                                    </td>
                                    <td className="text-center border-2 py-3 border-slate-100">
                                        {entry.title}
                                    </td>
                                    <td className="text-center border-2 py-3 border-slate-100">
                                        {entry.heading === 'Expense'
                                            ? entry.amount
                                            : 0}
                                    </td>
                                    <td className="text-center border-2 py-3 border-slate-100">
                                        {entry.heading === 'Income'
                                            ? entry.amount
                                            : 0}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
