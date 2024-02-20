import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscas-recentes',
  templateUrl: './buscas-recentes.component.html',
  styleUrls: ['./buscas-recentes.component.scss']
})
export class BuscasRecentesComponent implements OnInit {
  pesquisasRecentes = [
    'Top Brasil', 'Top Globral', 'Esquenta Sertanejo', 'Rock', 'Forro'
  ];
  campoPesquisa = "";

  constructor() { }

  ngOnInit(): void {
  }

  definirPesquisa(pesquisa: string) {
    this.campoPesquisa = pesquisa;
  }

  pesquisar() {
    this.pesquisasRecentes.push(this.campoPesquisa);
  }

}
