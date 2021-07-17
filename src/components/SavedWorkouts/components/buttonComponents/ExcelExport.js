import { MenuItem } from "@material-ui/core";
import React from "react";
import { CSVLink } from "react-csv";

export default function ExportExcel(props) {
  const { firestoreData, handleClose } = props;
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
    <MenuItem onClick={handleClose}>
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
