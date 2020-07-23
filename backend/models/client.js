const mongoose = require('mongoose');
const clientSchema = new mongoose.Schema({
  userId: {
      type:String,
      unqiue:true,
      required: true
    },
  username: {
    type: String,
    required:true
  },
});
module.exports=mongoose.model('Client', clientSchema);