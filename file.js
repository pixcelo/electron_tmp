const fs = require('fs');

const path = "./";
if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
}
