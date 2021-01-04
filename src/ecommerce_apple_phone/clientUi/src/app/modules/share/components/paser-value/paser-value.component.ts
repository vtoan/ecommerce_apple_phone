import { Component, Input } from "@angular/core";

@Component({
    selector: "paser-value",
    template: `<span>{{
        rawVal % 1 == 0
            ? (rawVal | currency: "VND":"symbol":"1.0":"fr")
            : rawVal * 100 + "  %"
    }}</span>`,
})
export class PaserValueComponent {
    @Input() rawVal: number;
    constructor() {}
}
