define(["require", "exports", "../../lib/juicy"], function (require, exports, juicy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HexComponent = exports.Hex = void 0;
    // Represents a  using Doubled coordinate system in the width dimention
    // More about Doubled coordinates here: https://www.redblobgames.com/grids/hexagons/#coordinates-doubled
    class Hex {
        constructor(row, col) {
            this.row = row;
            this.col = col;
        }
        // Allows for conversion to Axial coordinate system and back.
        // Makes algorithms and tranfomations much easier!
        axialRepresentation() {
            const q = (this.col - this.row) / 2;
            const r = this.row;
            return { q: q, r: r };
        }
        allNeighbors() {
            return [
                new Hex(this.row + 2, this.col + 0),
                new Hex(this.row + 1, this.col + 1),
                new Hex(this.row + -1, this.col + 1),
                new Hex(this.row + -2, this.col + 0),
                new Hex(this.row + -1, this.col + -1),
                new Hex(this.row + 1, this.col + -1), // Northeast
            ];
        }
        distanceTo(other) {
            const dCol = Math.abs(this.col - other.col);
            const dRow = Math.abs(this.row - other.row);
            return dRow + Math.max(0, (dCol - dRow) / 2);
        }
        toPoint() {
            const size = HexComponent.height / 2; // "Size" is essentially the radius of the Hex to its points
            const x = size * Math.sqrt(3) / 2 * this.col;
            const y = size * (3 / 2) * this.row;
            return new juicy_1.Point(x, y);
        }
        static pointToHex(p) {
            // Finds the fractional Axial coordinate
            const size = HexComponent.height / 2;
            const q = (Math.sqrt(3) / 3 * p.x - 1 / 3 * p.y) / size;
            const r = (2 / 3 * p.y) / size;
            return Hex.fromAxial(Hex.fractionalRound({ q, r }));
        }
        static fromAxial(axial) {
            const col = 2 * axial.q + axial.r;
            const row = axial.r;
            return new Hex(row, col);
        }
        // Interpreted from https://observablehq.com/@jrus/hexround
        // Use lines that are aligned 60 degrees from each other to round fractional points into the right hex
        static fractionalRound(axial) {
            const qGrid = Math.round(axial.q);
            const rGrid = Math.round(axial.r);
            const qRemainder = axial.q - qGrid;
            const rRemainder = axial.r - rGrid;
            if (Math.abs(qRemainder) >= Math.abs(rRemainder)) {
                return { q: qGrid + Math.round(qRemainder + 0.5 * rRemainder), r: rGrid };
            }
            else {
                return { q: qGrid, r: rGrid + Math.round(rRemainder + 0.5 * qRemainder) };
            }
        }
    }
    exports.Hex = Hex;
    /// Represents a Hexagonal shape within a Doubled coordinate system
    /// More information here: https://www.redblobgames.com/grids/hexagons/#coordinates-doubled
    class HexComponent extends juicy_1.Component {
        constructor() {
            super(...arguments);
            this.hex = new Hex(0, 0);
        }
        update(dt, game) {
            // TODO: update??????
        }
        render(context, x, y, w, h) {
            // TODO: Render?????? 
        }
    }
    exports.HexComponent = HexComponent;
    HexComponent.width = 128;
    HexComponent.height = 148;
});
//# sourceMappingURL=hex.js.map