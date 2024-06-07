import Popup from 'reactjs-popup';
import FormPostagem from '../formpostagem/FormPostagem';
import 'reactjs-popup/dist/index.css';
import './ModalPostagem.css'


function ModalPostagem() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='rounded-full px-4 py-2 text-white hover:bg-stone-500 bg-yellow-900 hover:text-white ease-in duration-300 hover:bg-opacity-80'>
                        Nova Postagem
                    </button>
                }
                modal
            >
                <FormPostagem />
            </Popup>
        </>
    );
}

export default ModalPostagem;