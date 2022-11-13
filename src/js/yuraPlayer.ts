import axios from 'axios'
import dashjs from 'dashjs'
import SubtitleOctopus from '../static/subtitles-octopus'

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
    console.log(location.pathname)
    // if(location.pathname === '/') {
        const hentrys: { thumbnail: string, title: string, url: string }[] = (await axios.post('https://jolly-hall-c042.yurasu.workers.dev/0:/', {"q":"","password":null,"page_token":null,"page_index":0})).data.data.files.map(async function({mimeType, name}: {mimeType: string, name: string}) {
            if(mimeType === 'application/vnd.google-apps.folder') return {
                thumbnail: `/${name}/thumbnail.png`,
                title: name,
                url: `/${name}`
            }
        })
        const blogPosts = createElement('div', { class: 'blog-posts' })
        hentrys.forEach(function({ thumbnail, title, url }) {
            const hentry = createElement('article', { class: 'hentry' })
            const postThumbnail = createElement('div', { class: 'post-thumbnail' })
            const postContent = createElement('div', { class: 'post-content' })
            const a = createElement('a', { href: url })
            const img = createElement('img', { class: 'post-thumb', src: thumbnail })
            a.appendChild(img)
            postThumbnail.appendChild(a)
    
            const postHeadline = createElement('div', { class: 'post-headline' })
            const postTitle = createElement('h2', { class: 'post-title' })
            const aTitle = createElement('a', { href: url })
            aTitle.innerText = title
    
            postTitle.appendChild(aTitle)
            postHeadline.appendChild(postTitle)
            postContent.appendChild(postHeadline)
            hentry.appendChild(postThumbnail)
            hentry.appendChild(postContent)
            blogPosts.appendChild(hentry)
        })
        $('body')?.appendChild(blogPosts)
    // } else {
    //     const video = $('video')!
    //     dashjs.MediaPlayer().create().initialize(video, './streams/manifest.mpd', false)
    //     new SubtitleOctopus({
    //         video,
    //         subUrl: './subtitle.br',
    //         workerUrl: 'subtitles-octopus-worker.js',
    //         fonts: (await axios.post('./fonts', {"q":"","password":null,"page_token":null,"page_index":0})).data.data.files.map((font: {name: string}) => `./fonts/${font.name}`),
    //         lazyFileLoading: true,
    //         debug: true,
    //         renderMode: 'lossy'
    
    //     })
    // }
}

export default yuraPlayer