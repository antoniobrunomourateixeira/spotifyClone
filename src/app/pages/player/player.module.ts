import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { HomeComponent } from '../home/home.component';
import { RouterModule } from '@angular/router';
import { PlayerRouts } from './player.routes';
import { PainelEsquerdoComponent } from '../../components/painel-esquerdo/painel-esquerdo.component';
import { PainelDireitoComponent } from '../../components/painel-direito/painel-direito.component';
import { BotaoMenuComponent } from '../../components/botao-menu/botao-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RodapeUsuarioComponent } from '../../components/rodape-usuario/rodape-usuario.component';
import { TopArtistasComponent } from '../../components/top-artistas/top-artistas.component';
import { BuscasRecentesComponent } from '../../components/buscas-recentes/buscas-recentes.component';
import { TopArtistasPainelDireitoComponent } from '../../components/top-artistas-painel-direito/top-artistas-painel-direito.component';
import { ArtistaItemImagemComponent } from '../../components/artista-item-imagem/artista-item-imagem.component';
import { PlayerCardComponent } from '../../components/player-card/player-card.component';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    PlayerComponent, 
    PainelEsquerdoComponent, 
    BotaoMenuComponent,
    RodapeUsuarioComponent,
    HomeComponent,
    TopArtistasComponent,
    PainelDireitoComponent,
    BuscasRecentesComponent,
    TopArtistasPainelDireitoComponent,
    ArtistaItemImagemComponent,
    PlayerCardComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forChild(PlayerRouts)
  ],
  
})

export class PlayerModule { }
