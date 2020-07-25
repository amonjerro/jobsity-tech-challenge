const trae = require('trae')

const get = async (url, q) => {
    let results = await trae.get(url, {params: q})
    return results
}

const post = async (url, body) => {
    let results = await trae.post(url, body)
    return results
}

module.exports = {
    get, post
}