# Create a changelog between two branches

This action compares two branches and returns a changelog with the PR titles and authors.

## Code in Main

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

## Usage

You can now consume the action by referencing the v1 branch

```yaml
uses: actions/javascript-action@v1
with:
  token: ${{ secrets.ACCESS_TOKEN }}
  repository: branch_name
  owner: organization_name
  base_branch: main
  feature_branch: homolog
  pr_state: closed
```

See the [actions tab](https://github.com/actions/javascript-action/actions) for runs of this action! :rocket:
