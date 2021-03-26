import * as PIXI from "pixi.js";

export class WallSpritesPool {
    private windows: Array<PIXI.Sprite>;
    private decorations: Array<PIXI.Sprite>;
    private frontEdges: Array<PIXI.Sprite>;
    private backEdges: Array<PIXI.Sprite>;
    private steps: Array<PIXI.Sprite>;

    constructor() {
        this.windows = new Array<PIXI.Sprite>();
        this.decorations = new Array<PIXI.Sprite>();
        this.frontEdges = new Array<PIXI.Sprite>();
        this.backEdges = new Array<PIXI.Sprite>();
        this.steps = new Array<PIXI.Sprite>();

        this.PopulateWindows();
        this.PopulateDecorations();
        this.PopulateFrontEdges();
        this.PopulateBackEdges();
        this.PopulateSteps();
    }

    public BorrowWindow(): PIXI.Sprite | undefined {
        return this.windows.shift();
    }

    public ReturnWindow(sprite: PIXI.Sprite): void {
        this.windows.push(sprite);
    }

    public BorrowDecoration(): PIXI.Sprite | undefined {
        return this.decorations.shift();
    }

    public ReturnDecoration(sprite: PIXI.Sprite): void {
        this.decorations.push(sprite);
    }

    public BorrowFrontEdge(): PIXI.Sprite | undefined {
        return this.frontEdges.shift();
    }

    public ReturnFrontEdge(sprite: PIXI.Sprite): void {
        this.frontEdges.push(sprite);
    }

    public BorrowBackEdge(): PIXI.Sprite | undefined {
        return this.backEdges.shift();
    }

    public ReturnBackEdge(sprite: PIXI.Sprite): void {
        this.backEdges.push(sprite);
    }

    public BorrowStep(): PIXI.Sprite | undefined {
        return this.steps.shift();
    }

    public ReturnStep(sprite: PIXI.Sprite): void {
        this.steps.push(sprite);
    }

    private PopulateWindows(): void {
        this.AddWindowSprites(6, "window_01");
        this.AddWindowSprites(6, "window_02");

        this.Shuffle(this.windows);
    }

    private PopulateDecorations(): void {
        this.AddDecorationSprites(6, "decoration_01");
        this.AddDecorationSprites(6, "decoration_02");
        this.AddDecorationSprites(6, "decoration_03");

        this.Shuffle(this.decorations);
    }

    private PopulateFrontEdges(): void {
        this.AddFrontEdgeSprites(2, "edge_01");
        this.AddFrontEdgeSprites(2, "edge_02");
    }

    private PopulateBackEdges(): void {
        this.AddBackEdgeSprites(2, "edge_01");
        this.AddBackEdgeSprites(2, "edge_02");
    }

    private PopulateSteps(): void {
        this.AddStepSprites(2, "step_01");
    }

    private Shuffle(array: Array<any>): void {
        const len = array.length;
        const shuffles = len * 3;

        for (let i = 0; i < shuffles; i++) {
            const wallSlice = array.pop();
            const pos = Math.floor(Math.random() * (len - 1));
            array.splice(pos, 0, wallSlice);
        }
    }

    private AddWindowSprites(amount: number, frameId: string): void {
        for (let i = 0; i < amount; i++) {
            const sprite = PIXI.Sprite.from(frameId);
            this.windows.push(sprite);
        }
    }

    private AddDecorationSprites(amount: number, frameId: string): void {
        for (let i = 0; i < amount; i++) {
            const sprite = PIXI.Sprite.from(frameId);
            this.decorations.push(sprite);
        }
    }

    private AddFrontEdgeSprites(amount: number, frameId: string): void {
        for (let i = 0; i < amount; i++) {
            const sprite = PIXI.Sprite.from(frameId);
            this.frontEdges.push(sprite);
        }
    }

    private AddBackEdgeSprites(amount: number, frameId: string): void {
        for (let i = 0; i < amount; i++) {
            const sprite = PIXI.Sprite.from(frameId);
            sprite.anchor.x = 1;
            sprite.scale.x = -1;
            this.backEdges.push(sprite);
        }
    }

    private AddStepSprites(amount: number, frameId: string): void {
        for (let i = 0; i < amount; i++) {
            const sprite = PIXI.Sprite.from(frameId);
            sprite.anchor.y = 0.25;
            this.steps.push(sprite);
        }
    }
}
