import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Obtener sesión inicial
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                setUser({ ...session.user, ...profile });
            }
            fetchUsers();
            setLoading(false);
        };

        getSession();

        // Escuchar cambios en la sesión
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                setUser({ ...session.user, ...profile });
            } else {
                setUser(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchUsers = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('jerarquia', { ascending: true });

        if (!error) {
            setUsers(data);
        }
    };

    const register = async (userData) => {
        // 1. Registrar en Auth con metadatos para el Trigger usando el email real
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: userData.email,
            password: userData.password,
            options: {
                data: {
                    legajo: userData.legajo,
                    nombre: userData.nombre,
                    apellido: userData.apellido,
                    jerarquia: userData.jerarquia,
                    antiguedad_gral: parseInt(userData.antiguedadGral),
                    antiguedad_grado: parseInt(userData.antiguedadGrado),
                    dias_licencia_restantes: parseInt(userData.diasLicenciaRestantes)
                }
            }
        });

        if (authError) throw authError;

        await fetchUsers();
        return true;
    };

    const login = async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;
        return true;
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    const deleteUser = async (id) => {
        // Nota: El borrado de Auth requiere privilegios de admin (Service Role)
        // Por ahora borraremos el perfil. El registro de Auth quedará inactivo.
        const { error } = await supabase
            .from('profiles')
            .delete()
            .eq('id', id);

        if (error) throw error;
        await fetchUsers();
    };

    return (
        <AuthContext.Provider value={{ user, users, register, login, logout, deleteUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
