const { TwitterApi } = require("twitter-api-v2");

const client = new TwitterApi({
  appKey: "n6s04bcsw6T9c8BZo4sz9bV3v",
  appSecret: "QjKLOrq7wKjlNEHRktX1zcn6bO6cbLQWKqyoukOG2bVnbRLsIy",
  accessToken: "1526029433974693888-O7zffNbwaV5IYV6uXAVMBC0XhkgBwQ",
  accessSecret: "OH12ulVJeZZ3SNWyacx5PsQX7ifSG2hPhuURQ60zHlUot"
})

const reClient = client.readWrite

module.exports = reClient