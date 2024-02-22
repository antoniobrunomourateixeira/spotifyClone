import { Injectable } from '@angular/core';
import { IMusicas } from '../interface/IMusicas';
import { BehaviorSubject, timer } from 'rxjs';
// import { newMusica } from '../common/factories';
import { SpotifyService } from './spotify.service';
import { newMusica } from '../Common/factories';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  musicaAtual = new BehaviorSubject<IMusicas>(newMusica());
  timerId: any = null;

  constructor(private spotifyService: SpotifyService) {
    this.obterMusicaAtual();
  }

  async obterMusicaAtual() {
    clearTimeout(this.timerId);
    let music = await this.spotifyService.obterMusicaAtual();
    this.definirMusicaAtual(music);

    this.timerId = setInterval(async () => {
      await this.obterMusicaAtual();
    }, 3000)
  }

  definirMusicaAtual(musica: IMusicas) {
    this.musicaAtual.next(musica);
  }

  public async voltarMusica() {
    await this.spotifyService.voltar();
  }

  public async proximaMusica() {
    await this.spotifyService.proxima();
  }
}
