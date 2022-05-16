import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import ActorPageComponent from './movies/pages/actor-page/actor-page.component';
import MoviePageComponent from './movies/pages/movie-page/movie-page.component';
import MoviesComponent from './movies/pages/movies/movies.component';
import SearchPageComponent from './movies/pages/search-page/search-page.component';

const routes: Routes = [
  { path: '', component: MoviesComponent },
  { path: 'movie/:id', component: MoviePageComponent },
  { path: 'person/:id', component: ActorPageComponent },
  { path: 'search/:id', component: SearchPageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule { }
