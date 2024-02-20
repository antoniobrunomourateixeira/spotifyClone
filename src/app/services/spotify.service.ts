import { Injectable } from '@angular/core';
import { SpotfiyConfiguration } from '../../environments/environment.prod';
import { IUsuario } from '../interface/IUsuario';
import { SpotifyUserParaUsuario, SpotifyPlaylistParaPlaylist, SpotifyParaArtistas, SpotifyTrackParaMusica } from '../Common/spotifyHelper'
import Spotify from 'spotify-web-api-js';
import { IPlaylist } from '../interface/IPlaylist';
import { Router } from '@angular/router';
import { IArtistas } from '../interface/IArtistas';
import { IMusicas } from '../interface/IMusicas';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  spotifyApi: Spotify.SpotifyWebApiJs = null;
  usuario: IUsuario;

  constructor(private router: Router) {
    this.spotifyApi = new Spotify();
  }

  async obterInformacoesUsuario() {
    if(!!this.usuario)
      return true;

    let token = localStorage.getItem("token");
    if(!token)
      return false;

      try {
        
        this.definirAccessToken(token);
        await this.obterSpotifyUsuario();
        return !!this.usuario;

      } catch (ex) {
        return false;
      }
  }

  async obterSpotifyUsuario() {
    let userInfo = await this.spotifyApi.getMe();
    this.usuario = SpotifyUserParaUsuario(userInfo);
    return userInfo;
  }

  obterUrlLogin() {
    let authEndpoint = `${SpotfiyConfiguration.authEndpoint}?`;
    let clientId = `client_id=${SpotfiyConfiguration.clientId}&`;
    let redirectUrl = `redirect_uri=${SpotfiyConfiguration.redirectUrl}&`;
    let scopes = `scope=${SpotfiyConfiguration.scopes.join('%20')}&`;
    let responseType = `response_type=token&show_dialog=true`;

    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  obterTokenUrlCallback() {
    if (!window.location.hash) {
      return '';
    }

    let params = window.location.hash.substring(1).split('&');
    return params[0].split("=")[1];
  }

  definirAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
    // this.spotifyApi.skipToNext();
  }

  async buscarPlaylistUsuario(offset = 0, limit = 50): Promise<IPlaylist[]> {
    let playlists = await this.spotifyApi.getUserPlaylists(this.usuario.id, {offset, limit});
    return playlists.items.map(SpotifyPlaylistParaPlaylist).filter(x => x.nome != '');
  }

  async buscarTopArtistas(limit = 10): Promise<IArtistas[]> {
    let artistas = await this.spotifyApi.getMyTopArtists({limit});
    return artistas.items.map(SpotifyParaArtistas);
  }

  async buscarMusicas(offset = 0, limit = 50): Promise<IMusicas[]> {
    let musicas = await this.spotifyApi.getMySavedTracks({ offset, limit });
    return musicas.items.map(x => SpotifyTrackParaMusica(x.track));
  }

  async playMusic(musicaId: string) {
    await this.spotifyApi.queue(musicaId);
    await this.spotifyApi.skipToNext();
  }

  async obterMusicaAtual(): Promise<IMusicas> {
    let musica = await this.spotifyApi.getMyCurrentPlayingTrack();
    return SpotifyTrackParaMusica(musica.item);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
