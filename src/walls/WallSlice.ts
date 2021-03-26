import { SliceType } from "./SliceType";
import * as PIXI from "pixi.js";

export class WallSlice {
    public type: SliceType;
    public y: number;
    public sprite: PIXI.Sprite | undefined;
    public static readonly WIDTH = 64;

    constructor(type: SliceType, y: number) {
        this.type = type;
        this.y = y;
        this.sprite = undefined;
    }
}
