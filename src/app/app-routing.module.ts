import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { BookComponent } from './dashboard/bookings/book/book.component';
import { CarComponent } from './dashboard/cars/car/car.component';
import { CarsComponent } from './dashboard/cars/cars/cars.component';
import { ConfigurationsComponent } from './dashboard/configurations/configurations.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { HomeComponent } from './home/home/home.component';
import { ImageWidgetComponent } from './image-widget/image-widget.component';
import { ItemComponent } from './item/item/item.component';
import { ItemsComponent } from './item/items/items.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: LoginComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'cars/:id', component: CarComponent },
  { path: 'book/:id', component: BookComponent },
  { path: 'configurations', component: ConfigurationsComponent },
];

export const declarations = [
  ItemComponent,
  ItemsComponent,
  ImageWidgetComponent,
  DashboardComponent,
  HomeComponent,
  LoginComponent,
  CarsComponent,
  CarComponent,
  ConfigurationsComponent,
  BookComponent
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
