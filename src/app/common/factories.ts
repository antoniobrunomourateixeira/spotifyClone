import { IArtistas } from "../interface/IArtistas";

export function newArtista(): IArtistas {
    return {
        id: '',
        nome: '',
        imagemUrl: ''
    }
}