import { useNavigate } from "react-router-dom";
import CardPostagens from "../cardpostagens/CardPostagens";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { BeatLoader } from "react-spinners";

function ListaPostagens() {

    const navigate = useNavigate();

    const [postagens, setPostagens] = useState<Postagem[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;
    
    const [loading, setLoading] = useState(true);

    const [listar, setListar] = useState('')

    const listarPostagens = (listar: string) => {
        return postagens.filter(project => project.titulo.toLowerCase().includes(listar.toLowerCase()))
    }

    const listaPostagens = listarPostagens(listar)

    async function buscarPostagens() {
        try {
            await buscar('/postagens', setPostagens, {
                headers: {
                    Authorization: token,
                },
            })

        } catch (error: any) {
            if (error.toString().includes('403')) {
                ToastAlerta('O token expirou, favor logar novamente', "info")
                handleLogout()
            }
        }
    }   

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', "info")
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    useEffect(() => {
        buscarPostagens()
    }, [postagens.length])

    return (

                loading ?
        <div className="flex justify-center items-center w-full h-screen">
            <BeatLoader
            loading={true}
            color="#5c919f"/>
            </div> : 
    <div>

            <div className="flex justify-center items-center text-black mt-6">
                <form className="w-3/4 flex justify-center ">
                    <input className="w-3/12 h-9 rounded-lg px-4 py-4 focus:outline-none bg-slate-500 bg-opacity-20"
                        type="search"
                        placeholder="Pesquisar postagem"
                        id="busca"
                        name="busca"
                        required
                        onChange={(e) => setListar(e.target.value)}
                    />

                </form>
            </div>


            <div className='container mx-auto my-4 
                grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
            >
                <div className="flex items-center justify-center">
                {listaPostagens.length !== 0 ? listaPostagens.map((postagem) => (
                    <CardPostagens key={postagem.id} postagem={postagem} />
                )) : <div>
                    <p className="text-3xl bg-yellow-900 text-white opacity-60 rounded-md">Você não possui postagens.
                    </p>
                    </div>
                }
                </div>
            </div>
            </div>
    );
}

export default ListaPostagens;