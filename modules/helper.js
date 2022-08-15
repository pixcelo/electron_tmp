const { download } = require("electron-dl");

module.exports.getExportName = () => {
    const date = new Date();
    const str = date
            .toISOString()
            .replace(/[^0-9]/g, '')
            .slice(0, -5);
    return str;
}

module.exports.downLoadFile = async (win, savePath, fileName) => {
    await download(win, url,
        {
            directory: savePath,
            filename: fileName,
        });
}
