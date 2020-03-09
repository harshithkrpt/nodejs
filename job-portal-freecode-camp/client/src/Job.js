import React from "react";
import Typography from "@material-ui/core/Typography";

function Job({ job }) {
  return (
    <div className="job">
      <Typography variant="p">
        {job.title}
        {job.company}
      </Typography>
    </div>
  );
}

export default Job;
