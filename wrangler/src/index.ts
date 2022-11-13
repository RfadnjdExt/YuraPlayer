export default {
    async fetch(request: Request) {
        console.log(request.constructor.name)
        return new Response('Hello World!')
    }
}