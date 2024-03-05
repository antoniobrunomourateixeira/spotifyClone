import { IArtistas } from "../interface/IArtistas";
import { IMusicas } from '../interface/IMusicas';
import { IPlaylist } from '../interface/IPlaylist';

export function newArtista(): IArtistas {
    return {
        id: '',
        nome: '',
        imagemUrl: '',
        musicas: []
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

export function newPlaylist(): IPlaylist {
    return {
        id: '',
        imagemUrl: '',
        nome: '',
        musicas: []
    }
}