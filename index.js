const express = require("express");
const cors = require('cors');
const fs = require('fs');
const server = require('./admin/server.json')

app = express();
const PORT = server.port

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(cors({
   origin: "*"
}));

app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));

const FRAMES_DIR = `.\\frames`
if (!fs.existsSync(FRAMES_DIR)) {
   console.log("adding frames dir", FRAMES_DIR)
   fs.mkdirSync(FRAMES_DIR);
}

app.post("/new_video", (req, res) => {
   const video_id = req.query.video_id
   const video_dir  = `${FRAMES_DIR}\\${video_id}`
   fs.mkdirSync(video_dir);
   return res.json({result: `created dir ${video_dir}`})
});