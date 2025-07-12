import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
    { path: 'projects', loadComponent: () => import('./projects/projects.component').then(m => m.ProjectsComponent) },
    { path: 'publications', loadComponent: () => import('./publications/publications.component').then(m => m.PublicationsComponent) },
    { path: 'experience', loadComponent: () => import('./experience/experience.component').then(m => m.ExperienceComponent) },
    { path: 'travel', loadComponent: () => import('./travel/travel.component').then(m => m.TravelComponent) },
    { path: 'about', loadComponent: () => import('./about/about.component').then(m => m.AboutComponent) },
    { path: 'contact', loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent) },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];