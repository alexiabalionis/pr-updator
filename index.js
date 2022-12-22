const github = require("@actions/github");
const core = require("@actions/core");

async function run() {
  // This should be a token with access to your repository scoped in as a secret.
  // The YML workflow will need to set myToken with the GitHub Secret Token
  // myToken: ${{ secrets.GITHUB_TOKEN }}
  // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
  const token = core.getInput("token", { required: true });

  const octokit = new github.getOctokit(token);

  // You can also pass in additional options as a second parameter to getOctokit
  // const octokit = github.getOctokit(myToken, {userAgent: "MyActionVersion1"});

  const { data } = await octokit.rest.pulls.list({
    owner: "olxbr",
    repo: "listing",
    state: "close",
  });

  // const { data: pullRequest } = await octokit.rest.pulls.get({
  //   owner: "octokit",
  //   repo: "rest.js",
  //   pull_number: 123,
  //   mediaType: {
  //     format: "diff",
  //   },
  // });

  console.log(data.length);
}

run();
