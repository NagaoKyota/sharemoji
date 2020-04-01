import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import { storage, db } from "../src/firebase";

const removeExtension = (str: string) => {
  let base = new String(str).substring(str.lastIndexOf("/") + 1);
  if (base.lastIndexOf(".") != -1) {
    base = base.substring(0, base.lastIndexOf("."));
  }
  return base;
};

const FileUpload: React.FC = () => {
  const [src, setSrc] = useState("");
  const [name, setName] = useState("");
  const [croppedBlob, setCroppedBlob] = useState<any>(null);
  const cropper: any = useRef(null);

  const _crop = () => {
    if (cropper) {
      cropper.current.getCroppedCanvas().toBlob((blob: Blob) => {
        setCroppedBlob(blob);
      });
    }
  };

  const selectFile = (event: any) => {
    const { files } = event.target;
    if (files.length === 1) {
      setSrc(window.URL.createObjectURL(files[0]));
      setName(files[0].name);
    }
  };

  const blobToFile = (): File => {
    croppedBlob.lastModifiedDate = new Date();
    croppedBlob.name = name;
    return croppedBlob as File;
  };

  const uploadFile = () => {
    if (croppedBlob) {
      const file: File = blobToFile();
      const storageRef = storage.ref();
      const ref = storageRef.child(file.name);
      ref.put(file).then(snapshot => {
        console.log("Uploaded a blob or file!");
        db.collection("emojis")
          .doc()
          .set({
            image: `gs://${snapshot.ref.bucket}/${snapshot.ref.name}`,
            name: removeExtension(file.name)
          })
          .then(() => {
            location.reload();
          });
      });
    }
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <input type="file" accept="image/jpeg,image/png" onChange={selectFile} />
      {src ? <button onClick={uploadFile}>アップロード</button> : null}
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
