if (process.env.NODE_ENV === 'production') {
  module.exports = {
    domain: 'https://todo-api-pczh.onrender.com',
  };
} else {
  module.exports = {
    domain: 'http://localhost:3333',
  };
}
