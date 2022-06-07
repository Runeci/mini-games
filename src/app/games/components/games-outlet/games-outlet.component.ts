import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { RPSPageComponent } from '../../pages/rock-paper-scissors/r-p-s-page.component';
import { Games } from '../../../shared/models/games.enums';
import { RPSLSPageComponent } from '../../pages/rock-paper-scissors-lizard-spock/r-p-s-l-s-page.component';
import { MemoryCardComponent } from '../../pages/memory-card/memory-card.component';

@Component({
    selector: 'app-games-outlet',
    templateUrl: './games-outlet.component.html',
    styleUrls: ['./games-outlet.component.scss']
})
export class GamesOutletComponent {
    constructor(
        private router: Router,
        activatedRoute: ActivatedRoute,
        private dialog: MatDialog,
    ) {
       activatedRoute.params.subscribe(
            (params) => this.openModal(this.getGameComponent(params['gameName']))
        );
    }

    private openModal(component: ComponentType<any>) {
        const dialogRef = this.dialog.open(component, {
            maxWidth: '100vw',
            maxHeight: '100vh',
            height: '80%',
            width: '80%',
        });
        dialogRef.afterClosed().subscribe(
            () => this.router.navigate(['/games'])
        )
    }

    private getGameComponent(gameName: string): ComponentType<any> {
        switch (gameName) {
            case Games.RockPaperScissors:
                return RPSPageComponent;
            case Games.MemoryCard:
                return MemoryCardComponent;
            case Games.RockPaperScissorsLizardSpock:
                return RPSLSPageComponent;
            default:
                return {} as ComponentType<any>;
        }
    }
}
