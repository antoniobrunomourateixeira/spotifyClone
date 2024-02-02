import {IUsuario} from '../interface/IUsuario'
import {IPlaylist} from '../interface/IPlaylist'
import { IArtistas } from '../interface/IArtistas'

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

 export function SpotifyParaArtistas(playlist: SpotifyApi.ArtistObjectFull): IArtistas {
    return {
        id: playlist.id,
        nome: playlist.name,
        imagemUrl: playlist.images?.sort((a, b) => a.width -b.width).pop()?.url
    }
 }