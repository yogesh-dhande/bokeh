import {DataTable, TableDataProvider} from "./data_table"
import * as p from "core/properties"
import {WidgetView} from "../widget"
import {range} from "core/util/array"
import {keys} from "core/util/object"
import {Item} from "./table_column"
import jexcel from "jexcel-pro"

export class JexcelTableView extends WidgetView {
    model: JexcelTable

    el: HTMLDivElement
    protected data: TableDataProvider
    protected table: any

    connect_signals(): void {
        this.connect(this.model.change, () => this.render())

        this.connect(this.model.source.streaming, () => this.updateGrid())
        this.connect(this.model.source.patching, () => this.updateGrid())
        this.connect(this.model.source.change, () => this.updateGrid())
        this.connect(this.model.source.properties.data.change, () => this.updateGrid())
    }

    render(): void {
        this.data = new TableDataProvider(this.model.source, this.model.view)
        const options = {
            data: this.tableData(),
            columns: this.tableColumns(),
            onbeforechange: this.onChange(this),
        }
        this.table = jexcel(this.el, options)
    }

    updateGrid(): void {
        this.table.setData(this.tableData())
    }

    updateSelection() {

    }

    tableData(): Item[] {
        return range(0, this.data.getLength()).map((i) => {
            const item: Item = {}
            for (const field of keys(this.data.source.data)) {
                item[field] = this.data.source.data[field][this.data.index[i]]
            }
            return item
        })
    }

    tableColumns(): any[] {
        return this.model.columns.map(
            tableColumn => {
                return {
                    title: tableColumn.title,
                    width: tableColumn.width,
                }
            },
        )
    }

    onChange(tableView: JexcelTableView) {
        return (_instance: any, _cell: any, x: number, y: number, value: string) => {
            const field = this.tableColumns()[x].title
            tableView.data.setField(y, field, value)
        }
    }
}

export namespace JexcelTable {
    export type Attrs = p.AttrsOf<Props>
    export type Props = DataTable.Props
}

export interface JexcelTable extends DataTable.Attrs {}

export class JexcelTable extends DataTable {
    properties: JexcelTable.Props

    constructor(attrs?: Partial<JexcelTable.Attrs>) {
        super(attrs)
    }

    static init_JexcelTable(): void {
        this.prototype.default_view = JexcelTableView
    }
}
