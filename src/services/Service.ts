import axios from "axios";

// Axios irá acessar esse endereço da API.
const api = axios.create({
    baseURL: "https://blogpessoal-raie.onrender.com",
});

// Função assincrona que irá cadastrar o usuário.
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
}

export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
}