import { Directive, ElementRef, ViewChild } from '@angular/core';
import { RockPaperScissorsI } from '../shared/models/games.typing';
import { getRandomNum } from '../shared/helpers/getRandomNum';

@Directive()
export class BaseRPSClass {
    @ViewChild('gameItems') gameItems!: ElementRef;
    @ViewChild('gameItem') gameItem!: ElementRef;

    public gamePlayItems!: RockPaperScissorsI[];
    public selectedElement: RockPaperScissorsI['name'] = '';

    public firstLoad = true;
    public computerScore: number = 0;
    public playerScore: number = 0;

    public moveAnimState: string = 'start';
    public showAnimLeftPos: string = '0px';

    public computerPlayItems!: RockPaperScissorsI['name'][];
    public computerItemInx!: number;
    public computerSelectedItem!: RockPaperScissorsI['name'];

    public showResult = false;
    public winnerResult: string = '';

    private animationIntervalId: ReturnType<typeof setInterval> | undefined;

    public selectGameItem(itemName: RockPaperScissorsI['name']) {
        this.selectedElement = itemName;
        this.firstLoad = false;
        this.changeComputerImage();
        this.endGame();
    }

    public restartGame() {
        this.selectedElement = '';
        this.winnerResult = '';
        this.moveAnimState = 'start';
        this.showResult = false;
        this.firstLoad = true;
    }

    private changeComputerImage() {
        this.animationIntervalId = setInterval(() => {
            this.computerItemInx = getRandomNum(0, this.computerPlayItems.length);
            this.computerSelectedItem = this.computerPlayItems[this.computerItemInx];
        }, 100);
    }

    private endGame() {
        setTimeout(() => {
            clearInterval(this.animationIntervalId);
            this.chooseWinner();
            this.updateScore(this.winnerResult);
            this.showResult = true;
        }, 1000);
    }

    public chooseWinner() {
        if (this.selectedElement === this.computerSelectedItem) {
            this.winnerResult = 'draw';
        } else if (this.selectedElement === 'paper' && this.computerSelectedItem === 'rock'
            || this.selectedElement === 'scissors' && this.computerSelectedItem === 'paper') {
            this.winnerResult = 'you win';
        } else {
            this.winnerResult = 'you lose';
        }
    }

    private updateScore(result: string) {
        switch (result) {
            case 'you win':
                this.playerScore += 1;
                break;
            case 'you lose':
                this.computerScore += 1;
                break;
        }
    }
}
