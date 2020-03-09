import React from "react";
import Typography from "@material-ui/core/Typography";

import Job from "./Job";

function Jobs({ jobs }) {
  console.log(jobs[0]);
  return (
    <div className="jobs">
      <Typography variant="h4" component="h1">
        Entry Level Software Job
      </Typography>
      {jobs.map((job, i) => (
        <Job job={job} key={i} />
      ))}
    </div>
  );
}

export default Jobs;
