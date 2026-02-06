import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Shield, User, Calendar, Lock } from 'lucide-react';

const Registro = () => {
    const [formData, setFormData] = useState({
        jerarquia: '',
        legajo: '',
        nombre: '',
        antiguedadGral: '',
        antiguedadGrado: '',
        diasLicenciaRestantes: 0,
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError('Las contraseñas no coinciden');
        }

        setLoading(true);
        try {
            const { confirmPassword, ...dataToSave } = formData;
            await register(dataToSave);
            alert('Usuario registrado con éxito');
            navigate('/login');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%', borderRadius: '15px' }}>
                <div className="text-center mb-4">
                    <UserPlus size={48} className="text-primary mb-2" />
                    <h2 className="fw-bold">Registro de Usuario</h2>
                    <p className="text-muted">Complete los datos para crear su cuenta</p>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label d-flex align-items-center">
                                <Shield size={18} className="me-2" /> Jerarquía
                            </label>
                            <select
                                name="jerarquia"
                                className="form-select"
                                required
                                onChange={handleChange}
                                value={formData.jerarquia}
                            >
                                <option value="" disabled>Seleccione Jerarquía</option>
                                <option value="Oficial">Oficial</option>
                                <option value="Oficial 1°">Oficial 1°</option>
                                <option value="Oficial Mayor">Oficial Mayor</option>
                                <option value="Inspector">Inspector</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label d-flex align-items-center">
                                <Lock size={18} className="me-2" /> Legajo
                            </label>
                            <input
                                type="text"
                                name="legajo"
                                className="form-control"
                                placeholder="Número de Legajo"
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label d-flex align-items-center">
                                <User size={18} className="me-2" /> Apellido
                            </label>
                            <input
                                type="text"
                                name="apellido"
                                className="form-control"
                                placeholder="Pérez"
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label d-flex align-items-center">
                                <User size={18} className="me-2" /> Nombre
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                className="form-control"
                                placeholder="Juan"
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label d-flex align-items-center">
                                <Calendar size={18} className="me-2" /> Antigüedad (Gral)
                            </label>
                            <input
                                type="number"
                                name="antiguedadGral"
                                className="form-control"
                                placeholder="Años"
                                min="0"
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label d-flex align-items-center">
                                <Calendar size={18} className="me-2" /> Antigüedad (Grado)
                            </label>
                            <input
                                type="number"
                                name="antiguedadGrado"
                                className="form-control"
                                placeholder="Años"
                                min="0"
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-12">
                            <label className="form-label d-flex align-items-center fw-bold text-primary">
                                <Calendar size={18} className="me-2" /> Días de Licencia Anual Restantes
                            </label>
                            <input
                                type="number"
                                name="diasLicenciaRestantes"
                                className="form-control"
                                placeholder="Indique los días que le quedan"
                                min="0"
                                required
                                value={formData.diasLicenciaRestantes}
                                onChange={handleChange}
                            />
                            <div className="small text-muted mt-1">
                                Ingrese la cantidad de días de licencia anual que tiene pendientes de uso.
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label d-flex align-items-center">
                                <Lock size={18} className="me-2" /> Contraseña
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label d-flex align-items-center">
                                <Lock size={18} className="me-2" /> Confirmar
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className="form-control"
                                required
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100 mt-4 py-2 fw-bold"
                        disabled={loading}
                    >
                        {loading ? 'Procesando...' : 'REGISTRARSE'}
                    </button>

                    <div className="text-center mt-3">
                        <span>¿Ya tiene una cuenta? </span>
                        <Link to="/login" className="text-decoration-none fw-bold">Inicie sesión</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registro;
