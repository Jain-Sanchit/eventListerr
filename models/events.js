const mongoose=require('mongoose')

const eventSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: { type: String, required: true },
  venue: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventTime: { type: String, required: true },
  description: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now
  },
  listedUser:{
      type:String
  }
});

const Event=mongoose.model('Event',eventSchema);

module.exports=Event;