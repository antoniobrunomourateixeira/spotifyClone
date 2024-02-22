import { Component, OnInit, OnDestroy } from '@angular/core';
import { IMusicas } from 'src/app/interface/IMusicas';
import { newMusica } from 'src/app/Common/factories';
import { PlayerService } from 'src/app/services/player.service';
import { faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {
  public musica: IMusicas = newMusica();
  subs: Subscription[] = [];
  anteriorIcone = faStepBackward;
  proximoIcone = faStepForward;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.obterMusicaTocando();
  }

  ngOnDestroy() {
    this.subs.forEach( sub => {
      sub.unsubscribe();
    })
  }


  obterMusicaTocando() {
    let sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musica = musica;
    });

    this.subs.push(sub);
  }

  voltarMusica() {
    this.playerService.voltarMusica();
  }

  proximaMusica() { 
    this.playerService.proximaMusica();
  }
}
