import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { PlayerService } from 'src/app/services/player.service';
import { IMusicas } from 'src/app/interface/IMusicas';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
// import { newMusica } from 'src/app/common/factories';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/Common/factories';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  musicas: IMusicas[] = [];
  musicaAtual: IMusicas = newMusica();
  subs: Subscription[] = [];
  playIcone = faPlay;

  constructor(
    private service: SpotifyService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    })
  }

  async obterMusicas() {
    this.musicas = await this.service.buscarMusicas();
  }

  obterArtistas(musica: IMusicas) {
    return musica.artistas.map(x => x.nome).join(', ');
  }

  async executarMusica(musica: IMusicas) {
    await this.service.playMusic(musica.id);
    this.playerService.definirMusicaAtual(musica);
  }

  obterMusicaAtual() {
    let sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica;
      // console.log("musica atualll => ", this.musicaAtual);
    });
    this.subs.push(sub);
  }

}
