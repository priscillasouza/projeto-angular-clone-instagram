import { Component, OnInit } from '@angular/core';
//através desse alias temos acesso a todos os recursos do sdk do firebase
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app3';

  ngOnInit(): void {

    var firebaseConfig = {
      apiKey: "AIzaSyDSNXs44ZAkxWI54ZmE4Rj0WzujoOOXR9E",
      authDomain: "projeto-instagram-clone-7c55b.firebaseapp.com",
      databaseURL: "https://projeto-instagram-clone-7c55b.firebaseio.com",
      projectId: "projeto-instagram-clone-7c55b",
      storageBucket: "projeto-instagram-clone-7c55b.appspot.com",
      messagingSenderId: "209922332089",
      appId: "1:209922332089:web:fea141599b2e5284"
    };

    //passar por parametro as configurações de conexão que foi criado no serviço do firebase
    firebase.initializeApp(firebaseConfig)
  }
}
