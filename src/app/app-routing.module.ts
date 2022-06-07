import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './core/pages/home-page/home-page.component';
import { GamesPageComponent } from './games/pages/games-page/games-page.component';
import { GamesOutletComponent } from './games/components/games-outlet/games-outlet.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomePageComponent,
    },
    {
        path: 'games',
        component: GamesPageComponent,
        children: [
            {
                path: ':gameName',
                outlet: 'game',
                component: GamesOutletComponent,
                data: { section: 'rules' }
            }
        ],
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
