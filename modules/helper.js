module.exports.getExportName = () => {
    const date = new Date();
    const str = date
            .toISOString()
            .replace(/[^0-9]/g, '')
            .slice(0, -5);
    return str;
}
