import axios from 'axios';
import 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import BaseURL from '../components/BaseURL';
import DashboardSmallBox from '../components/DashboardSmallBox';

export default function Dashboard() {
    const [pendingTask, setPendingTask] = useState(0);
    const [completedTask, setCompletedTask] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);

    useEffect(() => {
        getTodayTasks();
        getCompletedTasks();
        getTotalExpenses();
        getTotalIncome();
        fetchExpenseData();
        fetchIncomeData();
    }, []);

    const user = sessionStorage.getItem('user_id');

    const getTodayTasks = async () => {
        try {
            const response = await axios.post(
                `${BaseURL()}/api/users/getTodayTasks`,
                {
                    user,
                }
            );

            console.log(response.data);

            if (response.status === 200) {
                console.log(response.data);
                setPendingTask(response.data.count);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getCompletedTasks = async () => {
        try {
            const response = await axios.post(
                `${BaseURL()}/api/users/getTodayCompletedTasks`,
                {
                    user,
                }
            );

            console.log(response.data);

            if (response.status === 200) {
                console.log(response.data);
                setCompletedTask(response.data.count);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getTotalExpenses = async () => {
        try {
            const response = await axios.post(
                `${BaseURL()}/api/finance/getTotalExpenses`,
                {
                    user,
                }
            );

            console.log(response.data);

            if (response.status === 200) {
                if (response.data.totalExpenses.length > 0) {
                    // console.log(
                    //     'totalExpenses',
                    //     response.data.totalExpenses[0].total
                    // );
                    setTotalExpenses(response.data.totalExpenses[0]?.total || 0);
                } else {
                    setTotalExpenses(0);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getTotalIncome = async () => {
        try {
            const response = await axios.post(
                `${BaseURL()}/api/finance/getTotalIncome`,
                {
                    user,
                }
            );

            console.log(response.data);

            if (response.status === 200) {
                // console.log(response.data);
                // console.log('totalIncome', response.data.totalIncome[0].total);
                if (response.data.totalIncome.length > 0) {
                    setTotalIncome(response.data.totalIncome[0]?.total || 0);
                } else {
                    setTotalIncome(0);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchIncomeData = async () => {
        try {
            const response = await axios.post(
                `${BaseURL()}/api/finance/getIncomeData`,
                { user }
            );
            if (response.status === 200) {
                setIncomeData(response.data.incomeData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchExpenseData = async () => {
        try {
            const response = await axios.post(
                `${BaseURL()}/api/finance/getExpenseData`,
                { user }
            );
            if (response.status === 200) {
                setExpenseData(response.data.expenseData);
            }
        } catch (error) {
            console.log(error);
        }
    };


    const data = {
        labels: incomeData.map((item) => item.date),
        datasets: [
            {
                label: 'Income',
                data: incomeData.map((item) => item.amount),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
                label: 'Expense',
                data: expenseData.map((item) => item.amount),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    return (
        <div className="flex flex-col w-full h-full items-start justify-start bg-background p-5 overflow-y-auto">
            <div className="w-full h-auto flex items-center justify-center gap-6">
                <DashboardSmallBox data={pendingTask} name="Pending Tasks" />
                <DashboardSmallBox
                    data={completedTask}
                    name="Completed Tasks"
                />
                <DashboardSmallBox data={totalExpenses} name="Total Expenses" />
                <DashboardSmallBox data={totalIncome} name="Total Income" />
            </div>

            <div className="w-full h-auto flex items-center justify-center mt-10">
                <div className="w-full shadow-xl rounded-2xl p-10 h-full">
                    <Line data={data} />
                </div>
            </div>
        </div>
    );
}
