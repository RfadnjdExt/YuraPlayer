type DOMSelector = keyof HTMLElementTagNameMap | 'div#player' | 'ysf-player'
type Attributes = string | 'class' | 'controls'
type Class = 'video-stream'
type AttributesObject = {
    [key in Attributes]?: Class | ''
}