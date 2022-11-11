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
    const player = $('#player')!
    player.setAttribute('class', 'ytd-watch-flexy')
    const cinematics = createElement('div', { id: 'cinematics', class: 'ytd-watch-flexy'})
    const playercontainerouter = createElement('div', { id: 'player-container-outer', class: 'ytd-watch-flexy'})
    const playercontainerinner = createElement('div', { id: 'player-container-inner', class: 'ytd-watch-flexy'})
    playercontainerouter.appendChild(playercontainerinner)
    player.appendChild(cinematics)
    player.appendChild(playercontainerouter)
}

export default yuraPlayer