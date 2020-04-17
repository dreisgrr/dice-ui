import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  model: DiceSimulation = {
    numberOfDice: 0,
    sidesOfDie: 0,
    numberOfRolls: 0,
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  sendSimulation(): void {
    let url = 'http://localhost:8080/diceapi/simulation';
    this.http.post(url, this.model).subscribe(
      (res) => {
        location.reload();
      },
      (err) => {
        alert(err);
      }
    );
  }
}

export interface DiceSimulation {
  numberOfDice: number;
  sidesOfDie: number;
  numberOfRolls: number;
}
