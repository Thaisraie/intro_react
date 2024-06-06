import { Link } from 'react-router-dom'
import Tema from '../../../models/Tema'

interface CardTemasProps{
    tema: Tema
}

function CardTemas({ tema }: CardTemasProps) {
    return (
        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between bg-stone-300 bg-opacity-20'>
            <header className='py-1 px-6 bg-stone-600 bg-opacity-70 justify-center  text-white font-bold text-2xl items-center'>
                Tema
            </header>
            <p className='p-8 text-3xl h-full'>{tema.descricao}</p>

            <div className="flex">
                <Link to={`/editartema/${tema.id}`}
                    className='text-slate-100
                    hover:bg-stone-500 hover:bg-opacity-80 
                    bg-sky-900 ease-in duration-300  
                        flex items-center justify-center py-2 rounded-lg w-2/4'>
                    <button>Editar</button>
                </Link>

                <Link to={`/deletartema/${tema.id}`}
                    className='text-slate-100 hover:bg-stone-500
                    bg-yellow-900 
		            flex items-center justify-center ease-in duration-300 rounded-lg w-2/4'>
                    <button>Deletar</button>
                </Link>
            </div>

        </div>
    )
}

export default CardTemas