const { Router } = require("express")
const Post = require('../db/postModel')
const router = Router()

router.post("/post", async (request, response) => {
    const post = new Post(request.body)
    try {
        await post.save
        response.send(post)
    } catch (e) {
        response.status(500).send(e)
    }
})

router.get("/posts", async (request, response) => {
    try {
        const posts = await Post.find({})
        response.send(posts)
    } catch (e) {
        response.status(500).send({ error: e })
    }
})

router.get("/post/:slug", async (request, response) => {
    try {
        const post = await Post.findOne({ slug: request.params.slug })
        response.send(post)
    } catch (e) {
        response.status(500).send({ error: e })
    }
})

router.patch("/post/:slug", async (request, response) => {
    try {
        const post = await Post.findByIdAndUpdate(request.params.slug, request.body)
        await post.save()
        response.send(post)
    } catch (e) {
        response.status(500).send({ error: e })
    }
})

router.delete("/post/:slug", async (request, response) => {
    try {
        const post = await Post.findByIdAndDelete(request.params.slug)
        if (!post) {
            response.status(404).send("Post wasn't found")
        }
        response.status(204).send()
    } catch (e) {
        response.status(500).send({ error: e })
    }
})

module.exports = router