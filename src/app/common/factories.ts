import { IArtistas } from "../interface/IArtistas";
import { IMusicas } from '../interface/IMusicas';

export function newArtista(): IArtistas {
    return {
        id: '',
        nome: '',
        imagemUrl: ''
    }
}

export function newMusica(): IMusicas {
    return {
        id: "",
        album: {
            id: '',
            nome: '',
            imagem: ''
        },
        artistas: [],
        tempo: '',
        titulo: ''
    };
}