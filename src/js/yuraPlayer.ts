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
    if(location.pathname === '/') {
        const hentrys = [
            {
                "thumbnail": "1l6JrGFOzO-fZbDp4b0qFfapJ-n3OTMw1",
                "title": "Kusonime_Samurai_Flamenco_BD_Ep02",
                "url": "1gkgtBadocBXrraNH2rkOMsko9YHeujmp"
            },
            {
                "thumbnail": "1---YahzsXdFJGzmgo68G-0VQMGisusg9",
                "title": "Kusonime_Samurai_Flamenco_BD_Ep04",
                "url": "1jbY5H4iVihuvktrX998vM4j9SSvta3FL"
            },
            {
                "thumbnail": "1-0pnvF-U_ThubUX9pp7YNXaBBF_RJqnd",
                "title": "Kusonime_Samurai_Flamenco_BD_Ep01",
                "url": "1mC_vemPMzGi412Y3ws-cUGANkHr0Gglg"
            },
            {
                "thumbnail": "1-3NgkfzevY6kHZsYp9h7yv70FC1BXATT",
                "title": "Kusonime_Samurai_Flamenco_BD_Ep05",
                "url": "1p8KKyGjgTpdVdbKfLHc6SbFgchILUnFm"
            },
            {
                "thumbnail": "1-7J1qfP5s64pVpFny96QuZJjo8pTEfzK",
                "title": "Kusonime_Samurai_Flamenco_BD_Ep03",
                "url": "1reEb7caPjW8gf1SYeIShdzZ0eRM7Ijhf"
            },
            {
                "thumbnail": "1-79rSQ1VoOtp2HXDTAL0JScIyZdLGHfx",
                "title": "Kusonime_Samurai_Flamenco_BD_Ep06",
                "url": "1uocXkzM_qZA5mBeXd28JPOy4f1Ru6ZJB"
            },
            {
                "thumbnail": "1-HH9xutMXbqWkVVrwpZKIM9ZZHFws1g_",
                "title": "Kusonime_Samurai_Flamenco_BD_Ep07",
                "url": "1wpoj1-O_CMA1CjPX1C-t7gtuZNo5JP22"
            },
            {
                "thumbnail": "1-ILzua74yCGTMuT9TSvvWlL09Dm1kbhr",
                "title": "Kusonime_Samurai_Flamenco_BD_Ep09",
                "url": "1ziCZioP1dATk4DL8Bp5CZMSAm-S0Uj5p"
            },
            {
                "thumbnail": "1-J35QsSW8bt_Qh8PwvYN3N4WCio7edJO",
                "title": "Kusonime_Samurai_Flamenco_BD_Ep08",
                "url": "10-hAp5aFih0HoqzLE0ahPPw9ZyTLgDNG"
            },
            {
                "thumbnail": "1-NkeTXOKEoN_Ej-on1kXnHde7z59mlLx",
                "title": "Kusonime_Samurai_Flamenco_BD_Ep10",
                "url": "11OobFb2E2Qx4LdxJJWsScQrkr1YW1QX5"
            },
            {
                "thumbnail": "1-SPaSlc0XKhB-ggcwqR2z0NYiqMPolip",
                "title": "Kusonime_Samurai_Flamenco_BD_Ep11",
                "url": "131UcwYKMUhWzvgkteCoBxjmzT1Var7Xr"
            },
            {
                "thumbnail": "1-Skk97pDoc5ydKJfvAVWn0BlnF2coSrU",
                "title": "Kusonime_Samurai_Flamenco_BD_Ep13",
                "url": "148E1BiVPUTrfZVlUG5Pb2apuWJ4bAbox"
            },
            {
                "thumbnail": "1-Vnd3m-PR-jPRNyljPQAB_aY8soE2VFt",
                "title": "Kusonime_Samurai_Flamenco_BD_Ep12",
                "url": "154ekKgKZhj1qCscNvL4vJNg6eJF5z7fR"
            },
            {
                "thumbnail": "1-_jvTTTb4YtT8SP3TMYWSEEajg5x-XAd",
                "title": "Kusonime_Samurai_Flamenco_BD_Ep14",
                "url": "16LZaDTKLnP4ToJ5OnMDnQ6ttM4kFMUM4"
            },
            {
                "thumbnail": "1-fwnTpFnMt3BkgcNbvHeqUCwXl9gOMq0",
                "title": "Kusonime_Samurai_Flamenco_BD_Ep15",
                "url": "17XoRjAWUXGAcItjmVMB7ancM9mKGp3LV"
            },
            {
                "thumbnail": "1-g6BF5tivKXOvXUGpgP8IeWE25-n-cxq",
                "title": "Kusonime_Samurai_Flamenco_BD_Ep16",
                "url": "18ekStdOBjkWQYKPz3Ga20m729Si5-Opb"
            },
            {
                "thumbnail": "1-gX56_UIevtxnluKpRKJFitL-K9R7CW2",
                "title": "Kusonime_Samurai_Flamenco_BD_Ep17",
                "url": "19uCBGcT2ntTFpRtdZyLjwr4oYnm6iB8U"
            },
            {
                "thumbnail": "1-maHN3Xjehi5X1RctM0ZAeByYwJLmonU",
                "title": "Kusonime_Samurai_Flamenco_BD_Ep18",
                "url": "1Aoq9hET7e64q6QSA-V0uQS-oYy0JW1x4"
            },
            {
                "thumbnail": "1-zNqlIB78BSc7fih00N4NK-f2MHx9j9k",
                "title": "Kusonime_Samurai_Flamenco_BD_Ep19",
                "url": "1BztDTBLpgHqxZ6SHdumlfobwTPzxyYl7"
            },
            {
                "thumbnail": "104_-caN2HAEK1cXLVSfyB0dgGJAs5O21",
                "title": "Kusonime_Samurai_Flamenco_BD_Ep20",
                "url": "1CprNbZxz_P-_ZhFytFVadwWHuyPGOHIY"
            },
            {
                "thumbnail": "104zgxETkJNHK6AKjRVO9hf7uDWyzmDNU",
                "title": "Kusonime_Samurai_Flamenco_BD_Ep22_END",
                "url": "1E6bWKh-fRYigiuhdUNnfU7-wSqBgF0Vx"
            },
            {
                "thumbnail": "108c75uVztAnJdPMmw-BvV5Fd4VseaSy-",
                "title": "Kusonime_Samurai_Flamenco_BD_Ep21",
                "url": "1EtMxfrHTuVSofFbjPhrRzr-RjknqciCJ"
            }
        ]
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
    } else {
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
}

export default yuraPlayer