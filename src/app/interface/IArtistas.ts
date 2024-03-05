import { IMusicas } from './IMusicas';

export interface IArtistas {
    id: string;
    nome: string;
    imagemUrl: string;
    musicas?: IMusicas[];
}