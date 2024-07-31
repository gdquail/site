// routes.ts

import Router from '@koa/router'
import { Next, ParameterizedContext } from 'koa'
import { z } from 'zod'
import { UserModel } from './models'
import { User, userZodSchema, State } from './types'
import { isParameterPropertyDeclaration } from 'typescript'
const bcrypt = require('bcrypt');

const router = new Router<State>()

export default router

router.get('/user/:nickname', async (ctx: ParameterizedContext<State>, next: Next) => {
    const paramparse = z.object({ nickname: z.string() }).safeParse(ctx.params)
    const bodyparse = userZodSchema.safeParse(ctx.request.body)
    ctx.assert(paramparse.success, 400)
    ctx.assert(bodyparse.data, 400)

    const found = await UserModel.findOne({ nickname: paramparse.data.nickname }).lean().exec()

    ctx.assert(found, 404)

    const validPassword = await bcrypt.compare(bodyparse.data.password, found.password);
    ctx.assert(validPassword, 400)

    ctx.status = 200
    ctx.body = found
    ctx.body = `${found.email}`
    await next()
})

router.post('/join', async (ctx: ParameterizedContext<State>, next: Next) => {
    const bodyparse = userZodSchema.safeParse(ctx.request.body)
    ctx.assert(bodyparse.success, 400)

    const found = await UserModel.findOne({ nickname: bodyparse.data.nickname }).lean().exec()
    ctx.assert(found === null, 409)

    bodyparse.data.password = await bcrypt.hash(bodyparse.data.password, 10);
    const model = new UserModel(bodyparse.data)
    await model.save()

    ctx.status = 201

    await next()
})

router.delete('/user/:nickname', async (ctx: ParameterizedContext<State>, next: Next) => {
    const paramparse = z.object({ nickname: z.string() }).safeParse(ctx.params)
    ctx.assert(paramparse.success, 400)
    const document = await UserModel.findOne({ nickname: paramparse.data.nickname }).exec()
    ctx.assert(document, 404)

    await document.deleteOne()

    ctx.status = 200 // maybe 204

    await next()
})

router.patch('/user/:nickname', async (ctx: ParameterizedContext<State>, next: Next) => {
    const paramparse = z.object({ nickname: z.string() }).safeParse(ctx.params)
    ctx.assert(paramparse.success, 400)
    const bodyparse = z.object({ password: z.string(), email: z.string() }).safeParse(ctx.request.body)
    ctx.assert(bodyparse.success, 400)

    const document = await UserModel.findOne({ nickname: paramparse.data.nickname }).exec()
    ctx.assert(document, 404)

    await document.updateOne({
    ...paramparse.data,
    ...bodyparse.data
    })

    ctx.status = 200 // maybe 204

    await next()
})  