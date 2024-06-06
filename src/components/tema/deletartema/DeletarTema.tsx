import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarTema() {

    const navigate = useNavigate()

    // Receber os dados do Tema, que será cadastrado ou atualizado
    const [tema, setTema] = useState<Tema>({} as Tema);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', "info")
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function retornar() {
        navigate('/temas')
    }

    async function deletarTema() {
        setIsLoading(true)

        try {
            await deletar(`/temas/${id}`, {
                headers: { Authorization: token }
            })
            ToastAlerta('O Tema foi apagado com sucesso!', "sucesso")
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }else{
                ToastAlerta('Erro ao Excluir o Tema!', "erro")
            }
        }

        setIsLoading(false)
        retornar()
    }

    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar tema</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o tema a seguir?</p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header 
                    className='py-2 px-6 bg-stone-600 bg-opacity-70 text-white font-bold text-2xl'>
                    Tema
                </header>
                <p className='p-8 text-3xl  h-full bg-stone-300 bg-opacity-20'>{tema.descricao}</p>
                <div className="flex">
                    <button 
                        className='text-slate-100  w-full py-2  hover:bg-stone-500 hover:bg-opacity-80 
                         bg-sky-900 ease-in duration-300 rounded-lg'
                        onClick={retornar}
                        >
                        Não
                    </button>
                    <button 
                        className='w-full text-slate-100 hover:bg-stone-500
                         bg-yellow-900 ease-in duration-300 flex items-center justify-center rounded-lg'
                        onClick={deletarTema}
                        >
                        {isLoading ? <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="24"
                        visible={true}
                    /> :
                        <span>Sim</span>
                    }
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeletarTema