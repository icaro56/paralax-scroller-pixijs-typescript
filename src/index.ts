import { GameApp } from "./app/GameApp";

import "./style.css";

window.onload = WindowLoaded;

async function WindowLoaded(): Promise<void> {
    const myGame = new GameApp(document.body, 512, 384);

    await myGame.LoadGameAssets();

    myGame.SetupGame();
}
