import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const PublicRoute = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        checkLogin();
    }, []);

    function checkLogin() {
        if (sessionStorage.getItem('token')) {
            // navigate('/dashboard');
        } else {
            sessionStorage.clear();
            sessionStorage.clear();
            navigate('/login');
        }
    }


    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <div className="w-full h-full flex items-start justify-start">
                <div className="w-96 h-full flex flex-col items-start justify-start">
                    <Sidebar currentPath={location.pathname} />
                </div>
                <div className="w-full h-full flex flex-col items-start justify-start">
                    <Navbar />
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default PublicRoute;
