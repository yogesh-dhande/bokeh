import {Row, RowView} from "./row"
import * as p from "./../../core/properties"

export class UIRowView extends RowView {
    model: UIRow
}

export namespace UIRow {
    export type Attrs = p.AttrsOf<Props>

    export type Props = Row.Props & {
        ui_dict: p.Property<any>,
        prop_ui_dict: p.Property<any>,
        component: p.String
    }
}

export interface UIRow extends UIRow.Attrs {}

export class UIRow extends Row {
    properties: UIRow.Props

    constructor(attrs?: Partial<UIRow.Attrs>) {
        super(attrs)
    }

    static init_UIRow(): void {
        this.prototype.default_view = UIRowView

        this.define<UIRow.Props>({
            ui_dict: [ p.Any ],
            prop_ui_dict: [ p.Any ],
            component: [p.String],
        })
    }
}
