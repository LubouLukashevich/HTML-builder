const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

fs.writeFile(
  path.join('02-write-file', 'text.txt'),
  '',
  error => {
    if (error) stdout.write(error.message);
  }
);

stdout.write('Введите текст (для завершения укажите exit или Ctrl+C)\n');

const output = fs.createWriteStream(path.join('02-write-file', 'text.txt'));

stdin.on('data', (data) => {
  if (data.toString().trim() !== 'exit') {
    output.write(data);
  } else {
    close();
  }
});

process.on('SIGINT', () => close());

const close = () => {
  stdout.write('Запись файла завершена');
  process.exit(0);
};