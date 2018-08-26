
const v = require('../package.json').version;
const date = new Date();
const dateStr = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;

const skin = 'default';

const fs = require('fs');

exports.version = function (path, project) {
    if (path[path.length - 1] != '/')
        path = path + '/';
    fs.writeFileSync(path + 'version.json',
        JSON.stringify({id: project, version: v, date: dateStr, skin: skin}), 'utf8');
};
