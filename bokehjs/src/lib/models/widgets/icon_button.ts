import {ControlView} from "./control"
import {build_view} from "../.."
import {ButtonClick} from "../../core/bokeh_events"
import * as p from "./../../core/properties"
import {button, prepend} from "../../core/dom"
import {Button} from "./button"
import {AbstractIconView} from "./abstract_icon"
import {bk_btn, bk_btn_type} from "../../styles/buttons"

export class IconButtonView extends ControlView {
    model: IconButton

    protected icon_view?: AbstractIconView

    protected button_el: HTMLButtonElement
    protected group_el: HTMLElement

    async lazy_initialize(): Promise<void> {
        await super.lazy_initialize()
        const {icon} = this.model
        if (icon != null) {
            this.icon_view = await build_view(icon, {parent: this})
        }
    }

    connect_signals(): void {
        super.connect_signals()
        this.connect(this.model.change, () => this.render());
    }

    _render_button(...children: (string | HTMLElement)[]): HTMLButtonElement {
        return button({
            type: "button",
            disabled: this.model.disabled,
            class: [bk_btn, bk_btn_type(this.model.button_type)],
        }, ...children)
    }

    render() {
        super.render()
        this.button_el = this._render_button()
        this.button_el.addEventListener("click", () => this.click())
        if (this.icon_view != null) {
            prepend(this.button_el, this.icon_view.el)
            this.icon_view.render()
        }
        this.el.appendChild(this.button_el);
    }
    click() {
        this.model.clicks = this.model.clicks + 1;
        this.model.trigger_event(new ButtonClick());
    }
}

export namespace IconButton {
    export type Attrs = p.AttrsOf<Props>

    export type Props = Button.Props & {
        component: p.Property<string>
    }
}

export interface IconButton extends IconButton.Attrs {}

export class IconButton extends Button {
    properties: IconButton.Props

    constructor(attrs?: Partial<IconButton.Attrs>) {
        super(attrs)
    }

    static init_IconButton(): void {
        this.prototype.default_view = IconButtonView

        this.define<IconButton.Props>({
            component: [p.String, "icon-button"],
        })
    }
}