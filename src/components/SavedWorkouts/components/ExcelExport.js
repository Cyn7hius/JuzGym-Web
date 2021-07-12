import { MenuItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, { useState, useEffect } from "react";
import { CSVLink, CSVDownload } from "react-csv";

//firestoredata is the curated exercises + sets + reps
export default function ExportExcel(props) {
  const { firestoreData } = props;
  const headers = [
    { label: "Name", key: "title" },
    { label: "Reps", key: "reps" },
    { label: "Sets", key: "sets" },
  ];

  const csvReport = {
    filename: "Workout.csv",
    headers: headers,
    data: firestoreData,
  };

  return (
    <MenuItem>
      <CSVLink
        style={{
            color: "inherit", 
            textDecoration: "inherit",
        }}
        {...csvReport}
      >
        Export to CSV
      </CSVLink>
    </MenuItem>
  );
}
