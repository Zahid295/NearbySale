const mongoose = require('mongoose');
mongoose.connect('<your-mongodb-connection-string>', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));