import * as PIXI from "pixi.js";

export class Far extends PIXI.TilingSprite {
    private viewportX: number;
    static readonly DELTA_X = 0.064;

    constructor() {
        const farTexture = PIXI.Loader.shared.resources["bg-far"].texture;
        const width = farTexture.baseTexture.width;
        const height = farTexture.baseTexture.height;

        super(farTexture, width, height);

        this.position.x = 0;
        this.position.y = 0;
        this.tilePosition.x = 0;
        this.tilePosition.y = 0;
        this.viewportX = 0;
    }

    public SetViewportX(newViewportX: number): void {
        const distanceTravelled = newViewportX - this.viewportX;
        this.viewportX = newViewportX;
        this.tilePosition.x -= distanceTravelled * Far.DELTA_X;
    }
}
