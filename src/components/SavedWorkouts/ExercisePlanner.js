import React from "react";
import { List, arrayMove, arrayRemove } from "react-movable";
import { Reorder, Delete } from "@material-ui/icons";
import {
  InputLabel,
  FormControl,
  NativeSelect,
  Typography,
} from "@material-ui/core";

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
    marginRight: "-1.5em",
    margin: 0,
    padding: 0,
    width: "auto",
    overflow: "visible",
    cursor: "pointer",
    background: "transparent",
  };

  window.mobileCheck = function () {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
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
          style={
            !window.mobileCheck()
              ? {
                  padding: "0em 0em 1em 0em",
                  width: "65vw",
                  marginLeft: "auto",
                  marginRight: "auto",
                  cursor: isDragged ? "grabbing" : "inherit",
                }
              : {
                  padding: "0em 0em 1em 0em",
                  width: "95vw",
                  marginLeft: "auto",
                  marginRight: "auto",
                  cursor: isDragged ? "grabbing" : "inherit",
                }
          }
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
            color: "#333",
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
                marginLeft: "-1em",
                marginRight: "0em",
              }}
              tabIndex={-1}
            >
              <Reorder />
            </button>
            <Typography
              variant="h6"
              style={{
                marginRight: "1em",
              }}
            >
              {value.title}
            </Typography>
            <FormControl style={{ marginRight: "0.5em" }}>
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
