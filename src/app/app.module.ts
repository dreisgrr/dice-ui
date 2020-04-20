import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SimulationsComponent } from './simulations/simulations.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SimulationDetailComponent } from './simulation-detail/simulation-detail.component';

const appRoutes: Routes = [
  {
    path: 'simulations',
    component: SimulationsComponent,
  },
  {
    path: 'simulations/:id',
    component: SimulationDetailComponent,
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SimulationsComponent,
    StatisticsComponent,
    HomeComponent,
    SimulationDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
