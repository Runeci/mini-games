import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BaseRPSClass } from '../../../baseRPS.class';
import { Subject, Subscription } from 'rxjs';
import { rockPaperScissorsItems } from '../../../../shared/mocks/rock-paper-scissors.mock';
import { getRandomNum } from '../../../../shared/helpers/getRandomNum';

@Component({
    selector: 'app-rock-paper-scissors-game',
    templateUrl: './r-p-s-game.component.html',
    styleUrls: ['./r-p-s-game.component.scss'],
    animations: [
        trigger('moveToCenter', [
            state('start',
                style({
                    transform: 'translateX(0%)',
                })
            ),
            state('center',
                style({
                    transform: '{{transform}}',
                }), { params: { transform: '0%' } }
            ),

            transition('start <=> center', [
                animate('500ms ease-in-out')
            ]),
        ])
    ],
})
export class RPSGameComponent extends BaseRPSClass implements OnInit, OnDestroy {
    @Input() gameTabInactive$!: Subject<boolean>;
    private tabsSubscription$!: Subscription;

    public ngOnInit() {
        this.gamePlayItems = rockPaperScissorsItems;
        this.computerPlayItems = rockPaperScissorsItems.map((item) => item.name);
        this.computerItemInx = getRandomNum(0, this.computerPlayItems.length - 1);
        this.computerSelectedItem = this.computerPlayItems[this.computerItemInx];
        this.tabsSubscription$ = this.gameTabInactive$.subscribe(
            (gameTabActive) => gameTabActive ? this.restartGame() : null
        );
    }

    public ngOnDestroy() {
        this.tabsSubscription$.unsubscribe();
    }

    public moveContainer() {
        const gameItemsWidth = this.gameItems.nativeElement.getBoundingClientRect().width;
        const gameItemWidth = this.gameItem.nativeElement.getBoundingClientRect().width;
        const gap = (gameItemsWidth - gameItemWidth * 3) / 2;
        const additionalOffset = gap * 100 / gameItemWidth;
        const offset = 100 + additionalOffset;

        if (this.selectedElement === 'paper') {
            return;
        } else if (this.selectedElement === 'rock') {
            this.showAnimLeftPos = `translateX(${ offset }%)`;
        } else if (this.selectedElement === 'scissors') {
            this.showAnimLeftPos = `translateX(-${ offset }%)`;
        }
        this.moveAnimState = 'center';
    }
}
