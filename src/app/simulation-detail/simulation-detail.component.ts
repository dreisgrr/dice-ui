import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { diceSimulationModel } from '../simulations/model/diceSimulationModel';
import { DiceServiceService } from '../shared/dice-service.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-simulation-detail',
  templateUrl: './simulation-detail.component.html',
  styleUrls: ['./simulation-detail.component.css'],
})
export class SimulationDetailComponent implements OnInit {
  diceSimulation: diceSimulationModel;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private diceService: DiceServiceService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params: Params) =>
          this.diceService.getSimulationById(+params['id'])
        )
      )

      .subscribe(
        (res) => {
          this.diceSimulation = res;
          console.log(this.diceSimulation);
        },
        (err) => {}
      );
  }
}
