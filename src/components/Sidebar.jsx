import PropTypes from 'prop-types';
import SidebarItem from './SidebarItem';

export default function Sidebar({ currentPath = '' }) {
    return (
        <div className="w-full h-full flex items-start justify-start gap-4 flex-col px-3 py-5 bg-text custom-pattern">
            <div className="w-full h-auto flex flex-col items-start justify-start">
                <h1 className="text-3xl text-white font-bold">
                    Expense Tracker
                </h1>
                <h4 className="text-xl text-white font-semibold">
                    Welcome {sessionStorage.getItem('user')}
                </h4>
            </div>
            <div className="w-full h-full flex flex-col items-start justify-start">
                <SidebarItem
                    title="Home"
                    active={currentPath === '/dashboard' || currentPath === '/'}
                    icon="🏠"
                    route={'/dashboard'}
                />
                <SidebarItem
                    active={currentPath === '/income'}
                    title="Income"
                    icon="💸"
                    route={'/income'}
                />
                <SidebarItem
                    active={currentPath === '/expenses'}
                    title="Expenses"
                    icon="💰"
                    route={'/expenses'}
                />
                <SidebarItem
                    title="Categories"
                    icon="📋"
                    route={'/categories'}
                    active={currentPath === '/categories'}
                />
                <SidebarItem
                    active={currentPath === '/cashbook'}
                    title="Cashbook"
                    icon="📕"
                    route={'/cashbook'}
                />
                <SidebarItem
                    active={currentPath === '/todo-list'}
                    title="Todolist"
                    icon="📝"
                    route={'/todo-list'}
                />
                <SidebarItem
                    active={currentPath === '/completed'}
                    title="Completed"
                    icon="✅"
                    route={'/completed'}
                />
                <SidebarItem
                    active={currentPath === '/emi-tracker'}
                    title="EMI Tracker"
                    icon="📅"
                    route={'/emi-tracker'}
                />
            </div>
        </div>
    );
}

Sidebar.propTypes = {
    currentPath: PropTypes.string,
};
