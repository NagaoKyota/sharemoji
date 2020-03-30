import React from "react";
import { storage, db } from "../src/firebase";

const removeExtension = (str: string) => {
  let base = new String(str).substring(str.lastIndexOf("/") + 1);
  if (base.lastIndexOf(".") != -1) {
    base = base.substring(0, base.lastIndexOf("."));
  }
  return base;
};

const FileUpload: React.FC = () => {
  const selectFile = (event: any) => {
    const { files } = event.target;
    if (files.length === 1) {
      const file = files[0];
      const storageRef = storage.ref();
      const ref = storageRef.child(file.name);
      ref.put(file).then(snapshot => {
        console.log("Uploaded a blob or file!");
        db.collection("emojis")
          .doc()
          .set({
            image: `gs://${snapshot.ref.bucket}/${snapshot.ref.name}`,
            name: removeExtension(file.name)
          });
      });
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <input type="file" accept="image/jpeg,image/png" onChange={selectFile} />
    </div>
  );
};

export default FileUpload;
