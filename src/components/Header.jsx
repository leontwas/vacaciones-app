import { useAuth } from '../context/AuthContext';
import { LogOut, Calendar, User, Users } from 'lucide-react';
import { useNavigate, Link, NavLink } from 'react-router-dom';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <header className="bg-white shadow-sm py-3 px-2 px-md-4 fixed-top">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <Link to="/calendario" className="text-decoration-none text-dark me-2">
                    <h5 className="m-0 fw-bold">Vacaciones</h5>
                </Link>

                <nav className="d-flex gap-1 gap-md-3 border-start ps-2 ps-md-3">
                    <NavLink
                        to="/calendario"
                        className={({ isActive }) => `text-decoration-none fw-semibold d-flex align-items-center px-2 py-1 rounded ${isActive ? 'bg-primary text-white shadow-sm' : 'text-muted hover-primary'}`}
                    >
                        <Calendar size={18} className="me-2" />
                        <span className="small">Calendario</span>
                    </NavLink>
                    <NavLink
                        to="/personal"
                        className={({ isActive }) => `text-decoration-none fw-semibold d-flex align-items-center px-2 py-1 rounded ${isActive ? 'bg-primary text-white shadow-sm' : 'text-muted hover-primary'}`}
                    >
                        <Users size={18} className="me-2" />
                        <span className="small">Personal</span>
                    </NavLink>
                </nav>

                <div className="d-flex align-items-center gap-3">
                    <div className="text-end d-none d-md-block">
                        <div className="fw-bold">{user.nombre}</div>
                        <small className="text-muted">{user.jerarquia} - Legajo: {user.legajo}</small>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="btn btn-outline-danger d-flex align-items-center gap-2"
                        title="Cerrar Sesión"
                    >
                        <LogOut size={18} />
                        <span className="d-none d-md-inline">Salir</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
