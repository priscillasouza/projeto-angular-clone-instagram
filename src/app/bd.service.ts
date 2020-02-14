
import { Injectable } from '@angular/core';

import { Progresso } from './progresso.service';

import * as firebase from 'firebase';
import { reject } from 'q';

@Injectable()
export class Bd {

    constructor(private progresso: Progresso) { }

    public publicar(publicacao: any): void {

        console.log(publicacao)

        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({ titulo: publicacao.titulo })
            .then((resposta: any) => {

                let nomeImagem = resposta.key

                //enviando os arquivos para o firebase
                firebase.storage().ref()
                    .child(`imagens/${nomeImagem}`)
                    .put(publicacao.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                        //acompanhamento do progresso do upload
                        //o snapshot funciona como um observable que vai capturando os eventos de atualização de estado

                        (snapshot: any) => {
                            this.progresso.status = 'andamento'
                            this.progresso.estado = snapshot
                            console.log('Snapshot capturado no on()', snapshot)
                        },
                        (error) => {
                            this.progresso.status = 'erro'
                            console.log(error)
                        },
                        () => {
                            this.progresso.status = 'concluido'
                            console.log('upload completo')

                        }
                    )

            })
    }

    public consultaPublicacoes(emailUsuario: string): Promise<any> {

        //criando uma promisse
        return new Promise((resolve, reject) => {

            //consultando as publicações no database
            firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
                .orderByKey()
                .once('value')
                .then((snapshot: any) => {
                    //console.log(snapshot.val())
                    //o metodo val retorna os valores dos docs dentro do path do firebase 

                    let publicacoes: Array<any> = [];

                    //percorre cada elemento do snapshot recuperando seus respectivos dados
                    snapshot.forEach((childSnapshot: any) => {

                        let publicacao = childSnapshot.val()
                        publicacao.key = childSnapshot.key

                        publicacoes.push(publicacao)

                    })

                    //console.log(publicacoes)
                    //resolve(publicacoes)

                    return publicacoes.reverse()
                })
                .then((publicacoes: any) => {

                    publicacoes.forEach((publicacao) => {
                        //consultando a url da imagem no storage
                        firebase.storage().ref()
                            .child(`imagens/${publicacao.key}`)
                            .getDownloadURL()
                            .then((url: string) => {

                                publicacao.url_imagem = url

                                //consultando o nome do usuário
                                firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                                    .once('value')
                                    .then((snapshot: any) => {

                                        publicacao.nome_usuario = snapshot.val().nome_usuario

                                       
                                    })

                            })
                    })

                    resolve(publicacoes)

                })

        })
    }
}

