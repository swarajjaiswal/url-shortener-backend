const shortid = require('shortid');
const Url = require('../models/url');

async function generateShortUrl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: "Please provide a URL" });
    }
    const shortId = shortid(); // Generates the short ID
    await Url.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
    });
    return res.render("home", { id: shortId });
}


async function getShortUrl(req, res) {
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        },
    );
    res.redirect(entry.redirectUrl);
}

module.exports = { generateShortUrl, getShortUrl };
