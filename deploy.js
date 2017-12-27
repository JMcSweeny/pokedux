const fs = require('fs');
const AWS = require('aws-sdk');
const path = require('path');
const mimeTypes = require('mime-types');

const s3 = new AWS.S3();

const includeImages = process.argv.indexOf('-i') > -1;

const config = {
  bucketName: 'pokedux.jamesmcsweeny.com',
  outFolder: 'dist',
};

uploadFile(path.join(__dirname, 'index.html'), 'index.html');
uploadFiles(config.outFolder);

function uploadFiles(folderPath) {
  const fullPath = path.join(__dirname, folderPath);

  fs.readdir(fullPath, (err, files) => {
    if (err) {
      throw err;
    }

    if (!files || files.length === 0) {
      console.log(`Directory ${fullPath} is empty.`);
      return;
    }

    for (const fileName of files) {
      const filePath = path.join(fullPath, fileName);

      if (fs.lstatSync(filePath).isDirectory()) {
        uploadFiles(`${folderPath}/${fileName}`);
        continue;
      }

      uploadFile(filePath, `${folderPath}/${fileName}`);
    }
  });
}

function uploadFile(filePath, fileName) {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      throw err;
    }

    if (!includeImages && isImage(fileName)) {
      return;
    }

    const contentType = mimeTypes.lookup(fileName);

    s3.putObject({
      Bucket: config.bucketName,
      Key: fileName,
      Body: fileContent,
      ContentType: contentType
    }, (err, data) => {
      if (err) {
        console.log(err);
      } else{
        console.log(`Successfully uploaded ${filePath}`);
      }
    });
  });
}

function isImage(fileName) {
  const extensions = ['png', 'jpg', 'jpeg', 'gif'];

  const parts = fileName.split('.');

  if (parts.length < 2) {
    return false;
  }

  return extensions.includes(parts[1]);
}