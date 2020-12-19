const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Admin:1019@cluster0.46erz.mongodb.net/8-ecommerce-app?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
