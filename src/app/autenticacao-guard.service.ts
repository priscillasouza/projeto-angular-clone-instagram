
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Autenticacao } from './autenticacao.service';

@Injectable()
export class AutenticacaoGuard implements CanActivate {

    constructor(private autenticacao: Autenticacao) {}

    canActivate(): boolean {
        //aqui entra a lógica que vai dizer se a rota pode ou não ser liberada
        return this.autenticacao.autenticado()
    }
}