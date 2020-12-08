# DevPosts

[![actionshackathon](https://img.shields.io/badge/%23actionshackathon-0A0A0A?style=flat-square&logo=dev.to&logoColor=white)](https://dev.to/andrejarrell/dev-posts-on-github-4pij)

<!-- devposts:start -->
|                                         📰 Name                                        |   📅 Date  | ❤ Reactions | 💬 Comments |
| :------------------------------------------------------------------------------------: | :--------: | :---------: | :---------: |
| [My Fav Browser Extensions](https://dev.to/andrejarrell/my-fav-browser-extensions-n0c) | 09/18/2020 |      4      |      0      |
|      [Basic Linux Commands](https://dev.to/andrejarrell/basic-linux-commands-1dgf)     | 08/19/2020 |      6      |      0      |
|           [My VSCode Setup](https://dev.to/andrejarrell/my-vscode-setup-11a2)          | 08/18/2020 |      7      |      2      |
<!-- devposts:end -->

> This is a GitHub Action that will allow you to show your most recent blog posts from [dev.to](https://dev.to) in your README

## 🛠 Setup

- [x] Place these locator comment tags in your markdown file

```markdown
# 📝 Posts
<!-- devposts:start -->
<!-- devposts:end -->
```

- [x] Create a `.github/workflows` directory and make file named `devposts.yml` inside it

```yaml
name: Show Dev Posts
on:
  push:
  workflow_dispatch:
  schedule:
    - cron: '0 * * * *'

jobs:
  update:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2
      - uses: andrejarrell/devposts@1.3.0
        with:
          # Replace username with your dev.to username
          dev_username: username
          github_token: ${{ secrets.GH_TOKEN }}
          # Add any other settings here
```

- [x] Commit your files and read about [Events](#-events)

## ⚙ Settings

All settings will be placed in `devposts.yml`

| Name | Type | Required | Default | Description | ETC |
| -- | -- | -- | -- | -- | -- |
| **`github_token`** | [`Secret`](https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token) | `true` | `${{ secrets.GH_TOKEN }}` | Used to authenticate |
| **`dev_username`** | `String` | `true` | N/A | Dev.to username |
| **`posts_amount`** | `Number` | `false` | `0` | Amount of posts | `0` = all |
| **`posts_file`** | `String` | `false` | `README.md` | File to be edited | Relative to root directory |
| **`posts_locator`** | `String` | `false` | `devposts` | Comment tag used to inject posts | `<!-- devposts:start -->` + `<!-- devposts:end -->` |
| **`date_format`** | `String` | `false` | `MM/DD/YYYY` | Format for date | [Moment.js Formats](https://momentjs.com/docs/#/displaying/format/) |
| **`commit_username`** | `String` | `false` | `workflow` | Name used when commiting |
| **`commit_email`** | `String` | `false` | `workflow@github.com` | Email used when commiting |
| **`commit_message`** | `String` | `false` | `Updated DEV Posts` | Message used when commiting |

## ⚡ Events

### `push`

Trigger workflow whenever you push to your repository.

To customize which branches trigger this workflow refer to the [documentation](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#onpushpull_requestbranchestags).

### `workflow_dispatch` 

With this you can manually trigger your workflow.

Go to your repo -> `Actions` -> `Show Dev Posts` -> `Run workflow` -> `Run workflow`

### `schedule`

`- cron: '0 * * * *'`

This has been set to run every hour. You can change it using valid POSIX cron syntax.

## ℹ Info

Please feel free to [submit issues](https://github.com/andrejarrell/DevPosts/issues/new/choose) or contribute and make pull request!