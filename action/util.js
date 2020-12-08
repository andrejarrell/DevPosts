let { URL } = require('url');
let https = require('./https');
let moment = require('moment');
let fs = require('fs').promises;
let Parser = require('rss-parser');
let core = require('@actions/core');
let table = require('markdown-table');
let { exec } = require('child_process');

let util = {
    commit: () => {
        let file = core.getInput('posts_file');
        let repo = process.env.GITHUB_REPOSITORY;
        let token = core.getInput('github_token');
        let email = core.getInput('commit_email');
        let message = core.getInput('commit_message');
        let username = core.getInput('commit_username');
        exec(`git config --global user.email "${email}"`);
        exec(`git config --global user.name "${username}"`);
        exec(`git remote set-url origin https://${token}@github.com/${repo}.git`);
        exec(`git add ${file}`);
        exec(`git commit -m "${message}"`);
        exec('git push');
    },

    formatDate: string => {
        let format = core.getInput('date_format');
        return moment(string).format(format);
    },

    getFeed: async () => {
        let parser = new Parser();
        let user = core.getInput('dev_username');
        return await parser.parseURL(`https://dev.to/feed/${user}`)
    },

    getStats: async url => {
        let slug = new URL(url).pathname;
        let stats = await https.get(`https://dev.to/api/articles${slug}`);
        return {
            comments: stats.comments_count,
            reactions: stats.public_reactions_count,
        };
    },

    createTable: async posts => {
        let amount = core.getInput('posts_amount');
        let rows = [['📰 Name', '📅 Date', '❤ Reactions', '💬 Comments']];
        if (amount == '0') {
            posts.forEach(async p => {
                let stats = await util.getStats(p.link);
                rows.push([
                    `[${p.title}](${p.link})`, util.formatDate(p.pubDate),
                    stats.reactions, stats.comments
                ]);
            });
        } else {
            amount = posts.length < amount ? posts.length : amount;
            for (i = 0; i < amount; i++) {
                let stats = await util.getStats(posts[i].link);
                rows.push([
                    `[${posts[i].title}](${posts[i].link})`,
                    util.formatDate(posts[i].pubDate),
                    stats.reactions, stats.comments
                ]);
            };
        };
        return table(rows, { align: 'c' });
    },

    editFile: async (posts, string) => {
        let file = core.getInput('posts_file');
        let locator = core.getInput('posts_locator');
        let start = `<!-- ${locator}:start -->`;
        let end = `<!-- ${locator}:end -->`;
        let startIndex = string.search(start) + start.length;
        let endIndex = string.search(end);
        let startContent = string.substr(0, startIndex);
        let endContent = string.substr(endIndex, string.length);
        let newString = `${startContent}\n${posts}\n${endContent}`;
        await fs.writeFile(file, newString, 'utf8');
    }
};

module.exports = util;