const { TwitterApi } = require("twitter-api-v2");

const client = new TwitterApi({
  appKey: "33K5dSR2TMfKGEAZzthaEzwqM",
  appSecret: "vtt2Lx5FOj7Qt58ADVVuCRVxtk30hUHAPcwhajMo4s1yWLYbU6",
  accessToken: "1560254489013420033-vjMuO3Ryz9rRA8992ZVaMzhHhYSMIR",
  accessSecret: "C8ZJUAXl0FN0QNviXX2Y1ZzWvVjIjcdTKxwfn6yZqtNAa"
})

const reClient = client.readWrite

module.exports = reClient