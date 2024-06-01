﻿import ListaPostagens from "../../components/postagem/listapostagens/ListaPostagens"
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem"


function Home() {
    return (
        <>
            <div className='bg-indigo-900 flex justify-center'>
                <div className='container grid grid-cols-2 text-white'>
                    <div className="flex flex-col gap-2 items-center justify-center py-4">
                        <h2 className='text-5xl font-bold'>
                            Olá, Seja Bem vindo(a)!
                        </h2>
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
                            src="https://ik.imagekit.io/mnz3yzqzot/Design%20sem%20nome%20(4).png?updatedAt=1717179395366"
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