import axios from 'axios'
import dashjs from 'dashjs'

interface Attributes {
    [key: string]: string
}
const $ = (selector: string) => document.querySelector(selector)
const createElement = (tagName: string, attributesObject?: Attributes) => {
    const el = document.createElement(tagName)
    if(attributesObject) {
        Object.keys(attributesObject).forEach((value) => {
            el.setAttribute(value, attributesObject[value]!)
        })
    }
    return el
}

const yuraPlayer = async() => {
    dashjs.MediaPlayer().create().initialize($('video')!)
}

export default yuraPlayer