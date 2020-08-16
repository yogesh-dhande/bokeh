import {UIRow, UIRowView} from "./ui_row";

export class CustomToolbarView extends UIRowView {
    model: UIRow
}

export class CustomToolbar extends UIRow {
    static init_CustomToolbar(): void {
        this.prototype.default_view = CustomToolbarView
    }
}