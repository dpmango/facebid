exports.twitter = (req, res) => {
  const io = req.app.get('io')
  const user = {
    name: req.user.username,
    photo: req.user.photos[0].value.replace(/_normal/, '')
  }
  io.in(req.session.socketId).emit('twitter', user)
  res.end()
}

exports.facebook = (req, res) => {
  const io = req.app.get('io')
  const { givenName, familyName } = req.user.name
  const user = {
    name: `${givenName} ${familyName}`,
    photo: req.user.photos[0].value
  }
  io.in(req.session.socketId).emit('facebook', user)
  res.end()
}
