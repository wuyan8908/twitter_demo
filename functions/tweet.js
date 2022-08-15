const rwClient = require("../twitterClient")

exports.makeTweet = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ body: 'Body must not be empty' });
  }
  //default imgPath with string type.
  const imgId = await rwClient.v1.uploadMedia(req.body.imgPath)
  try {
    await rwClient.v1.tweet(req.body.tweetContent, { media_ids: imgId })
    res.status(200).json({ success: 'Tweet is already posted' })
  } catch (err) {
    res.status(500).json({ error: err.code })
  }
}
