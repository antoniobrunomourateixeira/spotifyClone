import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { IMusicas } from 'src/app/interface/IMusicas';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  musicas: IMusicas[] = [];
  playIcone = faPlay;

  constructor(
    private service: SpotifyService
  ) { }

  ngOnInit(): void {
    this.obterMusicas();
  }

  async obterMusicas() {
    this.musicas = await this.service.buscarMusicas();
    console.log(this.musicas);
  }

  obterArtistas(musica: IMusicas) {
    return musica.artistas.map(x => x.nome).join(', ');
  }

  async executarMusica(musica: IMusicas) {
    await this.service.playMusic(musica.id);
  }

}
