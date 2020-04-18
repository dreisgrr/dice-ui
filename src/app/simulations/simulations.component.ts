import { Component, OnInit } from '@angular/core';
import { diceSimulationModel } from './model/diceSimulationModel';
import { DiceServiceService } from '../shared/dice-service.service';

@Component({
  selector: 'app-simulations',
  templateUrl: './simulations.component.html',
  styleUrls: ['./simulations.component.css'],
})
export class SimulationsComponent implements OnInit {
  diceSimulation: diceSimulationModel[] = [];

  constructor(private diceService: DiceServiceService) {}

  ngOnInit() {
    this.getAllSimulations();
  }

  getAllSimulations(): void {
    this.diceService.getAllSimulations().subscribe(
      (res) => {
        this.diceSimulation = res;
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }
}
