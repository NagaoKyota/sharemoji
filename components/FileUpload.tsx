import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
// import { storage, db } from "../src/firebase";

// const removeExtension = (str: string) => {
//   let base = new String(str).substring(str.lastIndexOf("/") + 1);
//   if (base.lastIndexOf(".") != -1) {
//     base = base.substring(0, base.lastIndexOf("."));
//   }
//   return base;
// };

const FileUpload: React.FC = () => {
  const [src, setSrc] = useState("");
  const cropper: any = useRef(null);

  const _crop = () => {
    if (cropper) {
      console.log(cropper.current.getCroppedCanvas().toDataURL());
    }
  };

  const selectFile = (event: any) => {
    const { files } = event.target;
    if (files.length === 1) {
      setSrc(window.URL.createObjectURL(files[0]));
      // const file = files[0];
      // const storageRef = storage.ref();
      // const ref = storageRef.child(file.name);
      // ref.put(file).then(snapshot => {
      //   console.log("Uploaded a blob or file!");
      //   db.collection("emojis")
      //     .doc()
      //     .set({
      //       image: `gs://${snapshot.ref.bucket}/${snapshot.ref.name}`,
      //       name: removeExtension(file.name)
      //     });
      // });
    }
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <input type="file" accept="image/jpeg,image/png" onChange={selectFile} />
      <Cropper
        ref={cropper}
        src={src}
        style={
          src
            ? {
                height: "300px",
                width: "300px",
                margin: "10px auto"
              }
            : {}
        }
        aspectRatio={1}
        guides={false}
        crop={_crop}
      />
    </div>
  );
};

export default FileUpload;
