import { Component, OnInit } from '@angular/core';
import { DiceServiceService } from '../shared/dice-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  model: diceSimulationInput = {
    numberOfDice: 0,
    sidesOfDie: 0,
    numberOfRolls: 0,
  };

  constructor(private diceService: DiceServiceService) {}
  simulationDistribution: simulationDistribution[] = [];

  ngOnInit() {}

  runSimulation(): void {
    this.diceService.runSimulation(this.model).subscribe(
      (res) => {
        this.simulationDistribution = res;
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }
}

export interface diceSimulationInput {
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
