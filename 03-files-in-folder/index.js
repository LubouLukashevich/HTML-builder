const fs = require('fs');
const path = require('path');
const { stdout } = process;

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
  if (err) throw err.message;
  files.forEach(file => {
    fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
      if (err) throw err.message;
      if (stats.isFile()) {
        let ext = path.extname(path.join((__dirname, 'secret-folder', file.name)));
        let extPos = file.name.indexOf(ext, 0);
        let name = file.name.slice(0, extPos);
        let size = (stats.size / 1024).toFixed(3); 
        stdout.write(`${name}    ${ext}    ${size}kb\n`);
      }
    });
  });
});
