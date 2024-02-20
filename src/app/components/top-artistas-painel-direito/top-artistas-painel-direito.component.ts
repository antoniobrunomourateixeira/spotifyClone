import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { IArtistas } from 'src/app/interface/IArtistas';

@Component({
  selector: 'app-top-artistas-painel-direito',
  templateUrl: './top-artistas-painel-direito.component.html',
  styleUrls: ['./top-artistas-painel-direito.component.scss']
})
export class TopArtistasPainelDireitoComponent implements OnInit {
  artistas: IArtistas[] = [];

  constructor(
    private service: SpotifyService
  ) { }

  ngOnInit(): void {
    this.buscarTopArtistas();
  }

  async buscarTopArtistas() {
    this.artistas = await this.service.buscarTopArtistas(5);
    console.log("top 5", this.artistas)
  }

}
