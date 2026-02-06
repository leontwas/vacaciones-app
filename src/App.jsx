import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Calendario from './pages/Calendario';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Personal from './pages/Personal';
import Header from './components/Header';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="d-flex justify-content-center align-items-center vh-100">Cargando...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return (
    <>
      <Header />
      {children}
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/calendario" element={
        <ProtectedRoute>
          <Calendario />
        </ProtectedRoute>
      } />
      <Route path="/personal" element={
        <ProtectedRoute>
          <Personal />
        </ProtectedRoute>
      } />
      <Route path="/" element={<Navigate to="/calendario" replace />} />
      <Route path="*" element={<div>404 - No Encontrado</div>} />
    </Routes>
  );
}

export default App;
