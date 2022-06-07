import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
    selector: 'app-rock-paper-scissors-lizard-spock.ts',
    templateUrl: './r-p-s-l-s-page.component.html',
    styleUrls: ['./r-p-s-l-s-page.component.scss'],
})
export class RPSLSPageComponent implements OnInit {
    public selectedTab!: number;
    public gameTabInactive$ = new BehaviorSubject<boolean>(false);
    private tabs = ['rules', 'game'];

    constructor(
        private router: Router,
        private route: ActivatedRoute) {
    }

    public ngOnInit() {
        this.route.queryParams.subscribe(
            (params) => {
                this.selectedTab = this.tabs.indexOf(params['section']);
            }
        );
    }

    public tabChanged(event: MatTabChangeEvent) {
        const tab = event.tab.textLabel.toLowerCase();
        this.router.navigate(
            ['games', { outlets: { game: 'rock-paper-scissors-lizard-spock' } }],
            { queryParams: { section: tab } });

        if (tab !== 'game') {
            this.gameTabInactive$.next(true);
        } else {
            this.gameTabInactive$.next(false);
        }
    }
}
