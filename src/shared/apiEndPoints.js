if (process.env.NODE_ENV == 'production') {
  module.exports = {
    domain: 'https://todo-rails5-api.herokuapp.com',
  };
} else {
  module.exports = {
    domain: 'http://localhost:3333',
  };
}
