import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import './Cadastro.css'
import Usuario from '../../models/Usuario'
import { cadastrarUsuario } from '../../services/Service';
import { useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { CloudArrowUp, Eye, EyeSlash } from '@phosphor-icons/react';

function Cadastro() {

  // Redirecionar para tela de login.
  const navigate = useNavigate();

  // Checa se a requisição foi concluida ou não.
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Verifica se a senha foi cadastrada de forma correta.
  const [confirmaSenha, setConfirmaSenha] = useState<string>('');

  const [isShowPassword, setIsShowPassword] = useState(false);

  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const handlePassword = () => setIsShowPassword(!isShowPassword); 

  const handleConfirmPassword = () => setIsShowConfirmPassword(!isShowConfirmPassword); 

  // Estado responsável pelos dados do Usuário que será cadastrado
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  });
  
  // Direciona para página de login.
  useEffect(() => {
    if (usuario.id !== 0){
      retornar();
    }
  }, [usuario]);

  function retornar(){
    navigate('/login')
  }

  // Atualiza o estado dos inputs.
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  // Não guardaa no banco de dados recurso apenas do front, foi criado apenas para ele.
  function handleConfirmaSenha(e: ChangeEvent<HTMLInputElement>){
    setConfirmaSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>){
    e.preventDefault(); // não recarrega a página.

    // checa se a senha foi digitada com a quantidade de caracteries. 
    if(confirmaSenha === usuario.senha && usuario.senha.length >= 8){

      // animação no botão.
      setIsLoading(true)

      // Cadastra o usuário e a API devolve o id do usuário.
      try{

        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
        ToastAlerta('Usuário cadastrado com sucesso!', "sucesso");

      }catch(error){
        ToastAlerta('Erro ao cadastrar o usuário!', "erro")
      }

    }else{
      ToastAlerta("Dados estão inconsistentes! Verifique os dados do usuário.", "info");
      setUsuario({...usuario, senha: ''}); // zera a senha para digitar novamente 
      setConfirmaSenha(''); 
    }

    // Libera o botão novamente. 
    setIsLoading(false)
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen 
            place-items-center font-bold">
        <div className="fundoCadastro hidden lg:block"></div>
        <form className='flex justify-center items-center flex-col w-2/3 gap-3' 
              onSubmit={cadastrarNovoUsuario}
        >
          <h2 className='text-yellow-900 text-4xl'>Cadastrar</h2>
          
          <div className="flex flex-col w-full">
            <label htmlFor="nome"></label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="w-full relative flex gap-2 items-center border-2 border-yellow-900 p-1 rounded-lg"
              value={usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          
          <div className="flex flex-col w-full">
            <label htmlFor="usuario"></label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="E-mail"
              className="w-full relative flex gap-2 items-center border-2 border-yellow-900 p-1 rounded-lg"
              value={usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
            
            <label className='
            w-full
            relative 
            flex 
            gap-2 
            items-center 
            border-2
            border-yellow-900 
            p-1 
            rounded-lg
            text-slate-400
            cursor-pointer 
            justify-between' 
            htmlFor="foto">
             Anexar foto
            <CloudArrowUp size={24}color="#999999"/>
            </label>
            <input    
              type="file"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="arquivo"
              value={usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />

{usuario.foto !== '' &&
              'Foto anexada'}

            <label className='w-full relative flex gap-2 items-center border-2 border-yellow-900 p-1 rounded-lg' htmlFor="senha">
            <input
              type={isShowPassword ? "text" : "password"}
              id="senha"
              name="senha"
              placeholder="Senha"
              className="bg-transparent outline-none rounded-none"
              value={usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
            <button onClick={handlePassword} type='button' className='ml-48'>
            {isShowPassword ? <Eye size={24} color="#999999" />
            : <EyeSlash size={24}color="#999999" />}    
            </button>
            </label>
            
            <label className='w-full relative flex gap-2 items-center border-2 border-yellow-900 p-1 rounded-lg' htmlFor="confirmarSenha">
            <input
              type={isShowConfirmPassword ? "text" : "password"}
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="bg-transparent outline-none rounded-none"
              value={confirmaSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmaSenha(e)}
            />
            <button onClick={handleConfirmPassword} type='button' className='ml-48'>
            {isShowConfirmPassword ? <Eye size={24} color="#999999" />
            : <EyeSlash size={24}color="#999999" />}    
            </button>
            </label>

          <div className="flex justify-around w-full gap-8">
            <button className='rounded-full text-white bg-red-300 
                  hover:bg-red-700 w-1/2 py-2' 
                  onClick={retornar}
                  >
              Cancelar
            </button>
            <button 
                className='rounded-full text-white bg-stone-500 
                hover:bg-yellow-900 w-1/2 py-2
                flex justify-center'>

                  {isLoading ? 
                  <RotatingLines
                  strokeColor='white'
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="24"
                  visible={true}
                  />
                  :
                  <span>Cadastrar</span>
                  } 
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Cadastro