interface ExecutionContext {}

interface AuthConfig {
    accessToken: string,
    enable_cors_file_down: true,
    expires: number
}

interface Env {
    CLIENT_ID: string
    CLIENT_SECRET: string
    REFRESH_TOKEN: string
}

const authConfig = {} as AuthConfig

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext) {
        if(authConfig.expires == undefined || authConfig.expires < Date.now()) {
            const post_data = {
                client_id: env.CLIENT_ID,
                client_secret: env.CLIENT_SECRET,
                refresh_token: env.REFRESH_TOKEN,
                grant_type: "refresh_token"
            }
            const ret = [] as string[]
            for(let d in post_data) {
                ret.push(`${encodeURIComponent(d)}=${encodeURIComponent(post_data[d])}`)
                
            }
            const response = await fetch('https://www.googleapis.com/oauth2/v4/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: ret.join('&')
            })
            const obj = await response.json()

            if(obj.access_token != undefined) {
                authConfig.accessToken = obj.access_token
                authConfig.expires = Date.now() + 3500 * 1000
            }
        }
        let res = await fetch(`https://www.googleapis.com/drive/v3/files/${new URL(request.url).searchParams.get('id')}?alt=media`, {
            headers: {
                'Authorization': `Bearer ${authConfig.accessToken}`
            },
            method: 'GET'
        })
        const { headers } = (res = new Response(res.body, res))
        authConfig.enable_cors_file_down && headers.append('Access-Control-Allow-Origin', '*')
        headers.set('Content-Disposition', 'inline')
        return res
    }
}