import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { GameManager } from "./GameManager";
import { Utils } from "../utils/Utils";
import { HTTPRequest } from "../utils/HTTPRequest";

// register the plugin
gsap.registerPlugin(PixiPlugin);
// give the plugin a reference to the PIXI object
PixiPlugin.registerPIXI(PIXI);

export class GameApp {
    private app: PIXI.Application;
    public Stage: PIXI.Container;
    public View: HTMLCanvasElement;
    private gameWidth: number;
    private gameHeight: number;
    private gameManager: GameManager;

    constructor(parent: HTMLElement, width: number, height: number) {
        this.app = new PIXI.Application({
            width,
            height,
            backgroundColor: 0x111111,
            transparent: true,
            resolution: 1,
            antialias: true,
        });

        this.Stage = this.app.stage;
        this.View = this.app.view;

        this.gameWidth = width;
        this.gameHeight = height;

        parent.appendChild(this.View);

        Utils.view = this.View;

        this.gameManager = new GameManager(this.app.stage, this.app.view);
    }

    public async LoadGameAssets(): Promise<void> {
        return new Promise((resolve, reject) => {
            const loader = PIXI.Loader.shared;
            loader.baseUrl = "assets";
            loader.add("bg-far", "bg-far.png");
            loader.add("bg-mid", "bg-mid.png");
            loader.add("wall", "wall.json");

            loader.onComplete.once(() => {
                resolve();
            });

            loader.onError.once(() => {
                reject();
            });

            loader.onProgress.add(this.LoadProgressHandler);

            loader.load();
        });
    }

    private LoadProgressHandler(loader: PIXI.Loader, resource: PIXI.LoaderResource) {
        console.log("loading: " + resource.url);

        console.log("progress: " + loader.progress + "%");
    }

    public resizeCanvas(): void {
        Utils.ScaleToWindow(this.View);

        window.addEventListener("resize", () => {
            Utils.ScaleToWindow(this.View);
            //console.log(e)
        });
    }

    public GameWidth(): number {
        return this.gameWidth;
    }

    public GameHeight(): number {
        return this.gameHeight;
    }

    public SetupGame(): void {
        this.resizeCanvas();

        this.SetupGameByFile();
    }

    private SetupGameByFile() {
        // depois adicionar a forma que utiliza o WebService também
        this.InitGame();
    }

    private InitGame(): void {
        this.gameManager.Setup();
        this.app.ticker.add((delta) => this.GameLoop(delta));
    }

    private GameLoop(delta: number): void {
        this.gameManager.Update(delta, this.app.ticker.elapsedMS);
    }
}
