import * as PIXI from "pixi.js";
import { Far } from "./Far";
import { Mid } from "./Mid";
import { Walls } from "../walls/Walls";
import { MapBuilder } from "../builders/MapBuilder";

export class Scroller {
    private far: Far;
    private mid: Mid;
    private front: Walls;
    private viewportX: number;
    private mapBuilder: MapBuilder;

    constructor(stage: PIXI.Container) {
        this.viewportX = 0;

        this.far = new Far();
        stage.addChild(this.far);

        this.mid = new Mid();
        stage.addChild(this.mid);

        this.front = new Walls();
        stage.addChild(this.front);

        this.mapBuilder = new MapBuilder(this.front);
    }

    public SetViewportX(viewportX: number): void {
        this.viewportX = viewportX;
        this.far.SetViewportX(viewportX);
        this.mid.SetViewportX(viewportX);
        this.front.SetViewportX(viewportX);
    }

    public GetViewportX(): number {
        return this.viewportX;
    }

    public MoveViewportXBy(units: number): void {
        const newViewportX = this.viewportX + units;
        this.SetViewportX(newViewportX);
    }
}
