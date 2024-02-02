import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { IArtistas } from 'src/app/interface/IArtistas';
import { newArtista } from 'src/app/common/factories'

@Component({
  selector: 'app-top-artistas',
  templateUrl: './top-artistas.component.html',
  styleUrls: ['./top-artistas.component.scss']
})
export class TopArtistasComponent implements OnInit {

  topArtista: IArtistas = newArtista();

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
    this.buscarArtista();
  }

  async buscarArtista() {
    const artistas = await this.spotifyService.buscarTopArtistas(1);

    if(!!artistas)
      this.topArtista = artistas.pop();

    console.log(this.topArtista);
  }

}
