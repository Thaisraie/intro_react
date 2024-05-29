import { createContext, ReactNode, useState } from "react";
import UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerta";

// Guarda o estádo dos usuários autenticado.
interface AuthContextProps {
    usuario: UsuarioLogin;
    handleLogout(): void; // Sair da aplicação.
    handleLogin(usuario: UsuarioLogin): Promise<void>; // Função que comunica com a API. 
    isLoading: boolean; // Controla as animações.
}

// Componente renderizado tem acesso.
interface AuthProviderProps {
    children: ReactNode; // Qualquer componente que pode ser renderizado na TELA. 
}

// Criando contexto e dispobilizando globalmente.
export const AuthContext = createContext({} as AuthContextProps)

// Criando provider e disponibilizando globalmente, todos os filhos de app tem acesso a propriedades.
export function AuthProvider({ children }: AuthProviderProps) {

    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: ''
    });

    // Carrega animação na tela. 
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(userLogin: UsuarioLogin) {

        setIsLoading(true);

        try {

            // Função de login.
            await login(`/usuarios/logar`, userLogin, setUsuario);
            ToastAlerta("Usuário autenticado com sucesso!" , "sucesso");
            setIsLoading(false);

        } catch (error) {

            ToastAlerta("Dados do Usuário inconsistentes!", "erro");
            setIsLoading(false);

        }
    }

    // Sai da aplicação.
    function handleLogout() {
        setUsuario({
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: '',
            token: '',
        })
    }

    // Desustruturação utiliza qual você precisar. 
    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}