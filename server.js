import express from 'express';
import mongoose from 'mongoose';
import { shortUrl,getOriginalUrl } from './Controllers/url.js';

const app = express();

app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://sonukumar763303:KHdQV4rCBV145FoD@cluster0.fxpv0sh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
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

const PORT = 12000;

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));