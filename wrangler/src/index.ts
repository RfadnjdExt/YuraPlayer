interface ENV {
    CLIENT_SECRET: string
    REFRESH_TOKEN: string
    CLIENT_ID: string
}

const globalData = {} as { access_token: string, expired: number }

async function updateAccessToken(env: ENV) {
    const response = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', body: JSON.stringify({
        client_id: env.CLIENT_ID,
        client_secret: env.CLIENT_SECRET,
        refresh_token: env.REFRESH_TOKEN,
        grant_type: 'refresh_token'
    })})
    const responseDate = response.headers.get('Date')
    const jsonData: { access_token: string, expires_in: number, token_type: string } = await response.json()
    if(!responseDate) throw Error()
    globalData.expired = new Date(responseDate).getTime() + (jsonData.expires_in * 1000)
    globalData.access_token = `${jsonData.token_type} ${jsonData.access_token}`
}

async function getFile(fileID: string) {
    const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileID}?` + new URLSearchParams({
        alt: 'media',
        supportsAllDrives: 'true'
    }), {
        headers: {
            'Authorization': globalData.access_token
        }
    })
    return new Response(response.body)
}

export default {
    async fetch(request: Request, env: ENV) {
        const url = new URL(request.url)
        if(!globalData.expired || globalData.expired < new Date().getTime()) await updateAccessToken(env)
        if(url.pathname === '/') return new Response(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <script src="script.js"></script>
        </body>
        </html>`, {
            headers: {
                'Content-Type': 'text/html'
            }
        })
        if(url.pathname === '/script.js') return await getFile('1Aa_poscRcW2KQFH_OUXbUpG-Cg7knDE7')
        if(url.pathname === '/favicon.ico') return new Response((await fetch('https://www.yurasu.xyz/favicon.ico')).body)
        return await getFile(url.pathname.slice(1))
        // const response = await fetch('https://www.googleapis.com/drive/v3/files?' + new URLSearchParams({
        //     corpora: 'drive',
        //     driveId: '0AKOrYgWhtV5YUk9PVA',
        //     includeItemsFromAllDrives: 'true',
        //     orderBy: 'name',
        //     q: '"0AKOrYgWhtV5YUk9PVA" in parents and trashed = false and name = "Kusonime - Download Anime Batch Subtitle Indonesia Komplit (Ceritanya).url"',
        //     supportsAllDrives: 'true'
        // }), {
        //     headers: {
        //         Authorization: globalData.access_token
        //     }
        // })
        // console.log((await response.text()))
        // return response
        // return await getFile(url.pathname.slice(1))
    }
}