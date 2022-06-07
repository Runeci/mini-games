import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-games-page',
    templateUrl: './games-page.component.html',
    styleUrls: ['./games-page.component.scss']
})
export class GamesPageComponent implements OnInit {
    public games = [
        {
            name: 'Rock paper scissors',
            path: 'rock-paper-scissors',
        },
        {
            name: 'Rock paper scissors lizard spock',
            path: 'rock-paper-scissors-lizard-spock',
        },
        {
            name: 'Memory card',
            path: 'memory-card',
        },
        {
            name: 'Memory card',
            path: 'memory-card',
        },
    ];

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    public ngOnInit(): void {
    }

    public goToGame(gameName: string) {
        this.router.navigate([{ outlets: { game: [gameName] } }], {
            queryParams: { section: 'rules' },
            relativeTo: this.route
        });
    }

    public exit() {
        this.router.navigate(['games'], { queryParams: { section: null } });
    }
}
