import React, { useState, useRef, useEffect } from "react";
import { GetApp } from "@material-ui/icons";
import { useScreenshot, createFileName } from "use-react-screenshot";
import ExportIcs from "./buttonComponents/CalendarExport";
import {
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuList,
  MenuItem,
} from "@material-ui/core/";
import ExportExcel from "./buttonComponents/ExcelExport";

//Component is the download button that contains ics/csv export options
export default function ExportButton(props) {
  //firestoreData will either be Workout1/2/3's array, workoutName either default workout title or custom name
  const { firestoreData, workoutName, forwardedRef } = props;

  //State used for the dropdown menu
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [image, takeScreenshot] = useScreenshot();
  const [screenshot, setScreenshot] = useState(0);

  const download = (image, { name = "img", extension = "png" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  useEffect(() => {
    if (image) {
      download(image, { name: "lorem-ipsum", extension: "png" });
    }
  }, [image]);

  useEffect(() => {
    if (screenshot > 0) {
      takeScreenshot(forwardedRef.current);
    }

  }, [screenshot]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleImage = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
    setScreenshot(screenshot + 1);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div
      style={{
        padding: "0em",
        textAlign: "center",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<GetApp />}
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        Download
      </Button>

      {/* the two export options */}
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{ zIndex: 1000 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <ExportExcel
                    firestoreData={firestoreData}
                    handleClose={handleClose}
                  />
                  <ExportIcs
                    firestoreData={firestoreData}
                    originalHandleClose={handleClose}
                    workoutName={workoutName}
                  />
                  <MenuItem onClick={handleImage}>Export to png</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
