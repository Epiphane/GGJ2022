import { Component, FillStyle, Game, Point, SetCanvasSize } from "../../lib/juicy";

export interface AxialHex {
    q: number;
    r: number;
}

// Represents a  using Doubled coordinate system in the width dimention
// More about Doubled coordinates here: https://www.redblobgames.com/grids/hexagons/#coordinates-doubled
export class Hex {
    row: number;
    col: number;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
    }

    // Allows for conversion to Axial coordinate system and back.
    // Makes algorithms and tranfomations much easier!
    axialRepresentation(): AxialHex {
        const q = (this.col - this.row) / 2;
        const r = this.row;
        return { q: q, r: r }
    }

    allNeighbors(): Hex[] {
        return [
            new Hex(this.row + 2, this.col + 0),    // East
            new Hex(this.row + 1, this.col + 1),    // Southeast
            new Hex(this.row + -1, this.col + 1),   // Southwest
            new Hex(this.row + -2, this.col + 0),   // West
            new Hex(this.row + -1, this.col + -1),  // Northwest
            new Hex(this.row + 1, this.col + -1),   // Northeast
        ]
    }

    distanceTo(other: Hex) {
        const dCol = Math.abs(this.col - other.col);
        const dRow = Math.abs(this.row - other.row);
        return dRow + Math.max(0, (dCol - dRow) / 2);
    }

    toPoint(): Point {
        const size = HexComponent.height / 2; // "Size" is essentially the radius of the Hex to its points
        const x = size * Math.sqrt(3) / 2 * this.col;
        const y = size * (3 / 2) * this.row;
        return new Point(x, y);
    }

    static pointToHex(p: Point): Hex {
        // Finds the fractional Axial coordinate
        const size = HexComponent.height / 2;
        const q = (Math.sqrt(3) / 3 * p.x - 1 / 3 * p.y) / size;
        const r = (2 / 3 * p.y) / size;
        return Hex.fromAxial(Hex.fractionalRound({ q, r }))
    }

    static fromAxial(axial: AxialHex): Hex {
        const col = 2 * axial.q + axial.r;
        const row = axial.r;
        return new Hex(row, col);
    }

    // Interpreted from https://observablehq.com/@jrus/hexround
    // Use lines that are aligned 60 degrees from each other to round fractional points into the right hex
    static fractionalRound(axial: AxialHex): AxialHex {
        const qGrid = Math.round(axial.q)
        const rGrid = Math.round(axial.r);

        const qRemainder = axial.q - qGrid;
        const rRemainder = axial.r - rGrid;

        if (Math.abs(qRemainder) >= Math.abs(rRemainder)) {
            return { q: qGrid + Math.round(qRemainder + 0.5 * rRemainder), r: rGrid }
        } else {
            return { q: qGrid, r: rGrid + Math.round(rRemainder + 0.5 * qRemainder) }
        }
    }
}

/// Represents a Hexagonal shape within a Doubled coordinate system
/// More information here: https://www.redblobgames.com/grids/hexagons/#coordinates-doubled
export class HexComponent extends Component {
    hex = new Hex(0, 0);
    static width: number = 128;
    static height: number = 148;

    update(dt: number, game: typeof Game) {
        // TODO: update??????
    }

    render(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
        // TODO: Render?????? 
    }
}
