import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem'

interface CardPostagensProps {
    postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagensProps) {
    return (
        <div className='bg-stone-300 bg-opacity-20  
            flex flex-col rounded-lg overflow-hidden justify-between'>

            <div>
                <div className="flex w-full bg-stone-600 text-white bg-opacity-80 py-1 justify-center items-center gap-4 ">
                    <img
                        src={postagem.usuario?.foto}
                        className='h-12 rounded-full'
                        alt={postagem.usuario?.nome} />
                    <h3 className='text-lg font-bold text-center uppercase'>
                        {postagem.usuario?.nome}
                    </h3>
                </div>
                <div className='p-4 '>
                    <h4 className='text-lg font-semibold uppercase '>{postagem.titulo}</h4>
                    <p>{postagem.texto}</p>
                    <p>Tema: {postagem.tema?.descricao}</p>
                    <p>Data: {new Intl.DateTimeFormat(undefined, {
                        dateStyle: 'full',
                        timeStyle: 'medium',
                    }).format(new Date(postagem.data))}</p>
                </div>
            </div>
            <div className="flex ">
                <Link to={`/editarpostagem/${postagem.id}`}
                    className='w-2/4 text-white hover:bg-stone-500 hover:bg-opacity-80 
                    bg-sky-900 ease-in duration-300 flex items-center justify-center py-2 rounded-lg '>
                    <button>Editar</button>
                </Link>
                <Link to={`/deletarpostagem/${postagem.id}`}
                    className='text-white hover:bg-stone-500
                    bg-yellow-900 w-2/4 flex items-center justify-center rounded-lg ease-in duration-300'>
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardPostagem