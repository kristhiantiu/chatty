const generateMessage = (text) => {
  return {
    text,
    createdAt: new Date().getTime()
  }
}

const generateLocationMessage = (url) => {
  return {
    url,

  }
}

module.exports = {
  generateMessage,
  generateLocationMessage,
}