const { S3Client } = require('@aws-sdk/client-s3')
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')

const accountId = '5a6c0f39c425bc3899874aa2f606231e'

const s3 = new S3Client({
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  region: "auto"
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "kaizen",
    key(req, file, cb) {
      cb(null, `USERID/FILEID`);
    },
  }),
});

async function run() {
  const app = express();

  app.post("/track", upload.single("track"), (req, res) => {
    res.json({});
  });

  app.use(express.static("static"));

  app.listen(4242);
}
run();
