import { state } from '@angular/animations';
import { Autenticacao } from './../autenticacao.service';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('publicacoes', {static: false}) public publicacoes: any 

  constructor(private autenticacao: Autenticacao) { }

  ngOnInit() {
  }

  public sair(): void {
    this.autenticacao.sair()
  }

  public atualizarTimeLine(): void {
    this.publicacoes.atualizarTimeLine()
  }

}
