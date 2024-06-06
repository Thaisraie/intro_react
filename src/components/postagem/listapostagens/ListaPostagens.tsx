import { useNavigate } from "react-router-dom";
import CardPostagens from "../cardpostagens/CardPostagens";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaPostagens() {

    const navigate = useNavigate();

    const [postagens, setPostagens] = useState<Postagem[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const [listar, setListar] = useState('')

    const listarPostagens = (listar: string) => {
        return  postagens.filter(project => project.titulo.toLowerCase().includes(listar.toLowerCase())) 
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
        buscarPostagens()
    }, [postagens.length])

    return (
        <>     

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
                        {postagens.length === 0 && (
                        <DNA
                        visible={true}
                        height="200"
                        width="200"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper mx-auto"
                        />
                         )}
                    </form>
                </div>


            <div className='container mx-auto my-4 
                grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
            >
                {listaPostagens.map((postagem) => (
                    <CardPostagens key={postagem.id} postagem={postagem} />
                ))}

            </div>
        </>
    );
}

export default ListaPostagens;