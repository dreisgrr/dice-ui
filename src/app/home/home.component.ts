import { Component, OnInit } from '@angular/core';
import { DiceServiceService } from '../shared/dice-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  simulationDistribution: simulationDistribution[] = [];
  diceForm: FormGroup;
  submitted = false;

  model: diceSimulationInput = {
    numberOfDice: null,
    sidesOfDie: null,
    numberOfRolls: null,
  };

  constructor(
    private diceService: DiceServiceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.diceForm = this.formBuilder.group({
      sides: ['', [Validators.required, Validators.min(4)]],
      quantity: [
        '',
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      rollCount: ['', [Validators.required, Validators.min(1)]],
    });
  }

  get f() {
    return this.diceForm.controls;
  }

  runSimulation(): void {
    this.submitted = true;
    if (this.diceForm.invalid) {
      return;
    }
    this.diceService.runSimulation(this.model).subscribe(
      (res) => {
        this.simulationDistribution = res;
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.diceForm.reset();
  }
}

export interface diceSimulationInput {
  numberOfDice: any;
  sidesOfDie: any;
  numberOfRolls: any;
}

export interface simulationDistribution {
  id: number;
  diceSimulationId: number;
  totalDiceValues: number;
  frequency: number;
}
