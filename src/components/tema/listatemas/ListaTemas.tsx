import { useContext, useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import CardTemas from "../cardtemas/CardTemas";
import { buscar } from "../../../services/Service";


function ListaTemas() {

    const navigate = useNavigate()

    // Recebe todos os temas do banco de dados.
    const [temas, setTemas] = useState<Tema[]>([])

    // Encaminha o token para autorizar mostrar o tema. 
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarTemas() {
        try {
            await buscar(`/temas`, setTemas, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                alert('O token expirou!')
                handleLogout()
            }
        }
    }

    // Solicita o usuário logar após expirar o tema.
    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

    // Mostra todos os temas.
    useEffect(() => {
        buscarTemas()
    }, [temas.length])

    return (
        <>
            {/* // Animação até trazer todos os temas.  */}
            {temas.length === 0 && (
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}

            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8">
                        <>
                            {temas.map((tema) => (

                                <>
                                    <CardTemas key={tema.id} tema={tema} />
                                </>

                            ))}
                        </>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListaTemas;