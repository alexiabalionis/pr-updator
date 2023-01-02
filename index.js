const github = require("@actions/github");
const core = require("@actions/core");
const dayjs = require("dayjs");
const json2md = require("json2md");

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
    per_page: 3,
  });

  const lastPromotedPR = mainPulls.data.find(
    (pr) => pr.title === "Promote homolog to production"
  );

  const homologPulls = await octokit.rest.pulls.list({
    owner: "olxbr",
    repo: "listing-olx",
    state: "closed",
    base: "homolog",
    per_page: 10,
  });

  const prsToPromote = homologPulls.data.filter((pull) =>
    dayjs(pull.merged_at).isAfter(dayjs(lastPromotedPR.merged_at))
  );
  const people = prsToPromote.map((pr) => {
    return { author: pr.user.login, title: pr.title };
  });

  const output = [
    { h1: "Promote `homolog` to `main`" },
    { h2: "Features" },
    {
      ul: people,
    },
    { h2: "Como prosseguir?" },
    { ol: ["Teste o seu código em homolog", "Aprove o PR de promote"] },
  ];
  console.log(json2md(output));
}

run();
