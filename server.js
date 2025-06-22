import express from 'express';
import mongoose from 'mongoose';
import { shortUrl,getOriginalUrl } from './Controllers/url.js';
import { config } from 'dotenv';


const app = express();

config({patg:'.env'})
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI 
  ,
  {
  dbName:"nodejs_mastery_course"
  }
 ).then(() => console.log("MongoDB connected")).catch((err) => console.log("MongoDB connection error:", err));

 // rendering the ejs file
app.get('/', (req, res) => {
  res.render("index.ejs",{shortUrl:null});
});

//shortning url logic
app.post('/short', shortUrl);

// dynamic route redirect to original url using short code;

app.get('/:shortCode',getOriginalUrl)

const port = process.env.PORT;

app.listen(port,()=>console.log(`Server is running on port ${port}`));