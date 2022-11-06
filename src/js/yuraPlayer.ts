import axios from 'axios'
import dashjs from 'dashjs'
const $ = (selector: DOMSelector) => document.querySelector(selector)
const createElement = (tagName: DOMSelector, attributesObject?: AttributesObject) => {
    const el = document.createElement(tagName)
    if(attributesObject) {
        Object.keys(attributesObject).forEach((value) => {
            el.setAttribute(value, attributesObject[value]!)
        })
    }
    return el
}

const yuraPlayer = async() => {

    const playerContainerOuter = createElement('div')
    const playerContainerInner = createElement('div')
    const playerContainer = createElement('div')
    const ysfPlayer = createElement('ysf-player')
    const container = createElement('div')
    const html5VideoPlayer = createElement('div')
    const html5VideoContainer = createElement('div')
    const videoStream = createElement('video', { class: 'video-stream', controls: '' })

    videoStream.style.left = '0px'
    videoStream.style.top = '0px'

    
    const resize = () => {
        videoStream.style.width = `${window.innerWidth}px`
        videoStream.style.height = `${window.innerHeight}px`
    }

    // const player = dashjs.MediaPlayer().create()
    // const url = 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd'
    // const startTime = 0
    // player.initialize(videoStream, url, true, startTime)

    videoStream.setAttribute('src', 'https://jolly-hall-c042.yurasu.workers.dev/?id=1-5UH-KmvkcQ8OcTdCVdtFhaLNdnHHFw7')
    resize()
    new ResizeObserver(resize).observe(document.body)

    const yrpGradientBottom = createElement('div')
    yrpGradientBottom.style.backgroundImage = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAACSCAYAAACE56BkAAAAAXNSR0IArs4c6QAAAPVJREFUKFNlyOlHGAAcxvHuY93H1n1fW1v3fbej+zAmI5PIRGYiM5JEEkkiiSSRRPoj83nze9Pz4uPrSUh4tURPEpKDFJWKtCBdZSAzeKOykB3kqFzkBfmqAIVBkSrGW7wLSlQpyoJyVYHKoEpVoyaoVXWoDxpUI5qCZtWC98EH1YqPwSfVhvagQ3WiK+hWPegN+lQ/BoJBNYRhjASjagzjwYSaxOfgi/qKb8GUmsZMMKvmMB8sqEUsYRnf8QMr+IlV/MIa1rGB39jEFv7gL7axg3/4j13sYR8HOMQRjnGCU5zhHBe4xBWucYNb3OEeD3jEE55fAOe7I9q0+rDDAAAAAElFTkSuQmCC")'

    html5VideoContainer.appendChild(videoStream)
    html5VideoContainer.appendChild(yrpGradientBottom)
    html5VideoPlayer.appendChild(html5VideoContainer)
    container.appendChild(html5VideoPlayer)
    ysfPlayer.appendChild(container)
    playerContainer.appendChild(ysfPlayer)
    playerContainerInner.appendChild(playerContainer)
    playerContainerOuter.appendChild(playerContainerInner)
    $('div#player')?.appendChild(playerContainerOuter)
    
}

export default yuraPlayer