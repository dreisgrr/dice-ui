import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { distributionStatsByCombination } from './model/distributionStatsByCombination';
import { simulationStatsByCombination } from './model/simulationStatsByCombination';
import { DiceServiceService } from '../shared/dice-service.service';

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

  constructor(private diceService: DiceServiceService) {}
  simulationStatsByCombination: simulationStatsByCombination[] = [];
  distributionStatsByCombination: distributionStatsByCombination[] = [];

  ngOnInit() {}

  getSimulationStatsByCombination(): void {
    this.diceService.getSimulationStatsByCombination(this.model).subscribe(
      (res) => {
        this.simulationStatsByCombination = res;
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }

  getCombinedDistributionStatsByCombination(): void {
    this.diceService
      .getCombinedDistributionStatsByCombination(this.model)
      .subscribe(
        (res) => {
          this.distributionStatsByCombination = res;
        },
        (err) => {
          console.log(err.error.message);
        }
      );
  }
}
export interface diceConfiguration {
  numberOfDice: number;
  sidesOfDie: number;
}
