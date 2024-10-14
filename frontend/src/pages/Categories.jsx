import ExpenseCategories from './ExpenseCategories';
import IncomeCategories from './IncomeCategories';

export default function Categories() {

    return (
        <div className="flex w-full h-full items-start justify-start bg-background px-4 py-6 gap-8">
            <div className="h-full w-1/2 flex flex-col items-start justify-start gap-3 shadow-xl p-5 rounded-3xl border-2">
                <IncomeCategories />
            </div>
            <div className="h-full w-1/2 flex flex-col items-start justify-start gap-3 shadow-xl p-5 rounded-3xl border-2">
                <ExpenseCategories />
            </div>
        </div>
    );
}
