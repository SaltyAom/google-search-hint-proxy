import fastify from 'fastify'

import helmet from 'fastify-helmet'
import compress from 'fastify-compress'
import staticPlugin from 'fastify-static'
import cors from 'fastify-cors'

import { resolve } from 'path'

import base from '@modules/base'
import proxy from '@modules/proxy'
import run from '@services/cluster'

const app = fastify()

const main = () => 
    app
        .register(helmet)
        .register(compress)
        .register(cors)
        .register(staticPlugin, {
            root: resolve('./public')
        })
        .register(base)
        .register(proxy)
        .listen(8080, '0.0.0.0', (error, address) => {
            if (error) return console.error(error)

            console.log(`Running at ${address}`)
        })

run(main)
