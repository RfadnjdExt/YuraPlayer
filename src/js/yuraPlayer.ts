// import axios from 'axios'
// import dashjs from 
// import SubtitleOctopus from 

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
    if(location.pathname === '/') {
        const blogPosts = createElement('div', { class: 'blog-posts' })
        const response = await fetch('/0:/', {
            body: JSON.stringify({
                page_index: ''
            }),
            method: 'POST'
        })
        const responseData: { data: { files: { mimeType: string, name: string }[] } } = await response.json()
        responseData.data.files.forEach(async function({ mimeType, name }) {
            if(mimeType !== 'application/vnd.google-apps.folder' || name === 'assets') return
            const hentry = createElement('article', { class: 'hentry' })
            const postThumbnail = createElement('div', { class: 'post-thumbnail' })
            const postContent = createElement('div', { class: 'post-content' })
            const a = createElement('a', { href: `/${name}` })
            const img = createElement('img', { class: 'post-thumb', src: `/0:/${encodeURIComponent(name)}/thumbnail.jpg` })
            a.appendChild(img)
            postThumbnail.appendChild(a)
            const postHeadline = createElement('div', { class: 'post-headline' })
            const postTitle = createElement('h2', { class: 'post-title' })
            const aTitle = createElement('a', { href: `/${name}` })
            aTitle.innerText = name
            postTitle.appendChild(aTitle)
            postHeadline.appendChild(postTitle)
            postContent.appendChild(postHeadline)
            hentry.appendChild(postThumbnail)
            hentry.appendChild(postContent)
            blogPosts.appendChild(hentry)
        })
        document.body.appendChild(blogPosts)
    } else {
        const video = createElement('video', { controls: '' })
        if(!video) throw Error()
        import('dashjs').then(function({ default: dashjs }) {
            dashjs.MediaPlayer().create().initialize(video, `/0:/${decodeURIComponent(location.pathname.slice(1))}/streams/manifest.mpd`, false)
        })
        
        import('../static/subtitles-octopus').then(async function({ default: SubtitleOctopus }) {
            new SubtitleOctopus({
                debug: true,
                fonts: ((await (await fetch(`/0:/${decodeURIComponent(location.pathname.slice(1))}/fonts/`, {
                    body: JSON.stringify({
                        page_index: ''
                    }),
                    method: 'POST'
                })).json()) as { data: { files: { mimeType: string, name: string }[] } }).data.files.map(function({ name }) {
                    return `/0:/${decodeURIComponent(location.pathname.slice(1))}/fonts/${name}`
                }),
                lazyFileLoading: true,
                renderMode: 'lossy',
                subUrl: `/0:/${decodeURIComponent(location.pathname.slice(1))}/subtitle.br`,
                video: video,
                workerUrl: '/0:/assets/subtitles-octopus-worker.js'
            } as {
                debug: boolean,
                fonts: string[],
                lazyFileLoading: boolean,
                renderMode: string,
                subUrl: string,
                video: Element,
                workerUrl: string
            })
        })
        document.body.appendChild(video)
    }
    // console.log(location.pathname)
    // if(location.pathname === '/') {
    //     const hentrys: { thumbnail: string, title: string, url: string }[] = (await axios.post('/0:/', {"q":"","password":null,"page_token":null,"page_index":0})).data.data.files.map(async function({mimeType, name}: {mimeType: string, name: string}) {
    //         if(mimeType === 'application/vnd.google-apps.folder') return {
    //             thumbnail: `/${name}/thumbnail.png`,
    //             title: name,
    //             url: `/${name}`
    //         }
    //     })
        // const blogPosts = createElement('div', { class: 'blog-posts' })
    //     hentrys.forEach(function({ thumbnail, title, url }) {
            // const hentry = createElement('article', { class: 'hentry' })
            // const postThumbnail = createElement('div', { class: 'post-thumbnail' })
            // const postContent = createElement('div', { class: 'post-content' })
            // const a = createElement('a', { href: url })
            // const img = createElement('img', { class: 'post-thumb', src: thumbnail })
            // a.appendChild(img)
            // postThumbnail.appendChild(a)
    
            // const postHeadline = createElement('div', { class: 'post-headline' })
            // const postTitle = createElement('h2', { class: 'post-title' })
            // const aTitle = createElement('a', { href: url })
            // aTitle.innerText = title
    
            // postTitle.appendChild(aTitle)
            // postHeadline.appendChild(postTitle)
            // postContent.appendChild(postHeadline)
            // hentry.appendChild(postThumbnail)
            // hentry.appendChild(postContent)
            // blogPosts.appendChild(hentry)
    //     })
    //     $('body')?.appendChild(blogPosts)
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