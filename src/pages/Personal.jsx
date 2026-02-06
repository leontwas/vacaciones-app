import { useAuth } from '../context/AuthContext';
import { Users, Search, ArrowUpDown, Calendar, Trash2 } from 'lucide-react';
import { useState } from 'react';

const Personal = () => {
    const { users, deleteUser } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');

    const jerarquiaPriority = {
        'Inspector': 1,
        'Oficial Mayor': 2,
        'Oficial 1°': 3,
        'Oficial': 4
    };

    const handleDelete = (id, nombre) => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar a ${nombre}?`)) {
            deleteUser(id);
        }
    };

    const getLicenseDays = (antiguedad_gral) => {
        const years = parseInt(antiguedad_gral) || 0;
        if (years >= 1 && years <= 4) return 15;
        if (years >= 5 && years <= 10) return 21;
        if (years >= 11 && years <= 30) return 30;
        return 0;
    };

    const sortedUsers = [...users].sort((a, b) => {
        // 1. Jerarquía (según prioridad definida)
        const pA = jerarquiaPriority[a.jerarquia] || 99;
        const pB = jerarquiaPriority[b.jerarquia] || 99;
        if (pA !== pB) return pA - pB;

        // 2. Años en la jerarquía (Antigüedad en Grado) - Descendente
        const gA = parseInt(a.antiguedad_grado) || 0;
        const gB = parseInt(b.antiguedad_grado) || 0;
        if (gA !== gB) return gB - gA;

        // 3. Años en la general - Descendente
        const grA = parseInt(a.antiguedad_gral) || 0;
        const grB = parseInt(b.antiguedad_gral) || 0;
        return grB - grA;
    });

    const filteredUsers = sortedUsers.filter(u =>
        u.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.apellido?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.legajo?.includes(searchTerm)
    );

    return (
        <div className="container-fluid py-5 mt-5">
            <div className="card shadow-sm border-0 p-4" style={{ borderRadius: '15px' }}>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                    <div className="d-flex align-items-center gap-2">
                        <Users className="text-primary" size={32} />
                        <h2 className="m-0 fw-bold">Listado de Personal</h2>
                    </div>

                    <div className="position-relative" style={{ maxWidth: '400px', width: '100%' }}>
                        <Search className="position-absolute top-50 translate-middle-y ms-3 text-muted" size={18} />
                        <input
                            type="text"
                            className="form-control ps-5 rounded-pill"
                            placeholder="Buscar por legajo, nombre o apellido..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th className="border-0 rounded-start">Jerarquía</th>
                                <th className="border-0">LP (Legajo)</th>
                                <th className="border-0">Apellido</th>
                                <th className="border-0">Nombre</th>
                                <th className="border-0 text-center">Años Jerarquía</th>
                                <th className="border-0 text-center">Años Gral.</th>
                                <th className="border-0 text-center">Días Licencia</th>
                                <th className="border-0 text-center">Días Restantes</th>
                                <th className="border-0 rounded-end text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((u) => (
                                    <tr key={u.id}>
                                        <td>
                                            <span className={`badge rounded-pill ${u.jerarquia === 'Inspector' ? 'bg-primary' :
                                                u.jerarquia === 'Oficial Mayor' ? 'bg-info text-dark' :
                                                    'bg-secondary'
                                                }`}>
                                                {u.jerarquia}
                                            </span>
                                        </td>
                                        <td className="fw-bold">{u.legajo}</td>
                                        <td>{u.apellido?.toUpperCase() || <span className="text-secondary small italic">Vacío</span>}</td>
                                        <td>{u.nombre}</td>
                                        <td className="text-center">{u.antiguedad_grado}</td>
                                        <td className="text-center">{u.antiguedad_gral}</td>
                                        <td className="text-center">
                                            <div className="d-flex align-items-center justify-content-center gap-1 text-success fw-bold">
                                                <Calendar size={14} />
                                                {getLicenseDays(u.antiguedad_gral)}
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <span className="badge bg-light text-primary border border-primary shadow-sm px-3 py-2">
                                                {u.dias_licencia_restantes || 0} Días
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <button
                                                className="btn btn-sm btn-outline-danger border-0 p-1"
                                                onClick={() => handleDelete(u.id, u.nombre)}
                                                title="Eliminar registro"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center py-5 text-muted">
                                        No se encontraron usuarios registrados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Personal;
