const fetch = require("node-fetch");
const redis = require("redis");
const { promisify } = require("util");

const client = redis.createClient();

const setAsync = promisify(client.set).bind(client);

async function fetchGithub() {
  let resultCount = 1,
    onPage = 0;
  const allJobs = [];
  while (resultCount > 0) {
    const res = await fetch(
      `https://jobs.github.com/positions.json?description=ruby&page=${onPage}`
    );
    const jobs = await res.json();
    allJobs.push(...jobs);
    resultCount = jobs.length;
    onPage++;
  }

  // filter algo
  const jrJobs = allJobs.filter(job => {
    const jobTitle = job.title.toLowerCase();
    // algo logic
    if (
      jobTitle.includes("senior") ||
      jobTitle.includes("manager") ||
      jobTitle.includes("sr.") ||
      jobTitle.includes("architect")
    ) {
      return false;
    }

    return true;
  });

  console.log(jrJobs.length);

  console.log(allJobs.length);
  const success = await setAsync("github", JSON.stringify(allJobs));
  console.log(success);
}

fetchGithub();

module.exports = fetchGithub;
