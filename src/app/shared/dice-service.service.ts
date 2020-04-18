import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { diceSimulationModel } from '../simulations/model/diceSimulationModel';
import { HttpClient } from '@angular/common/http';
import {
  simulationDistribution,
  diceSimulationInput,
} from '../home/home.component';
import { diceConfiguration } from '../statistics/statistics.component';
import { simulationStatsByCombination } from '../statistics/model/simulationStatsByCombination';
import { distributionStatsByCombination } from '../statistics/model/distributionStatsByCombination';

@Injectable({
  providedIn: 'root',
})
export class DiceServiceService {
  private BASE_URL = 'http://localhost:8080/diceapi/simulation';
  private RUN_SIMULATION_URL = `${this.BASE_URL}\\run`;
  private GET_ALL_SIMULATIONS_URL = `${this.BASE_URL}\\all`;
  private GET_STATISTICS_TOTAL_URL = `${this.BASE_URL}\\statistics\\total`;
  private GET_STATISTICS_DISTRIBUTION_URL = `${this.BASE_URL}\\statistics\\distribution`;

  constructor(private http: HttpClient) {}

  runSimulation(
    diceSimulationInput: diceSimulationInput
  ): Observable<simulationDistribution[]> {
    return this.http.post<simulationDistribution[]>(
      this.RUN_SIMULATION_URL,
      diceSimulationInput
    );
  }

  getAllSimulations(): Observable<diceSimulationModel[]> {
    return this.http.get<diceSimulationModel[]>(this.GET_ALL_SIMULATIONS_URL);
  }

  getSimulationById(id: number): Observable<diceSimulationModel> {
    return this.http.post<diceSimulationModel>(`${this.BASE_URL}\\${id}`, id);
  }

  getSimulationStatsByCombination(
    diceConfiguration: diceConfiguration
  ): Observable<simulationStatsByCombination[]> {
    return this.http.post<simulationStatsByCombination[]>(
      this.GET_STATISTICS_TOTAL_URL,
      diceConfiguration
    );
  }

  getCombinedDistributionStatsByCombination(
    diceConfiguration: diceConfiguration
  ): Observable<distributionStatsByCombination[]> {
    return this.http.post<distributionStatsByCombination[]>(
      this.GET_STATISTICS_DISTRIBUTION_URL,
      diceConfiguration
    );
  }
}
