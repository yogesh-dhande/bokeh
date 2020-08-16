import {Column, ColumnView} from "./column"
import * as p from "./../../core/properties"

export class UIColumnView extends ColumnView {
    model: UIColumn
}

export namespace UIColumn {
    export type Attrs = p.AttrsOf<Props>

    export type Props = Column.Props & {
        ui_dict: p.Property<any>,
        prop_ui_dict: p.Property<any>,
        component: p.String
    }
}

export interface UIColumn extends UIColumn.Attrs {}

export class UIColumn extends Column {
    properties: UIColumn.Props

    constructor(attrs?: Partial<UIColumn.Attrs>) {
        super(attrs)
    }

    static init_UIColumn(): void {
        this.prototype.default_view = UIColumnView

        this.define<UIColumn.Props>({
            ui_dict: [ p.Any ],
            prop_ui_dict: [ p.Any ],
            component: [p.String],
        })
    }
}
