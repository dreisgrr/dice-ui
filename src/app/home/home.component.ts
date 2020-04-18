import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  model: diceSimulation = {
    numberOfDice: 0,
    sidesOfDie: 0,
    numberOfRolls: 0,
  };

  constructor(private http: HttpClient) {}
  simulationDistribution: simulationDistribution[] = [];

  ngOnInit() {}

  sendSimulation(): void {
    let url = 'http://localhost:8080/diceapi/simulation';
    this.http.post<simulationDistribution[]>(url, this.model).subscribe(
      (res) => {
        this.simulationDistribution = res;
      },
      (err) => {
        alert(err);
      }
    );
  }
}

export interface diceSimulation {
  numberOfDice: number;
  sidesOfDie: number;
  numberOfRolls: number;
}

export interface simulationDistribution {
  id: number;
  diceSimulationId: number;
  totalDiceValues: number;
  frequency: number;
}
