import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import PublicRoute from './components/PublicRoute';
import Cashbook from './pages/Cashbook';
import Categories from './pages/Categories';
import Completed from './pages/Completed';
import Dashboard from './pages/Dashboard';
import EMITracker from './pages/EMITracker';
import Expenses from './pages/Expenses';
import Income from './pages/Income';
import Login from './pages/Login';
import Main from './pages/Main';
import Register from './pages/Register';
import TodoList from './pages/TodoList';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/main" element={<Main />} />
                <Route path="/" element={<PublicRoute />}>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/dashboard'  element={<Dashboard />} /> 
                    <Route path='/income' element={<Income />} />
                    <Route path='/expenses' element={<Expenses />} />
                    <Route path='/todo-list' element={<TodoList />} />
                    <Route path='/completed' element={<Completed />} />
                    <Route path='/categories' element={<Categories />} />
                    <Route path='/cashbook' element={<Cashbook />} />
                    <Route path='/emi-tracker' element={<EMITracker />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
