exports.handler = (context, event, callback) => {
  const TWILIO_ACCOUNT_SID = context.TWILIO_ACCOUNT_SID
  const TWILIO_API_KEY = context.TWILIO_API_KEY
  const TWILIO_API_SECRET = context.TWILIO_API_SECRET

  const AccessToken = Twilio.jwt.AccessToken
  const VideoGrant = AccessToken.VideoGrant

  const accessToken = new AccessToken(
    TWILIO_ACCOUNT_SID,
    TWILIO_API_KEY,
    TWILIO_API_SECRET
  )

  accessToken.identity = event.identity

  const videoGrant = new VideoGrant()
  videoGrant.room = event.room
  accessToken.addGrant(videoGrant)

  let response = new Twilio.Response()
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
  response.setHeaders(headers)
  response.setBody(accessToken.toJwt())
  callback(null, response)
}
