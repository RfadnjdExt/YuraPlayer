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
    const responseDate = response.headers.get('date')
    const jsonData: { access_token: string, expires_in: number, token_type: string } = await response.json()
    if(!responseDate) throw Error()
    globalData.expired = new Date(responseDate).getTime() + (jsonData.expires_in * 1000)
    globalData.access_token = `${jsonData.token_type} ${jsonData.access_token}`
    console.log(globalData)
}

export default {
    async fetch(request: Request, env: ENV) {
        // const url = new URL(request.url)
        // if(url.pathname !== '/') return new Response('', { status: 404 })
        // if(!globalData.expired || globalData.expired < new Date().getTime()) await updateAccessToken(env)
        // const response = await fetch('https://www.googleapis.com/drive/v3/files?' + new URLSearchParams({
        //     corpora: 'drive',
        //     driveId: '0AKOrYgWhtV5YUk9PVA',
        //     includeItemsFromAllDrives: 'true',
        //     orderBy: 'name',
        //     pageSize: '46',
        //     q: '"0AKOrYgWhtV5YUk9PVA" in parents and trashed = false',
        //     supportsAllDrives: 'true'
        // }), {
        //     headers: {
        //         Authorization: globalData.access_token
        //     }
        // })
        // const responseData = await response.text()
        // return new Response(responseData, { headers: { 'content-type': response.headers.get('content-type')! } })
    }
}