export interface IMusicas {
    id: string,
    titulo: string,
    artistas: {
        id: string,
        nome: string
    }[],
    album: {
        id: string,
        nome: string,
        imagem: string
    },
    tempo: string
}