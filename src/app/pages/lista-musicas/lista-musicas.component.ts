import { Component, OnInit, OnDestroy } from '@angular/core';
import { IMusicas } from 'src/app/interface/IMusicas';
import { newMusica } from 'src/app/Common/factories';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpotifyService } from 'src/app/services/spotify.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-lista-musicas',
  templateUrl: './lista-musicas.component.html',
  styleUrls: ['./lista-musicas.component.scss']
})
export class ListaMusicasComponent implements OnInit, OnDestroy {
  musicas: IMusicas[] = [];
  musicaAtual: IMusicas = newMusica();
  playIcone = faPlay;
  bannerImagemUrl = '';
  bannerText = '';
  subs: Subscription[] = [];
  title = '';

  constructor(
    private activedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    })
  }

  obterMusicas() {
    let sub = this.activedRoute.paramMap.subscribe(async params => {
      let tipo = params.get('tipo');
      let id = params.get('id');

      await this.obterDadosPagina(tipo, id);
    });

    this.subs.push(sub);
  }

  async obterDadosPagina(tipo: string, id: string) {
    if(tipo === "playlist") {
      await this.obterDadosPlaylist(id);
    } else {
      await this.obterDadosArtista(id);
    }
  }

  async obterDadosPlaylist(playlistId: string) {
    let playlistMusicas = await this.spotifyService.buscarMusicasPlaylist(playlistId);
    this.definirDadosPagina(playlistMusicas.nome, playlistMusicas.imagemUrl, playlistMusicas.musicas);
    this.title = `Musicas Playlist: ${playlistMusicas.nome}`;
  }

  async obterDadosArtista(artistaId: string) {

  }

  obterMusicaAtual() {
    let sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica;
      // console.log("musica atualll => ", this.musicaAtual);
    });
    this.subs.push(sub);
  }

  definirDadosPagina(bannerTexto: string, bannerImage: string, musicas: IMusicas[]) {
    this.bannerImagemUrl = bannerImage;
    this.bannerText = bannerTexto;
    this.musicas = musicas;
  }

  async executarMusica(musica: IMusicas) {
    await this.spotifyService.playMusic(musica.id);
    this.playerService.definirMusicaAtual(musica);
    this.obterMusicaAtual();
  }

  obterArtistas(musica: IMusicas) {
    return musica.artistas.map(x => x.nome).join(', ');
  }

}
