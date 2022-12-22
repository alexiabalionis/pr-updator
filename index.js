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

  const mainPulls = await octokit.rest.pulls.list({
    owner: "olxbr",
    repo: "listing-olx",
    state: "closed",
    base: "main",
    per_page: 10,
  });
  const lastPromotedPR = mainPulls.data.find(
    (pr) => pr.title === "Promote homolog to production"
  );

  console.log({
    title: lastPromotedPR.title,
    date: lastPromotedPR.merged_at,
    pr_number: lastPromotedPR.number,
    commits_url: lastPromotedPR.commits_url,
    commits: lastPromotedPR.commits.href,
  });

  // data.map((pr) => console.log(pr.title));
}

run();
