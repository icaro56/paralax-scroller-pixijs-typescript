import * as PIXI from "pixi.js";
import { WallSpritesPool } from "./WallSpritesPool";
import { SliceType } from "./SliceType";
import { WallSlice } from "./WallSlice";

export class Walls extends PIXI.Container {
    private pool: WallSpritesPool;
    private borrowWallSpriteLookup: Array<() => PIXI.Sprite | undefined>;
    private returnWallSpriteLookup: Array<(sprite: PIXI.Sprite) => void>;
    private slices: Array<WallSlice>;
    private viewportX: number;
    private viewportSliceX: number;

    public static readonly VIEWPORT_WIDTH = 512;
    public static readonly VIEWPORT_NUM_SLICES = Math.ceil(Walls.VIEWPORT_WIDTH / WallSlice.WIDTH) + 1;

    constructor() {
        super();

        this.pool = new WallSpritesPool();
        this.CreateLookupTables();

        this.slices = new Array<WallSlice>();

        this.viewportX = 0;
        this.viewportSliceX = 0;
    }

    public CheckViewportXBounds(viewportX: number): number {
        const maxViewportX = (this.slices.length - Walls.VIEWPORT_NUM_SLICES) * WallSlice.WIDTH;

        if (viewportX < 0) {
            viewportX = 0;
        } else if (viewportX > maxViewportX) {
            viewportX = maxViewportX;
        }

        return viewportX;
    }

    public SetViewportX(viewportX: number): void {
        this.viewportX = this.CheckViewportXBounds(viewportX);

        const prevViewportSliceX = this.viewportSliceX;
        this.viewportSliceX = Math.floor(this.viewportX / WallSlice.WIDTH);

        this.RemoveOldSlices(prevViewportSliceX);
        this.AddNewSlices();
    }

    private AddNewSlices(): void {
        const firstX = -(this.viewportX % WallSlice.WIDTH);

        for (
            let i = this.viewportSliceX, sliceIndex = 0;
            i < this.viewportSliceX + Walls.VIEWPORT_NUM_SLICES;
            i++, sliceIndex++
        ) {
            const slice = this.slices[i];
            if (slice.sprite == undefined && slice.type != SliceType.GAP) {
                slice.sprite = this.BorrowWallSprite(slice.type);
                if (slice.sprite) {
                    slice.sprite.position.x = firstX + sliceIndex * WallSlice.WIDTH;
                    slice.sprite.position.y = slice.y;

                    this.addChild(slice.sprite);
                }
            } else if (slice.sprite != undefined) {
                slice.sprite.position.x = firstX + sliceIndex * WallSlice.WIDTH;
            }
        }
    }

    private RemoveOldSlices(prevViewportSliceX: number): void {
        let numOldSlices = this.viewportSliceX - prevViewportSliceX;
        if (numOldSlices > Walls.VIEWPORT_NUM_SLICES) {
            numOldSlices = Walls.VIEWPORT_NUM_SLICES;
        }

        for (let i = prevViewportSliceX; i < prevViewportSliceX + numOldSlices; i++) {
            const slice = this.slices[i];
            if (slice.sprite) {
                this.ReturnWallSprite(slice.type, slice.sprite);
                this.removeChild(slice.sprite);
                slice.sprite = undefined;
            }
        }
    }

    private CreateLookupTables(): void {
        this.borrowWallSpriteLookup = new Array<() => PIXI.Sprite>();
        this.borrowWallSpriteLookup[SliceType.FRONT] = this.pool.BorrowFrontEdge;
        this.borrowWallSpriteLookup[SliceType.BACK] = this.pool.BorrowBackEdge;
        this.borrowWallSpriteLookup[SliceType.STEP] = this.pool.BorrowStep;
        this.borrowWallSpriteLookup[SliceType.DECORATION] = this.pool.BorrowDecoration;
        this.borrowWallSpriteLookup[SliceType.WINDOW] = this.pool.BorrowWindow;

        this.returnWallSpriteLookup = new Array<(sprite: PIXI.Sprite) => void>();
        this.returnWallSpriteLookup[SliceType.FRONT] = this.pool.ReturnFrontEdge;
        this.returnWallSpriteLookup[SliceType.BACK] = this.pool.ReturnBackEdge;
        this.returnWallSpriteLookup[SliceType.STEP] = this.pool.ReturnStep;
        this.returnWallSpriteLookup[SliceType.DECORATION] = this.pool.ReturnDecoration;
        this.returnWallSpriteLookup[SliceType.WINDOW] = this.pool.ReturnWindow;
    }

    public BorrowWallSprite(sliceType: SliceType): PIXI.Sprite | undefined {
        return this.borrowWallSpriteLookup[sliceType].call(this.pool);
    }

    public ReturnWallSprite(sliceType: SliceType, sliceSprite: PIXI.Sprite): void {
        this.returnWallSpriteLookup[sliceType].call(this.pool, sliceSprite);
    }

    public AddSlice(sliceType: SliceType, y: number): void {
        const slice = new WallSlice(sliceType, y);
        this.slices.push(slice);
    }

    /*public CreateTestWallSpan(): void {
        this.AddSlice(SliceType.FRONT, 192);
        this.AddSlice(SliceType.WINDOW, 192);
        this.AddSlice(SliceType.DECORATION, 192);
        this.AddSlice(SliceType.WINDOW, 192);
        this.AddSlice(SliceType.DECORATION, 192);
        this.AddSlice(SliceType.WINDOW, 192);
        this.AddSlice(SliceType.DECORATION, 192);
        this.AddSlice(SliceType.WINDOW, 192);
        this.AddSlice(SliceType.BACK, 192);
    }

    public CreateTestSteppedWallSpan(): void {
        this.AddSlice(SliceType.FRONT, 192);
        this.AddSlice(SliceType.WINDOW, 192);
        this.AddSlice(SliceType.DECORATION, 192);
        this.AddSlice(SliceType.STEP, 256);
        this.AddSlice(SliceType.WINDOW, 256);
        this.AddSlice(SliceType.BACK, 256);
    }

    public CreateTestGap(): void {
        this.AddSlice(SliceType.GAP, 192);
    }

    public CreateTestMap(): void {
        for (let i = 0; i < 10; i++) {
            this.CreateTestWallSpan();
            this.CreateTestGap();
            this.CreateTestSteppedWallSpan();
            this.CreateTestGap();
        }
    }*/
}
