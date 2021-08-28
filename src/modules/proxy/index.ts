import type { FastifyPluginCallback, RequestGenericInterface } from 'fastify'

import fetch from 'isomorphic-unfetch'

interface Hint extends RequestGenericInterface {
    Params: {
        hint: string
    }
}

const proxy: FastifyPluginCallback = (app, _, done) => {
    app.get<Hint>('/hint/:hint', async (req, res) => {
        const response = await fetch(
            `http://clients1.google.com/complete/search?hl=en&client=firefox&output=toolbar&q=${encodeURI(
                req.params.hint
            )}`
        ).then(res => res.json())

        res.send(response[1] || [])
    })

    done()
}

export default proxy
