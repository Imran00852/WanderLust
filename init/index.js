const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");
const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust';

main()
.then(()=>{
  console.log("connected to db");
})
.catch((err)=>{
  console.log(err);
});
async function main(){
  mongoose.connect(MONGO_URL);
}

const initDb=async ()=>{
  await Listing.deleteMany({});
  initData.data=initData.data.map((obj)=>({...obj,owner:"660ef6425fc07ca6a6444fec"}));
  await Listing.insertMany(initData.data);
}

initDb();