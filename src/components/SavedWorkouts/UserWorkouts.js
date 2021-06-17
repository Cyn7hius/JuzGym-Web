// import React, { useState, useEffect } from "react";
// import { Virtuoso } from "react-virtuoso";
// import { data } from "../../data/exerciseDatabase";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import { firebase } from "@firebase/app";

// import YoutubeEmbed from "../../data/YoutubeEmbed";
// import {
//   Typography,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Container,
//   Divider,
//   Grid,
//   Box,
//   Button,
// } from "@material-ui/core/";
// import { database } from "faker";

// export default function UserWorkout() {
//   //const [isScrolling, setIsScrolling] = useState(false);

//   //Simple function to split the JSON string by \n and returns it as an array
//   function NewLineParser(str) {
//     var outputArray = str.split(/\r?\n/); 
//     return outputArray;
//   }

//   const [users, setUsersState] = useState([]);

//   const uid = firebase.auth().currentUser?.uid;
//   const db = firebase.firestore();
//   var docRef = db.collection("/users").doc(uid);

//   /* Sets local array to User's FireStore array if any */
//   docRef.get().then((doc) => {
//     if (doc.exists) {
//         setUsersState(doc.data().Workout);
//     } else {
//         console.log("No such document!");
//     }
// }).catch((error) => {
//     console.log("Error getting document:", error);
// });

//   var newList = [];
//   function makeNewArray(uid) {
//     const newNewList = [
//       ...newList, database[uid]
//     ];
//     newList = newNewList;
//     // console.log(newList);
//   }

//   users.map(makeNewArray);
//   // console.log(newList);
//   console.log(users);



//   return (
//     <Container>
//       <Box>
//         <Virtuoso
//           style={{ width: "auto", height: "80vh" }}
//           //Uses the data from json file
//           data={newList}
//           overscan={200}
//           //Total number of exercises to render
//           itemContent={(index, exercise) => (
//             <Accordion>
//               {/* This div is for the image */}
//               <AccordionSummary
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-controls="panel1a-content"
//                 id="panel1a-header"
//               >
//                 <Typography variant="h5" style={{ fontWeight: 500 }}>
//                   {exercise.name}
//                 </Typography>
//               </AccordionSummary>

//               <AccordionDetails style={{ background: "#f2f2f2" }}>
//                 <Grid container spacing={2}>
//                   {/* Instructions portion */}
//                   <Grid item xs>
//                     <Typography
//                       variant="h6"
//                       style={{ fontWeight: 500, textDecoration: "underline" }}
//                     >
//                       Instructions:
//                     </Typography>
//                     <Typography
//                       component={"span"}
//                       style={{ whiteSpace: "pre-line" }}
//                       align="left"
//                     >
//                       <ol>
//                         {NewLineParser(exercise.instructions).map(
//                           (instruction) => {
//                             return (
//                               <li key={instruction.toString()}>
//                                 {instruction}
//                               </li>
//                             );
//                           }
//                         )}
//                       </ol>
//                     </Typography>
//                     <Divider />
//                     <br />

//                     {/* Tips portion */}
//                     <Typography
//                       variant="h6"
//                       style={{ fontWeight: 500, textDecoration: "underline" }}
//                     >
//                       Tips:
//                     </Typography>
//                     <Typography
//                       component={"span"}
//                       style={{ whiteSpace: "pre-line" }}
//                       align="left"
//                     >
//                       <ul>
//                         {NewLineParser(exercise.tips).map((tips) => {
//                           return <li key={tips.toString()}>{tips}</li>;
//                         })}
//                       </ul>
//                     </Typography>
//                     <Divider />
//                     <br />

//                     {/* Variations portion */}
//                     <Typography
//                       variant="h6"
//                       style={{ fontWeight: 500, textDecoration: "underline" }}
//                     >
//                       Variations:
//                     </Typography>
//                     <Typography
//                       component={"span"}
//                       style={{ whiteSpace: "pre-line" }}
//                       align="left"
//                     >
//                       <ul>
//                         {NewLineParser(exercise.variations).map((variation) => {
//                           return (
//                             <li key={variation.toString()}>{variation}</li>
//                           );
//                         })}
//                       </ul>
//                     </Typography>
//                   </Grid>
//                   <Divider orientation="vertical" flexItem />

//                   {/* Right Side of the Exercise info */}
//                   <Grid item xs="auto" style={{ width: "45%" }}>
//                     <Typography
//                       variant="h6"
//                       style={{ fontWeight: 500, textDecoration: "underline" }}
//                     >
//                       {"Main muscles worked: " + exercise.targetGroup}
//                     </Typography>

//                     <br />

//                     {/* Image for each exercise */}
//                     <img height="auto" width="90%" src={exercise.image} />
//                     <Typography
//                       variant="h6"
//                       style={{ fontWeight: 500, textDecoration: "underline" }}
//                     >
//                       {"Video guide: "}
//                     </Typography>

//                     {/* Embeded YouTube video */}
//                     <YoutubeEmbed embedId={exercise.video} />
//                   </Grid>
//                 </Grid>
//               </AccordionDetails>
//             </Accordion>
//           )}
//         />
//       </Box>
//     </Container>
//   );
// }

// export default function FilterExercises() {
//   function CheckExercise(exercise) {
//     return (
//       (filterOne == 4 || exercise.equipmentType == filterOne) &&
//       (filterTwo == 8 || exercise.muscleType == filterTwo)
//     );
//   }

//   const filteredData = data.filter(CheckExercise);
//   return <ExerciseList database={filteredData} />;
// }