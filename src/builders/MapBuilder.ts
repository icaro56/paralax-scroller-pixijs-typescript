import { SliceType } from "../walls/SliceType";
import { Walls } from "../walls/Walls";

export class MapBuilder {
    private walls: Walls;
    public static readonly WALL_HEIGHTS = [256, 224, 192, 160, 128];

    constructor(front: Walls) {
        this.walls = front;
        this.CreateMap();
    }

    public CreateMap(): void {
        this.CreateWallSpan(3, 9, true);
        this.CreateGap(1);
        this.CreateWallSpan(1, 30);
        this.CreateGap(1);
        this.CreateWallSpan(2, 18);
        this.CreateGap(1);
        this.CreateSteppedWallSpan(2, 5, 28);
        this.CreateGap(1);
        this.CreateWallSpan(1, 10);
        this.CreateGap(1);
        this.CreateWallSpan(2, 6);
        this.CreateGap(1);
        this.CreateWallSpan(1, 8);
        this.CreateGap(1);
        this.CreateWallSpan(2, 6);
        this.CreateGap(1);
        this.CreateWallSpan(1, 8);
        this.CreateGap(1);
        this.CreateWallSpan(2, 7);
        this.CreateGap(1);
        this.CreateWallSpan(1, 16);
        this.CreateGap(1);
        this.CreateWallSpan(2, 6);
        this.CreateGap(1);
        this.CreateWallSpan(1, 22);
        this.CreateGap(2);
        this.CreateWallSpan(2, 14);
        this.CreateGap(2);
        this.CreateWallSpan(3, 8);
        this.CreateGap(2);
        this.CreateSteppedWallSpan(3, 5, 12);
        this.CreateGap(3);
        this.CreateWallSpan(0, 8);
        this.CreateGap(3);
        this.CreateWallSpan(1, 50);
        this.CreateGap(20);
    }

    public CreateGap(spanLength: number): void {
        for (let i = 0; i < spanLength; i++) {
            this.walls.AddSlice(SliceType.GAP, 0);
        }
    }

    public CreateWallSpan(heightIndex: number, spanLength: number, noFront = false, noBack = false): void {
        if (noFront == false && spanLength > 0) {
            this.AddWallFront(heightIndex);
            spanLength--;
        }

        const midSpanLength = spanLength - (noBack ? 0 : 1);
        if (midSpanLength > 0) {
            this.AddWallMid(heightIndex, midSpanLength);
            spanLength -= midSpanLength;
        }

        if (noBack == false && spanLength > 0) {
            this.AddWallBack(heightIndex);
        }
    }

    public CreateSteppedWallSpan(heightIndex: number, spanALength: number, spanBLength: number): void {
        if (heightIndex < 2) {
            heightIndex = 2;
        }

        this.CreateWallSpan(heightIndex, spanALength, false, true);
        this.AddWallStep(heightIndex - 2);
        this.CreateWallSpan(heightIndex - 2, spanBLength - 1, true, false);
    }

    private AddWallFront(heightIndex: number): void {
        const y = MapBuilder.WALL_HEIGHTS[heightIndex];
        this.walls.AddSlice(SliceType.FRONT, y);
    }

    private AddWallBack(heightIndex: number): void {
        const y = MapBuilder.WALL_HEIGHTS[heightIndex];
        this.walls.AddSlice(SliceType.BACK, y);
    }

    private AddWallMid(heightIndex: number, spanLength: number): void {
        const y = MapBuilder.WALL_HEIGHTS[heightIndex];

        for (let i = 0; i < spanLength; i++) {
            if (i % 2 == 0) {
                this.walls.AddSlice(SliceType.WINDOW, y);
            } else {
                this.walls.AddSlice(SliceType.DECORATION, y);
            }
        }
    }

    private AddWallStep(heightIndex: number): void {
        const y = MapBuilder.WALL_HEIGHTS[heightIndex];
        this.walls.AddSlice(SliceType.STEP, y);
    }
}
