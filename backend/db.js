const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://imdperfect10:NA4MDlGp4AXNzF9z@cluster0.9ndabzj.mongodb.net/NewsNexus?retryWrites=true&w=majority';

module.exports = async function () {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log("Connected to MongoDB");
    
    const genCollection = mongoose.connection.db.collection("NewsItems");
    const gen = await genCollection.find({}).toArray();
    
    const sportsCollection = mongoose.connection.db.collection("SportsNews");
    const sports = await sportsCollection.find({}).toArray();

    const businessCollection = mongoose.connection.db.collection("businessNews");
    const business = await businessCollection.find({}).toArray();

    const entertainmentCollection = mongoose.connection.db.collection("entertainmentNews");
    const entertainment = await entertainmentCollection.find({}).toArray();

    const healthCollection = mongoose.connection.db.collection("healthNews");
    const health = await healthCollection.find({}).toArray();
    
    const scienceCollection = mongoose.connection.db.collection("scienceNews");
    const science = await scienceCollection.find({}).toArray();

    
    return { gen,business,entertainment,sports,health,science };
  } catch (err) {
    console.error("---" + err);
    return { gen: null, business: null };
  }
};
