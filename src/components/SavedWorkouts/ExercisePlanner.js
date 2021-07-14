import React, { useState, useEffect, Fragment } from "react";
import { Virtuoso } from "react-virtuoso";
import { data } from "../../data/exerciseDatabase";
//Can add into the import statement below
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { firebase } from "@firebase/app";
import { List, arrayMove, arrayRemove } from "react-movable";
import { Reorder, Delete, Save, GetApp } from "@material-ui/icons";
import ExportIcs from "./components/CalendarExport";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import ExerciseDatabase from "./ExerciseDatabase";
import ExportButton from "./ExportButton";

import YoutubeEmbed from "../../data/YoutubeEmbed";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Divider,
  Grid,
  Box,
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  ClickAwayListener,
  Grow,
  Paper,
  Tabs,
  Tab,
  Popper,
  MenuList,
} from "@material-ui/core/";
import ExportExcel from "./components/ExcelExport";
import WorkoutPage from "./WorkoutTemplate";

export default function ExercisePlanner(props) {
  const { firestoreData, setData } = props;

  function updateReps(title, newReps) {
    const newArray = [...firestoreData];
    const position = newArray.findIndex((index) => index.title === title);
    newArray[position] = {
      ...newArray[position],
      reps: parseInt(newReps),
    };
    setData(newArray);
  }

  function updateSets(title, newSets) {
    const newArray = [...firestoreData];
    const position = newArray.findIndex((index) => index.title === title);
    newArray[position] = {
      ...newArray[position],
      sets: parseInt(newSets),
    };
    setData(newArray);
  }

  //Might be redundant function
  function updatePosition(items) {
    const newArray = [...items];
    setData(newArray);
  }

  const buttonStyles = {
    border: "none",
    margin: 0,
    padding: 0,
    width: "auto",
    overflow: "visible",
    cursor: "pointer",
    background: "transparent",
  };

  return (
    <List
      values={firestoreData}
      onChange={({ oldIndex, newIndex }) =>
        updatePosition(arrayMove(firestoreData, oldIndex, newIndex))
      }
      renderList={({ children, props, isDragged }) => (
        <ul
          {...props}
          style={{
            padding: "0em 0em 1em 0em",
            width: "1300px",
            marginLeft: "auto",
            marginRight: "auto",
            cursor: isDragged ? "grabbing" : "inherit",
          }}
        >
          {children}
        </ul>
      )}
      renderItem={({ value, props, index, isDragged, isSelected }) => (
        <li
          {...props}
          style={{
            ...props.style,
            padding: "1.5em",
            margin: "0.5em 0em",
            listStyleType: "none",
            border: "2px solid #CCC",
            boxShadow: "3px 3px #AAA",
            color: "#333",
            borderRadius: "5px",
            cursor: isDragged ? "grabbing" : "inherit",
            fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
            backgroundColor: isDragged || isSelected ? "#EEE" : "#FFF",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* 
                  Mark any node with the data-movable-handle attribute if you wish
                  to use is it as a DnD handle. The rest of renderItem will be then
                  ignored and not start the drag and drop. 
                */}
            <button
              data-movable-handle
              style={{
                ...buttonStyles,
                cursor: isDragged ? "grabbing" : "grab",
                marginRight: "3em",
              }}
              tabIndex={-1}
            >
              <Reorder />
            </button>
            <div
              style={{
                width: "100px",
              }}
            >
              {value.title}
            </div>
            <FormControl>
              <InputLabel>Reps</InputLabel>
              <NativeSelect
                id={value.title + " reps"}
                value={value.reps}
                onChange={(event) =>
                  updateReps(value.title, event.target.value)
                }
              >
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
                <option value={11}>11</option>
                <option value={12}>12</option>
                <option value={13}>13</option>
                <option value={14}>14</option>
                <option value={15}>15</option>
                <option value={16}>16</option>
                <option value={17}>17</option>
                <option value={18}>18</option>
                <option value={19}>19</option>
                <option value={20}>20</option>
                <option value={21}>21</option>
                <option value={22}>22</option>
                <option value={23}>23</option>
                <option value={24}>24</option>
                <option value={25}>25</option>
                <option value={26}>26</option>
                <option value={27}>27</option>
                <option value={28}>28</option>
                <option value={29}>29</option>
                <option value={30}>30</option>
                <option value={35}>35</option>
                <option value={40}>40</option>
                <option value={45}>45</option>
                <option value={50}>50</option>
              </NativeSelect>
            </FormControl>

            <FormControl>
              <InputLabel>Sets</InputLabel>
              <NativeSelect
                id={value.title + " sets"}
                value={value.sets}
                onChange={(event) =>
                  updateSets(value.title, event.target.value)
                }
              >
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
                <option value={11}>11</option>
                <option value={12}>12</option>
                <option value={13}>13</option>
                <option value={14}>14</option>
                <option value={15}>15</option>
                <option value={16}>16</option>
                <option value={17}>17</option>
                <option value={18}>18</option>
                <option value={19}>19</option>
                <option value={20}>20</option>
                <option value={21}>21</option>
                <option value={22}>22</option>
                <option value={23}>23</option>
                <option value={24}>24</option>
                <option value={25}>25</option>
                <option value={26}>26</option>
                <option value={27}>27</option>
                <option value={28}>28</option>
                <option value={29}>29</option>
                <option value={30}>30</option>
                <option value={35}>35</option>
                <option value={40}>40</option>
                <option value={45}>45</option>
                <option value={50}>50</option>
              </NativeSelect>
            </FormControl>
            <button
              onClick={() => {
                updatePosition(
                  typeof index !== "undefined"
                    ? arrayRemove(firestoreData, index)
                    : firestoreData
                );
              }}
              style={buttonStyles}
            >
              <Delete />
            </button>
          </div>
        </li>
      )}
    />
  );
}
