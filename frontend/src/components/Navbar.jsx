import { IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        sessionStorage.clear();
        navigate('/login');
    }

    return (
        <div className="h-20 w-full flex items-center px-6 justify-between">
            <div>
                <Link to="/dashboard" className="flex items-center justify-center gap-2">Home</Link>
            </div>
            <button className="text-white flex gap-2 items-center justify-center font-bold bg-red-500 rounded-md h-12 w-auto px-7 hover:scale-105 transition-all" onClick={handleLogout}>
                Logout <IoLogOutOutline />
            </button>
        </div>
    );
}
