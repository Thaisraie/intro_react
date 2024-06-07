import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import CardTemas from "../cardtemas/CardTemas";
import { buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { BeatLoader } from "react-spinners";


function ListaTemas() {

    const navigate = useNavigate()

    // Recebe todos os temas do banco de dados.
    const [temas, setTemas] = useState<Tema[]>([])

    // Encaminha o token para autorizar mostrar o tema. 
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const [loading, setLoading] = useState(true);


    async function buscarTemas() {
        try {
            await buscar(`/temas`, setTemas, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                ToastAlerta('O token expirou!', "erro")
                handleLogout()
            }
        }
    }

    // Solicita o usuário logar após expirar o tema.
    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', "info")
            navigate('/')
        }
    }, [token])

    // Mostra todos os temas.
    useEffect(() => {
        buscarTemas()
    }, [temas.length])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    return (

        loading ?
        <div className="flex justify-center items-center w-full h-screen">
            <BeatLoader
            loading={true}
            color="#5c919f"/>
            </div> : 
    <div>

            <div className="container mx-auto my-4 
                grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                   
                        {temas.length !== 0 ? 
                            temas.map((temas) => (
                                <CardTemas key={temas.id} tema={temas}
                                />             
                            )) : <div>
                            <p>Você não possui temas.</p>
                            </div>

                            }
            
            </div>
    </div>
    );
}
export default ListaTemas;