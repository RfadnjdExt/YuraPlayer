import dashjs from 'dashjs'
const $ = (selector: DOMSelector) => document.querySelector(selector)
const createElement = (tagName: DOMSelector) => document.createElement(tagName)

const yuraPlayer = () => {
    const videoStream = createElement('video')
    const html5VideoContainer = createElement('div')
    const html5VideoPlayer = createElement('div')
    const container = createElement('div')
    const ysfPlayer = createElement('ysf-player')
    const playerContainer = createElement('div')
    const playerContainerInner = createElement('div')
    const playerContainerOuter = createElement('div')


    


    html5VideoContainer.appendChild(videoStream)
    html5VideoPlayer.appendChild(html5VideoContainer)
    container.appendChild(html5VideoPlayer)
    ysfPlayer.appendChild(container)
    playerContainer.appendChild(ysfPlayer)
    playerContainerInner.appendChild(playerContainer)
    playerContainerOuter.appendChild(playerContainerInner)
    $('div#player')?.appendChild(playerContainerOuter)
    
}

export default yuraPlayer