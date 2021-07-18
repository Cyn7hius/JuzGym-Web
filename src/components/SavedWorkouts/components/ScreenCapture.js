import React, { createRef, useState, useEffect } from "react";
import { useScreenshot, createFileName } from "use-react-screenshot";
import ExercisePlanner from "./ExercisePlanner";

export default function TEST(props) {
  const { firestoreData, setData } = props;
  const ref = createRef(null);
  const [image, takeScreenshot] = useScreenshot();
  const getImage = () => takeScreenshot(ref.current);

  const download = (image, { name = 'img', extension = 'png' } = {}) => {
    const a = document.createElement('a')
    a.href = image
    a.download = createFileName(extension, name)
    a.click()
  }

  useEffect(() => {
    if (image) {
      download(image, { name: 'lorem-ipsum', extension: 'png' })
    }
  }, [image])


  return (
    <div>
      <div>
        <button style={{ marginBottom: "10px" }} onClick={getImage}>
          Take screenshot
        </button>
      </div>
      {/* <img width={300} src={image} alt={"Screenshot"} /> */}
      <div ref={ref}>
      <ExercisePlanner firestoreData={firestoreData} setData={setData} />
        {/* <h1>use-react-screenshot</h1>
        <p>
          <strong>hook by @vre2h which allows to create screenshots</strong>
        </p> */}
      </div>
    </div>
  );
}
