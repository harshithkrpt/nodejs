import React from "react";
import Typography from "@material-ui/core/Typography";

import Job from "./Job";

function Jobs({ jobs }) {
  return (
    <div className="jobs">
      <Typography variant="h1">Entry Level Software Job</Typography>
      {jobs.map(job => (
        <Job job={job} id={job.id} />
      ))}
    </div>
  );
}

export default Jobs;
