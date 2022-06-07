import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { emojis } from '../../../../shared/mocks/data-by-emoji';
import { getRandomNum } from '../../../../shared/helpers/getRandomNum';

interface EmojiCard {
    emoji: string,
    index?: number,
    flipped?: boolean,
    shake?: boolean,
}


@Component({
    selector: 'app-memory-card-game',
    templateUrl: './memory-card-game.component.html',
    styleUrls: ['./memory-card-game.component.scss']
})

export class MemoryCardGameComponent implements OnInit {
    @ViewChild('card') card!: ElementRef;
    public cards: EmojiCard[] = [];

    cardOne: EmojiCard = { emoji: '' };
    cardTwo: EmojiCard = { emoji: '' };
    move: number = 0;


    public selectedCard!: number;
    public totalMoves = 0;
    public numOfPairsMatched = 0;
    public allowRestart = false;
    public numOfPairs = 8;

    public ngOnInit(): void {
        this.cards = this.setEmojisCards(this.numOfPairs);
    }

    public onRestart() {
        this.cards = this.setEmojisCards(this.numOfPairs);
        this.totalMoves = 0;
        this.allowRestart = false;
    }

    public flipCard(event: Event, index: number): void {
        const e = event.target as HTMLDivElement;
        const cardIndex: number = e.id ? +e.id : +e.parentElement!.id;

        if (!this.cardOne.emoji) {
            this.cardOne.emoji = this.cards[index].emoji;
            this.cardOne.index = index;
            this.cards[cardIndex].flipped = true;
        } else if (!this.cardTwo.emoji) {
            this.cards[cardIndex].flipped = true;
            this.cardTwo.emoji = this.cards[index].emoji;
            this.cardTwo.index = index;
            this.totalMoves++;
        }
        this.move++;
        if (this.move === 2) {
            this.move = 0;
        }
        this.matchCards(this.cardOne, this.cardTwo);
    }

    public matchCards(cardOne: EmojiCard, cardTwo: EmojiCard): void {
        if (cardOne.emoji === cardTwo.emoji) {
            this.numOfPairsMatched++;
            if (this.numOfPairsMatched === this.numOfPairs) {
                this.numOfPairsMatched = 0;
                this.allowRestart = true;
            }
            this.clearPair();
            return;
        } else if (cardTwo.emoji) {
            setTimeout(() => {
                this.cards[cardOne.index!].shake = true;
                this.cards[cardTwo.index!].shake = true;

            }, 300);
            setTimeout(() => {
                this.cards[cardOne.index!].flipped = false;
                this.cards[cardTwo.index!].flipped = false;
                this.cards[cardOne.index!].shake = false;
                this.cards[cardTwo.index!].shake = false;
                this.clearPair();
            }, 600);
        }
    }

    private clearPair() {
        this.cardOne.emoji = '';
        this.cardTwo.emoji = '';

    }

    private setEmojisCards(numberOfPairs: number): EmojiCard[] {
        const resultArr = this.shuffleArray(this.getRandomEmojis(numberOfPairs));
        return this.setIndexesToCards(resultArr);
    }

    private getRandomEmojis(numOfItems: number): EmojiCard[] {
        const copy = [...emojis];
        const arr: EmojiCard[] = [];
        // while (arr.length < numOfItems) {
        //     arr.push({ emoji: emojis[getRandomNum(0, emojis.length)], flipped: false });
        // }
        // const emojiStrArr = arr.map((i) => i.emoji);
        // if (new Set(emojiStrArr).size !== numOfItems) {
        //     this.getRandomEmojis(numOfItems);
        // }

        while (arr.length < numOfItems) {
            const emoji = copy.splice(getRandomNum(0, copy.length), 1)[0];
            arr.push({ emoji: emoji, flipped: false });
        }

        return [...arr, ...arr];
    }

    private setIndexesToCards(arr: EmojiCard[]): EmojiCard[] {
        return arr.map((card, i) => {
            return { ...card, index: i };
        });
    }

    private shuffleArray(arr: EmojiCard[]) {
        return arr
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    }
}
