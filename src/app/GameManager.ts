import * as PIXI from "pixi.js";
import { Scroller } from "../paralax/Scroller";
import { WallSpritesPool } from "../walls/WallSpritesPool";

export class GameManager {
    private stage: PIXI.Container;
    private view: HTMLCanvasElement;
    private state: null | ((delta: number, elapsedMS: number) => void);
    private timerInMiliseconds: number;
    private scroller: Scroller | null;
    private scrollSpeed: number;

    public static readonly MIN_SCROLL_SPEED = 5;
    public static readonly MAX_SCROLL_SPEED = 15;
    public static readonly SCROLL_ACCELERATIOM = 0.005;

    constructor(stage: PIXI.Container, view: HTMLCanvasElement) {
        this.stage = stage;
        this.view = view;
        this.state = null;

        this.scroller = null;
        this.scrollSpeed = GameManager.MIN_SCROLL_SPEED;

        this.stage.sortableChildren = true;
        this.timerInMiliseconds = 0;
    }

    public Setup(): void {
        this.timerInMiliseconds = 0;

        this.scroller = new Scroller(this.stage);

        this.state = this.Playing;
    }

    public Update(delta: number, elapsedMS: number): void {
        if (this.state != null) {
            this.state(delta, elapsedMS);
        }
    }

    private Playing(delta: number, elapsedMS: number) {
        this.timerInMiliseconds += elapsedMS;

        if (this.scroller != null) {
            this.scroller.MoveViewportXBy(this.scrollSpeed * delta);

            this.scrollSpeed += GameManager.SCROLL_ACCELERATIOM;
            if (this.scrollSpeed > GameManager.MAX_SCROLL_SPEED) {
                this.scrollSpeed = GameManager.MAX_SCROLL_SPEED;
            }
        }
    }
}
