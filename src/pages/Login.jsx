import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, User, Lock } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(formData.email, formData.password);
            navigate('/calendario');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px' }}>
                <div className="text-center mb-4">
                    <div className="bg-primary text-white d-inline-block p-3 rounded-circle mb-3">
                        <LogIn size={32} />
                    </div>
                    <h2 className="fw-bold">Bienvenido</h2>
                    <p className="text-muted">Ingrese sus credenciales para acceder</p>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label d-flex align-items-center">
                            <User size={18} className="me-2" /> Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="form-control p-2"
                            placeholder="Ingrese su email"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label d-flex align-items-center">
                            <Lock size={18} className="me-2" /> Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="form-control p-2"
                            placeholder="Ingrese su contraseña"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100 py-2 fw-bold"
                        disabled={loading}
                    >
                        {loading ? 'Cargando...' : 'INICIAR SESIÓN'}
                    </button>

                    <div className="text-center mt-3">
                        <span>¿No tiene cuenta? </span>
                        <Link to="/registro" className="text-decoration-none fw-bold">Regístrese aquí</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
