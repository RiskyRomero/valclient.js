import path from "path";
function getConfigurationPath(file) {
    return path.resolve(process.env.LOCALAPPDATA, "./Riot Games/Riot Client/Config/", file);
}
function parseQueryString(querystring) {
    querystring = querystring.replace("#", "");
    return querystring.split("&").reduce((obj, string) => {
        const [key, value] = string.split("=");
        return Object.assign(Object.assign({}, obj), { [key]: value });
    }, {});
}
export { getConfigurationPath, parseQueryString };
//# sourceMappingURL=index.js.map