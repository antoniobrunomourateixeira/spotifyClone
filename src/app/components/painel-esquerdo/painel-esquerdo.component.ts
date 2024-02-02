import { Component, OnInit } from '@angular/core';
import { faHome, faSearch, faGuitar, faMusic } from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from 'src/app/interface/IPlaylist';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrls: ['./painel-esquerdo.component.scss']
})
export class PainelEsquerdoComponent implements OnInit {
  homeIcone = faHome;
  pesquisarIcone = faSearch;
  artistaIcone = faGuitar;
  playListIcone = faMusic;
  menuSelecionado = 'Home';

  playlists: IPlaylist[] = [];

  constructor(
    private service: SpotifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buscarPlaylist();
  }

  btnClick(botao: string) {
    this.menuSelecionado = botao;
    this.router.navigateByUrl('player/home');
  }

  async buscarPlaylist() {
    this.playlists = await this.service.buscarPlaylistUsuario();
    // this.playlists = this.playlists.filter(x => x.nome != '');
  }

}
