import {IUsuario} from '../interface/IUsuario'
import {IPlaylist} from '../interface/IPlaylist'
import { IArtistas } from '../interface/IArtistas'
import { IMusicas } from '../interface/IMusicas'
import { newMusica, newPlaylist } from './factories'
// import { addMilliseconds, format } from "date-fns"

export function SpotifyUserParaUsuario(user: SpotifyApi.CurrentUsersProfileResponse): IUsuario {
    return {
        id: user.id,
        nome: user.display_name,
        imagemUrl: user.images?.pop()?.url
    }
 }

 export function SpotifyPlaylistParaPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist {
    return {
        id: playlist.id,
        nome: playlist.name,
        imagemUrl: playlist.images?.pop()?.url
    }
 }

 export function SpotifySinglePlaylistParaPlaylist(playlist: SpotifyApi.SinglePlaylistResponse): IPlaylist {
    if(!playlist)
        return newPlaylist();

    return {
        id: playlist.id,
        nome: playlist.name,
        imagemUrl: playlist.images.shift().url,
        musicas: []
    }
 }

 export function SpotifyParaArtistas(playlist: SpotifyApi.ArtistObjectFull): IArtistas {
    return {
        id: playlist.id,
        nome: playlist.name,
        imagemUrl: playlist.images?.sort((a, b) => a.width -b.width).pop()?.url
    }
 }

 export function SpotifyTrackParaMusica(spotifyTrack: SpotifyApi.TrackObjectFull): IMusicas {
    
    if(!spotifyTrack)
        return newMusica();

    const msParaMinutos = (ms: number) => {
        const segundosTotais = Math.floor(ms / 1000);
        const minutos = Math.floor(segundosTotais / 60);
        const segundos = segundosTotais % 60;

        return `${minutos}:${segundos.toString().padStart(2, '0')}`;
    }
    
    return {
        id: spotifyTrack.uri,
        titulo: spotifyTrack.name,
        album: {
            id: spotifyTrack.album.id,
            imagem: spotifyTrack.album.images.shift().url,
            nome: spotifyTrack.album.name
        },
        artistas: spotifyTrack.artists.map(artista => ({
            id: artista.id,
            nome: artista.name
        })),
        tempo: msParaMinutos(spotifyTrack.duration_ms)
    }
 }