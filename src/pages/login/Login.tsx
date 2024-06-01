import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import UsuarioLogin from '../../models/UsuarioLogin';
import { AuthContext } from '../../contexts/AuthContext';
import { RotatingLines } from 'react-loader-spinner';
import { Eye, EyeSlash } from '@phosphor-icons/react';

function Login() {

    // Direcionar para tela de login.
    const navigate = useNavigate();

    // trazendo propriedades da authcontext.
    const { usuario, handleLogin, isLoading } = useContext(AuthContext)

    // Estado recebe os dados que o usuário digita.
    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    )

    const [isShow, setIsShow] = useState(false);

    const handlePassword = () => setIsShow(!isShow);    

    // Após o usuário logar entra na home.
    useEffect(() => {
        if(usuario.token !== ''){
            navigate("/home")
        }
    }, [usuario])

    // Função que altera os valores do input. 
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value, // Pega os valores do campo nome e os valores digitados.
        })
    }

    // Função login 
    function login(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault(); // impede a página recarregar. 
        handleLogin(usuarioLogin)
    }

    console.log(JSON.stringify(usuarioLogin))

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold ">
                <form className="flex justify-center items-center flex-col w-2/2 gap-4" 
                    onSubmit={login}
                >
                    <h2 className="text-yellow-900 text-4xl ">Login</h2>
                    <div className="flex flex-col w-full text-yellow-900">
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="E-mail"
                            className="border-2 border-yellow-900 rounded-lg p-1"
                            value={usuarioLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <label className='w-full relative flex gap-2 items-center border-2 border-yellow-900 p-1 rounded-lg' htmlFor="senha">
                        <input 
                            type={isShow ? "text" : "password"}
                            id="senha"
                            name="senha"
                            className='bg-transparent outline-none rounded-none'
                            placeholder="Senha"
                            value={usuarioLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                        <button onClick={handlePassword} type='button' className='ml-12'>
                            {isShow && <Eye size={24} color="#999999" />}
                            {! isShow && <EyeSlash size={24} color="#999999" />}    
                        </button>
                        
                        </label>
                    <div className="flex">
                    </div>
                    <button
                        type='submit'
                        className="rounded-full bg-yellow-900 flex justify-center
                        hover:bg-zinc-600 text-white w-1/2 py-2">
                         {/* // If ternário com animação de entrar. */}
                        {isLoading ?
                            // Componente do react spinners. 
                            <RotatingLines
                                strokeColor='white'
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            />
                            :
                            <span>Entrar</span>
                        }
                        
                    </button>

                    <hr className="border-slate-800 w-full" />

                    <p>
                        Ainda não tem uma conta?{' '}
                        <Link to='/cadastro' className="text-yellow-900 hover:underline">
                        Cadastre-se!
                        </Link>
                    </p>
                </form>
                <div className="fundoLogin hidden lg:block"></div>
            </div>
        </>
    );
}

export default Login;