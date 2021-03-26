import * as PIXI from "pixi.js";

export class Mid extends PIXI.TilingSprite {
    private viewportX: number;
    static readonly DELTA_X = 0.32;

    constructor() {
        const midTexture = PIXI.Loader.shared.resources["bg-mid"].texture;
        const width = midTexture.baseTexture.width;
        const height = midTexture.baseTexture.height;

        super(midTexture, width, height);

        this.position.x = 0;
        this.position.y = 128;
        this.tilePosition.x = 0;
        this.tilePosition.y = 0;
        this.viewportX = 0;
    }

    public SetViewportX(newViewportX: number): void {
        const distanceTravelled = newViewportX - this.viewportX;
        this.viewportX = newViewportX;
        this.tilePosition.x -= distanceTravelled * Mid.DELTA_X;
    }
}
