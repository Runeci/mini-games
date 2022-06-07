import { Component, Input, OnInit } from '@angular/core';
import { getRandomNum } from '../../../../shared/helpers/getRandomNum';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { rockPSLSItems } from '../../../../shared/mocks/rock-paper-scissors-lizard-spock';
import { BaseRPSClass } from '../../../baseRPS.class';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-r-p-s-l-s-game',
    templateUrl: './r-p-s-l-s-game.component.html',
    styleUrls: ['./r-p-s-l-s-game.component.scss'],
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

export class RPSLSGameComponent extends BaseRPSClass implements OnInit{
    @Input() gameTabInactive$!: Subject<boolean>;

    public ngOnInit() {
        this.gamePlayItems = rockPSLSItems;
        this.computerPlayItems = rockPSLSItems.map((item) => item.name);
        this.computerItemInx = getRandomNum(0, this.computerPlayItems.length - 1);
        this.computerSelectedItem = this.computerPlayItems[this.computerItemInx];
    }

    public moveContainer() {
        const gameItemsWidth = this.gameItems.nativeElement.getBoundingClientRect().width;
        const gameItemWidth = this.gameItem.nativeElement.getBoundingClientRect().width;
        const gap = (gameItemsWidth - gameItemWidth * this.gamePlayItems.length) / (this.gamePlayItems.length - 1);
        const additionalOffset = gap * 100 / gameItemWidth;
        const offset = 100 + additionalOffset;

        if (this.selectedElement === 'scissors') {
            return;
        } else if (this.selectedElement === 'paper') {
            this.showAnimLeftPos = `translateX(${ offset }%)`;
        } else if (this.selectedElement === 'lizard') {
            this.showAnimLeftPos = `translateX(-${ offset }%)`;
        } else if (this.selectedElement === 'rock') {
            this.showAnimLeftPos = `translateX(${ offset * 2 }%)`;
        } else if (this.selectedElement === 'spock') {
            this.showAnimLeftPos = `translateX(-${ offset * 2 }%)`;
        }
        this.moveAnimState = 'center';
    }

    public override chooseWinner() {
        if (this.selectedElement === this.computerSelectedItem) {
            this.winnerResult = 'draw';
        } else if (
            this.selectedElement === 'paper' && this.computerSelectedItem === 'rock'
            || this.selectedElement === 'paper' && this.computerSelectedItem === 'spock'
            || this.selectedElement === 'lizard' && this.computerSelectedItem === 'paper'
            || this.selectedElement === 'lizard' && this.computerSelectedItem === 'spock'
            || this.selectedElement === 'spock' && this.computerSelectedItem === 'rock'
            || this.selectedElement === 'spock' && this.computerSelectedItem === 'scissors'
            || this.selectedElement === 'scissors' && this.computerSelectedItem === 'paper'
            || this.selectedElement === 'scissors' && this.computerSelectedItem === 'lizard'
            || this.selectedElement === 'rock' && this.computerSelectedItem === 'scissors'
            || this.selectedElement === 'rock' && this.computerSelectedItem === 'lizard'
        ) {
            this.winnerResult = 'you win';
        } else {
            this.winnerResult = 'you lose'
        }
    }
}
