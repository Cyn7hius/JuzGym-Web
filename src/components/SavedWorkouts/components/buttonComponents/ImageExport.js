import React, { useRef, useState, useEffect } from "react";
import { useScreenshot, createFileName } from "use-react-screenshot";
import { Button, MenuItem } from "@material-ui/core";

export default function ExportImage(props) {
  const { handleClose, forwardedRef } = props;
  const [image, takeScreenshot] = useScreenshot();
  const getImage = () => {
    takeScreenshot(forwardedRef.current);
  };

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

  return (
    <div>
      <div>
        <MenuItem onClick={handleClose}>
          <Button onClick={getImage}> Export to png</Button>
        </MenuItem>
      </div>
    </div>
  );
}
