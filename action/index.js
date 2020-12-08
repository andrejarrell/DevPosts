let util = require('./util');
let fs = require('fs').promises;
let core = require('@actions/core');

let file = core.getInput('posts_file');
fs.readFile(file, 'utf8')
    .then(async data => {
        let feed = await util.getFeed();
        core.debug(feed);
        let posts = await util.createTable(feed.items);
        core.debug(posts);
        await util.editFile(posts, data);
        util.commit();
    })
    .catch(error => core.setFailed(error));