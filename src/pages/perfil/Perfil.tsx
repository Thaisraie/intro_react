import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { ToastAlerta } from '../../utils/ToastAlerta'

function Perfil() {

    const navigate = useNavigate()

    const { usuario } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token === "") {
            ToastAlerta('Você precisa estar logado', "info")
            navigate("/")
        }
    }, [usuario.token])

    return (
        <div className='container mx-auto m-4 rounded-2xl overflow-hidden'>

            <img 
            className='w-full h-72 object-cover border-b-8 border-white'
            src="https://i.pinimg.com/736x/a0/f6/7a/a0f67a993f6b61419bb5845c674c787b.jpg" alt="Capa do Perfil" />

            <img 
                className='rounded-full w-48 mx-auto mt-[-8rem] border-8 border-sky-900 relative z-10' 
                src={usuario.foto} alt={`Foto de perfil de ${usuario.nome}`} />

            <div 
                className="relative mt-[-6rem] h-72 flex flex-col 
                    bg-stone-500 bg-opacity-60 text-black text-lg items-center justify-center"
            >
                <p>Nome: {usuario.nome} </p>
                <p>Email: {usuario.usuario}</p> 
            </div>

        </div>
    )
}

export default Perfil