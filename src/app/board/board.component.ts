import { Component, OnInit } from '@angular/core';

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval: number | null = null;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})



export class BoardComponent implements OnInit {
  squares: string[];
  xIsNext: boolean;
  winner: string;

  constructor() {}

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }

  shuffleLetters(event: MouseEvent) {
    let iteration = 0;
  
    clearInterval(interval);
  
    interval = window.setInterval(() => {
      const heading = event.target as HTMLHeadingElement;
      heading.innerText = heading.innerText
        .split("")
        .map((letter, index) => {
          if(index < iteration) {
            return heading.dataset.value![index];
          }
        
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");
      
      if(iteration >= heading.dataset.value!.length) { 
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 30);
  }
}