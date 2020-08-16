import * as p from "./../../core/properties"
import {AbstractIcon, AbstractIconView} from "./abstract_icon"

export class FontAwesomeIconView extends AbstractIconView {
    model: FontAwesomeIcon

    initialize(): void {
        this.tagName = "span"
        super.initialize()
    }

    connect_signals(): void {
        super.connect_signals()
        this.connect(this.model.change, () => this.render())
    }

    render(): void {
        super.render()
        this.el.style.display = "inline"
        this.el.style.verticalAlign = "middle"
        this.el.style.fontSize = `${this.model.size}em`
        this.el.classList = []
        this.el.classList.add("fa")
        this.el.classList.add(`fa-${this.model.icon_name}`)

        if (this.model.flip != null)
            this.el.classList.add(`fa-flip-${this.model.flip}`)

        if (this.model.spin)
            this.el.classList.add("fa-spin")
    }
}

export namespace FontAwesomeIcon {
    export type Attrs = p.AttrsOf<Props>

    export type Props = AbstractIcon.Props & {
        icon_name: p.String,
        size: p.Number,
        flip: p.String,
        spin: p.Boolean
    }
}

export interface FontAwesomeIcon extends FontAwesomeIcon.Attrs {}

export class FontAwesomeIcon extends AbstractIcon {
    properties: FontAwesomeIcon.Props

    constructor(attrs?: Partial<FontAwesomeIcon.Attrs>) {
        super(attrs)
    }

    static init_FontAwesomeIcon(): void {
        this.prototype.default_view = FontAwesomeIconView

        this.define<FontAwesomeIcon.Props>({
            icon_name: [ p.String ],
            size: [ p.Number ],
            flip: [p.String],
            spin: [p.Boolean],
        })
    }
}
