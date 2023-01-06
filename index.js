const github = require("@actions/github");
const core = require("@actions/core");
const dayjs = require("dayjs");
const json2md = require("json2md");

async function run() {
  const token = core.getInput("token", { required: true });
  const repo = core.getInput("repository", { required: true });
  const owner = core.getInput("owner", { required: true });
  const base_branch = core.getInput("base_branch", { required: true });
  const base_branch_pr_title = core.getInput("base_branch_pr_title", {
    required: true,
  });
  const feature_branch = core.getInput("feature_branch", { required: true });
  const pr_state = core.getInput("pr_state", { required: true });

  const octokit = new github.getOctokit(token);

  const mainPulls = await octokit.rest.pulls.list({
    owner,
    repo,
    state: pr_state,
    base: base_branch,
    per_page: 3,
  });

  const lastPromotedPR = mainPulls.data.find(
    (pr) => pr.title === base_branch_pr_title
  );

  const homologPulls = await octokit.rest.pulls.list({
    owner,
    repo,
    state: pr_state,
    base: feature_branch,
    per_page: 10,
  });

  const prsToPromote = homologPulls.data.filter((pull) =>
    dayjs(pull.merged_at).isAfter(dayjs(lastPromotedPR.merged_at))
  );
  const people = prsToPromote.map((pr) => {
    pr.user.login;
  });
  const titles = prsToPromote.map((pr) => pr.title);

  const output = [
    {
      p: `*Deploy de \`${feature_branch}\` para \`${base_branch}\` no repo: ${repo}*`,
    },
    { p: "*Features*" },
    {
      ul: `\`\`\`${titles}\`\`\``,
    },
    { p: "*Necessária a aprovação de:*" },
    {
      ul: people,
    },
  ];

  core.setOutput("message", json2md(output));
  return json2md(output);
}

run();
