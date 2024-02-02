import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private service: SpotifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.verificarTokenUrlCallback();
  }

  verificarTokenUrlCallback() {
    let token = this.service.obterTokenUrlCallback();
    if(!!token) {
      this.service.definirAccessToken(token);
      this.router.navigate(['/player/home'])
    }
  }

  abrirPaginaLogin() {
    let url = this.service.obterUrlLogin();
    window.location.href = url;
  }

}
