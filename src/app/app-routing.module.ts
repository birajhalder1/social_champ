import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/Core/guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./Feature/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./Feature/dashboard/dashboard.module').then((m) => m.DashboardModule), canActivate: [AuthGuard]
  },
  {
    path: 'registration',
    loadChildren: () => import('./Feature/registration/registration.module').then((m) => m.RegistrationModule),
  },
  { path: 'contact-us', loadChildren: () => import('./Feature/contact-us/contact-us.module').then(m => m.ContactUsModule), canActivate: [AuthGuard] },
  { path: 'movie-list', loadChildren: () => import('./Feature/movie-list/movie-list.module').then(m => m.MovieListModule), canActivate: [AuthGuard] },
  { path: 'home', loadChildren: () => import('./Feature/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
