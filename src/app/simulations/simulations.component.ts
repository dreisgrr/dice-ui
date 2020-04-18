import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { diceSimulationModel } from './model/diceSimulationModel';

@Component({
  selector: 'app-simulations',
  templateUrl: './simulations.component.html',
  styleUrls: ['./simulations.component.css'],
})
export class SimulationsComponent implements OnInit {
  diceSimulation: diceSimulationModel[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllSimulations();
  }

  getAllSimulations(): void {
    let url = 'http://localhost:8080/diceapi/simulation/all';
    this.http.get<diceSimulationModel[]>(url).subscribe(
      (res) => {
        this.diceSimulation = res;
      },
      (err) => {
        alert('err');
      }
    );
  }
}
