﻿import { useContext } from "react"
import ListaPostagens from "../../components/postagem/listapostagens/ListaPostagens"
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem"
import { AuthContext } from "../../contexts/AuthContext"


function Home() {

    const { usuario } = useContext(AuthContext)


    return (
        <>
            <div className='bg-stone-300 bg-opacity-20 flex justify-center'>
                <div className='container grid grid-cols-2 text-yellow-900'>
                    <div className="flex flex-col gap-2 items-center justify-center py-4">
                        <h2 className='text-5xl font-bold text-'>
                            Olá, {usuario.nome}!
                        </h2>
                        <p className="text-4xl font-bold">Seja bem vindo(a).</p>
                        <p className='text-xl'>
                            Expresse aqui seus pensamentos e opniões
                        </p>

                        <div className="flex justify-around gap-4">
                            <div className="flex justify-around gap-4">
                                <ModalPostagem />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center py-4">
                        <img
                            src="https://ik.imagekit.io/mnz3yzqzot/oie_transparent%20(4).png?updatedAt=1717304330464"
                            className='w-2/4'
                        />
                    </div>
                </div>
            </div>

            <ListaPostagens />
        </>
    )
}

export default Home