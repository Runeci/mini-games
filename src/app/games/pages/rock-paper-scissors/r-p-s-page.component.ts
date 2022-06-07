import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-rock-paper-scissors',
    templateUrl: './r-p-s-page.component.html',
    styleUrls: ['../styles/page.scss'],
})

export class RPSPageComponent implements OnInit {
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
            ['games', { outlets: { game: 'rock-paper-scissors' } }],
            { queryParams: { section: tab } });

        if (tab !== 'game') {
            this.gameTabInactive$.next(true);
        } else {
            this.gameTabInactive$.next(false);
        }
    }
}
