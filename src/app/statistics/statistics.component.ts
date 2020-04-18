import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { distributionStatsByCombination } from './model/distributionStatsByCombination';
import { simulationStatsByCombination } from './model/simulationStatsByCombination';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  model: diceConfiguration = {
    numberOfDice: 0,
    sidesOfDie: 0,
  };

  constructor(private http: HttpClient) {}
  simulationStatsByCombination: simulationStatsByCombination[] = [];
  distributionStatsByCombination: distributionStatsByCombination[] = [];

  ngOnInit() {}

  getSimulationStatsByCombination(): void {
    let url = 'http://localhost:8080/diceapi/simulation/statistics/total';
    this.http.post<simulationStatsByCombination[]>(url, this.model).subscribe(
      (res) => {
        this.simulationStatsByCombination = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getCombinedDistributionStatsByCombination(): void {
    let url =
      'http://localhost:8080/diceapi/simulation/statistics/distribution';
    this.http.post<distributionStatsByCombination[]>(url, this.model).subscribe(
      (res) => {
        this.distributionStatsByCombination = res;
      },
      (err) => {
        alert('err');
      }
    );
  }
}
export interface diceConfiguration {
  numberOfDice: number;
  sidesOfDie: number;
}
