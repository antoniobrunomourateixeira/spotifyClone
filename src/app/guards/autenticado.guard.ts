import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from '../services/spotify.service';

@Injectable({
  providedIn: 'root',
})

export class AutenticadoGuard implements CanLoad {
  constructor(private router: Router, private spotifyService: SpotifyService) {

  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = localStorage.getItem("token");

    if (!token) {
      return this.naoAutenticado();
    }

    return new Promise(async (res) => {
      let usuarioCriado = await this.spotifyService.obterInformacoesUsuario();
      if(usuarioCriado) {
        return res(true);

      } else {
        return res(this.naoAutenticado());

      }

    });
  }
  
  naoAutenticado() {
    localStorage.clear();
    this.router.navigate(['/login']);
    return false;
  }

}