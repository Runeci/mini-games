import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './core/pages/home-page/home-page.component';
import { HeaderComponent } from './core/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GamesPageComponent } from './games/pages/games-page/games-page.component';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { RPSPageComponent } from './games/pages/rock-paper-scissors/r-p-s-page.component';
import { GamesOutletComponent } from './games/components/games-outlet/games-outlet.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { RPSRulesComponent } from './games/pages/rock-paper-scissors/rock-paper-scissors-rules/r-p-s-rules.component';
import { RPSGameComponent } from './games/pages/rock-paper-scissors/rock-paper-scissors-game/r-p-s-game.component';
import { RPSLSPageComponent } from './games/pages/rock-paper-scissors-lizard-spock/r-p-s-l-s-page.component';
import { RPSLSRulesComponent } from './games/pages/rock-paper-scissors-lizard-spock/r-p-s-l-s-rules/r-p-s-l-s-rules.component';
import { RPSLSGameComponent } from './games/pages/rock-paper-scissors-lizard-spock/r-p-s-l-s-game/r-p-s-l-s-game.component';
import { MatCardModule } from '@angular/material/card';
import { MemoryCardComponent } from './games/pages/memory-card/memory-card.component';
import { MemoryCardGameComponent } from './games/pages/memory-card/memory-card-game/memory-card-game.component';
import { MemoryCardRulesComponent } from './games/pages/memory-card/memory-card-rules/memory-card-rules.component';

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        HeaderComponent,
        GamesPageComponent,
        RPSPageComponent,
        GamesOutletComponent,
        RPSRulesComponent,
        RPSGameComponent,
        RPSLSPageComponent,
        RPSLSRulesComponent,
        RPSLSGameComponent,
        MemoryCardComponent,
        MemoryCardGameComponent,
        MemoryCardRulesComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatMenuModule,
        MatDialogModule,
        MatTabsModule,
        MatCardModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
