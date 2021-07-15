import React from "react";
import {  GetApp } from "@material-ui/icons";
import ExportIcs from "./buttonComponents/CalendarExport";
import {
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuList,
} from "@material-ui/core/";
import ExportExcel from "./buttonComponents/ExcelExport";

//firestoredata is the curated exercises + sets + reps
export default function ExportButton(props) {
  const { firestoreData, workoutName } = props;
  //added here
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleExcel = () => {
    <ExportExcel firestoreData={firestoreData} />
    handleToggle();

  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <div
    style={
      {
        // backgroundColor: "#F7F7F7",
        padding: "3em",
        textAlign: "right",
      }
    }>
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
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
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
                    <ExportExcel firestoreData={firestoreData} handleClose={handleClose} />
                    <ExportIcs firestoreData={firestoreData} originalHandleClose={handleClose} workoutName={workoutName}/>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </div>
  );
}
