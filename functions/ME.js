const axios = require("axios");
const moment = require("moment");
const rwClient = require("../twitterClient")
const fs = require("fs");
const request = require("request");
const EUploadMimeType = require("twitter-api-v2/dist/types/v1");

const download = (uri, filename, callback) => {
  request.head(uri, (err, res, body) => {
    // console.log('content-type:', res.headers['content-type']);
    // console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};
const tweet = (result) => {
  const content = "🤖 " + result.name + " SOLD for " + result.price + " SOL on Magic Eden" +
    "\n\n→ https://magiceden.io/item-details/ETqyATxqaaQYhSMJBsyQieyuA5TeidR3k5mDQqmWUqA📝\n\n"
    + "👉 @bonfida"
  let mediaId;
  const imgName = "./images/" + result.name + ".png";
  download(result.image, "./images/" + result.name + ".png", async () => {
    mediaId = await rwClient.v1.uploadMedia(imgName, { mimeType: EUploadMimeType.Png });
    await rwClient.v1.tweet(content, { media_ids: mediaId })
    console.log("done")
    try {
      fs.unlinkSync(imgName);
      console.log("File removed:", imgName);
    } catch (err) {
      console.error(err);
    }
  })
}
const BASE_URL = "https://api-mainnet.magiceden.dev/v2/";
exports.getActivities = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ body: 'Body must not be empty' });
  }
  const numberOfActivities = req.body.activityNumber;
  //get bonfida sns collection's activities
  const { data: activities } = await axios.get(BASE_URL + "collections/bonfida/activities?offset=0&limit=" + numberOfActivities)
  //console.log("activities", activities)
  // filter with activity type;
  if (activities) {
    const buyNow = activities.filter(a => a.type === "buyNow" | "asd");
    const list = activities.filter(a => a.type === "list");
    const delist = activities.filter(a => a.type === "delist");
    const result = {
      buyNow,
      list,
      delist
    }
    const results = [];
    if (buyNow.length > 0) {
      await Promise.all(
        buyNow.map(async (activity) => {
          const { data: tokenInfo } = await axios.get(BASE_URL + "tokens/" + activity.tokenMint)
          const buyTime = moment(activity.blockTime * 1000).format('L');
          if (tokenInfo?.name) {
            results.push({
              buyTime,
              buyer: activity.buyer,
              seller: activity.seller,
              price: activity.price,
              image: activity.image,
              price: activity.price,
              name: tokenInfo.name + ".sol",
            })
          }
        })

      )
    }
    // results.forEach(r => {
    //   tweet(r)
    // })
    tweet(results[0])

    return res.status(200).json({ done: "done" });
  }
  return res.status(400).json({ error: "error" });
}

