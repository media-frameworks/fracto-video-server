const express = require("express");
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const server = require('./admin/server.json')
const SEPARATOR = path.sep;

app = express();
const PORT = server.port

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(cors({
    origin: "*"
}));

app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));

const FRAMES_DIR = `.${SEPARATOR}frames`
if (!fs.existsSync(FRAMES_DIR)) {
    console.log("adding frames dir", FRAMES_DIR)
    fs.mkdirSync(FRAMES_DIR);
}

app.post("/new_video", (req, res) => {
    const video_id = req.query.video_id
    const video_dir = `${FRAMES_DIR}${SEPARATOR}${video_id}`
    fs.mkdirSync(video_dir);
    return res.json({video_dir: video_dir})
});