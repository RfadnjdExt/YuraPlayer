import axios from 'axios'
import dashjs from 'dashjs'
import SubtitleOctopus from './subtitles-octopus'

interface Attributes {
    [key: string]: string
}
const $ = (selector: string): HTMLElement | null => document.querySelector(selector)
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
    const video = $('video')!
    dashjs.MediaPlayer().create().initialize(video, './streams/manifest.mpd', false)
    new SubtitleOctopus({
        video,
        subUrl: './subtitle.br',
        workerUrl: 'subtitles-octopus-worker.js',
        fonts: (await axios.post('./fonts', {"q":"","password":null,"page_token":null,"page_index":0})).data.data.files.map((font: {name: string}) => `./fonts/${font.name}`),
        lazyFileLoading: true,
        debug: true,
        renderMode: 'lossy'

    })
}

export default yuraPlayer