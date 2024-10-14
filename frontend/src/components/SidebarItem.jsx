import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function SidebarItem({ title = '', icon = '', route = '', active = false }) {
    return (
        <Link
            to={route}
            className={`w-full h-12 flex pl-5 cursor-pointer font-semibold text-lg items-center justify-start gap-3 rounded-xl ${
                active ? 'text-primary bg-white font-semibold rounded-lg' : 'text-white hover:bg-slate-800'
            }`}
        >
            <span>{icon}</span>
            <span>{title}</span>
        </Link>
    );
}

SidebarItem.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    route: PropTypes.string,
    active: PropTypes.bool,
};
