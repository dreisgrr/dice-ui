import { Component, OnInit } from '@angular/core';
import { distributionStatsByCombination } from './model/distributionStatsByCombination';
import { simulationStatsByCombination } from './model/simulationStatsByCombination';
import { DiceServiceService } from '../shared/dice-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  diceForm: FormGroup;
  submitted = false;
  model: diceConfiguration = {
    numberOfDice: null,
    sidesOfDie: null,
  };

  constructor(
    private diceService: DiceServiceService,
    private formBuilder: FormBuilder
  ) {}
  simulationStatsByCombination: simulationStatsByCombination;
  distributionStatsByCombination: distributionStatsByCombination;

  ngOnInit() {
    this.diceForm = this.formBuilder.group({
      sides: ['', [Validators.required, Validators.min(4)]],
      quantity: [
        '',
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
    });
  }

  get f() {
    return this.diceForm.controls;
  }

  getSimulationStatsByCombination(): void {
    this.submitted = true;
    if (this.diceForm.invalid) {
      return;
    }
    this.reset();
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
    this.submitted = true;
    if (this.diceForm.invalid) {
      return;
    }
    this.reset();
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

  onReset() {
    this.submitted = false;
    this.diceForm.reset();
  }
  reset(): void {
    this.simulationStatsByCombination = null;
    this.distributionStatsByCombination = null;
  }
}
export interface diceConfiguration {
  numberOfDice: any;
  sidesOfDie: any;
}
