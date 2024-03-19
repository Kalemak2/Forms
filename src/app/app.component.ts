import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TEB drużyny';
  lines = ['Minecraft', 'Fortnite', 'Counter-Strike 2'];
  limit = 5;

  games: any[] = [];
  
  firstName = '';
  lastName = '';
  username = '';
  groups = '';
 

  
  addUser() {
    if (this.firstName.length <= 0 || this.lastName.length <= 0 || this.username.length <= 0 || this.groups.length <= 0) {
      alert("Proszę podać wszystkie informacje o użytkowniku");
      return;
    }

    const existingGameIndex = this.games.findIndex(g => g.gameName === this.groups);
    if (existingGameIndex !== -1) {
      const newId = this.games[existingGameIndex].players.length + 1;
      if (newId > this.limit) {
        alert("Osiągnięto maksymalny limit graczy!");
        return;
      }

      this.games[existingGameIndex].players.push({
        id: this.games[existingGameIndex].players.length + 1,
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username
      });
    } else {
      this.games.push({
        gameName: this.groups,
        players: [{
          id: 1,
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username
        }]
      });
    }

    alert("Dodano gracza do " + this.groups)
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.groups = ''; 
  }
  
  removePerson(userId: Number, gameName: String): void {
    const gameIndex = this.games.findIndex(game => game.gameName === gameName);
    if (gameIndex !== -1) {
      const playerIndex = this.games[gameIndex].players.findIndex((player: { id: Number; }) => player.id === userId);
      if (playerIndex !== -1) {
        this.games[gameIndex].players.splice(playerIndex, 1);
  
        for (let i = playerIndex; i < this.games[gameIndex].players.length; i++) {
          this.games[gameIndex].players[i].id--;
        }
      }
    }
  }
  
  editPerson(userId: number, gameName: String): void {
    let newName = prompt("Podaj nowe imie") || "";
    let newSurname = prompt("Podaj nowe nazwisko") || "";
    let newUsername = prompt("Podaj nowy nick") || "";
  
    this.games.map(game => {
      if (game.gameName === gameName) {
        const playerIndex = game.players.findIndex((player: { id: number; }) => player.id === userId);
        if (playerIndex !== -1) {
          game.players[playerIndex] = {
            id: userId,
            firstName: newName,
            lastName: newSurname,
            username: newUsername
          };
        }
      }
    });
  }}