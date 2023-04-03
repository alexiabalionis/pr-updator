# Create a changelog between two branches

This action compares two branches and returns a changelog with the PR titles and authors.

## Usage

You can now consume the action by referencing the v1 branch

```yaml
- name: Update PR details
  uses: alexiabalionis/pr-updator@1.0.0
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    destination_branch: main
    pr_body: ${{ steps.branchlog.outputs.changelog }}
    pr_reviewers: ${{ steps.branchlog.outputs.authors }}
```

## Contributing

### Code in Main

Install the dependencies

```bash
npm install
```

Run prepare

```bash
npm run prepare
```

Since the packaged index.js is run from the dist folder.

```bash
git add dist
```

## Create a release branch

Users shouldn't consume the action from master since that would be latest code and actions can break compatibility between major versions.

Checkin to the v1 release branch

```bash
git checkout -b v1
git commit -a -m "v1 release"
```

```bash
git push origin v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket:

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

See the [actions tab](https://github.com/actions/javascript-action/actions) for runs of this action! :rocket:
