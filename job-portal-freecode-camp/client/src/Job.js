import React from "react";
import Typography from "@material-ui/core/Typography";

function Job({ job }) {
  return (
    <div className="job">
      <div>
        <Typography>{job.title}</Typography>
        <Typography>{job.company}</Typography>
        <Typography>{job.location}</Typography>
      </div>
    </div>
  );
}

export default Job;
