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
        <header className="bg-white shadow-sm py-3 px-4 fixed-top">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-4">
                    <div className="d-flex align-items-center gap-2">
                        <Calendar className="text-primary" />
                        <h4 className="m-0 fw-bold">Sistema Vacaciones</h4>
                    </div>

                    <nav className="d-none d-md-flex gap-3 ms-4 border-start ps-4">
                        <NavLink
                            to="/calendario"
                            className={({ isActive }) => `text-decoration-none fw-semibold ${isActive ? 'text-primary' : 'text-muted hover-primary'}`}
                        >
                            <Calendar size={18} className="me-1" /> Calendario
                        </NavLink>
                        <NavLink
                            to="/personal"
                            className={({ isActive }) => `text-decoration-none fw-semibold ${isActive ? 'text-primary' : 'text-muted hover-primary'}`}
                        >
                            <Users size={18} className="me-1" /> Personal
                        </NavLink>
                    </nav>
                </div>

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
