import React, { useState, useRef } from "react";
import { Input, Button, Icon } from "semantic-ui-react";
import Cropper from "react-cropper";
import { auth, storage, db } from "../src/firebase";
import ReactCropper from "react-cropper";

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
  const cropper = useRef<ReactCropper>(null);
  const input = useRef<HTMLInputElement>(null);

  const _crop = () => {
    if (cropper && cropper.current) {
      cropper.current.getCroppedCanvas().toBlob(blob => {
        setCroppedBlob(blob);
      });
    }
  };

  const openDialog = () => {
    if (input && input.current) {
      input.current.click();
    }
  };

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files?.length === 1) {
      setSrc(window.URL.createObjectURL(files[0]));
      setName(files[0].name);
    }
  };

  const inputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value.replace(/[^0-9A-Za-z]/g, ""));
  };

  const blobToFile = (): File => {
    croppedBlob.lastModifiedDate = new Date();
    croppedBlob.name = name;
    return croppedBlob as File;
  };

  const uploadFile = () => {
    if (croppedBlob && name) {
      const file: File = blobToFile();
      const storageRef = storage.ref();
      const ref = storageRef.child(file.name);
      ref.put(file).then(snapshot => {
        console.log("Uploaded a blob or file!");
        db.collection("emojis")
          .doc()
          .set({
            image: `gs://${snapshot.ref.bucket}/${snapshot.ref.name}`,
            name: removeExtension(file.name),
            user: {
              displayName: auth.currentUser?.displayName,
              photoURL: auth.currentUser?.photoURL?.replace("normal", "200x200")
            }
          })
          .then(() => {
            location.reload();
          });
      });
    }
  };

  return (
    <div style={{ marginTop: "16px" }}>
      <label htmlFor="file" className="ui icon button" onClick={openDialog}>
        <Icon name="file" />
        <span style={{ marginLeft: "8px" }}>ファイルを選択</span>
      </label>
      <input
        ref={input}
        type="file"
        accept="image/jpeg,image/png"
        style={{ display: "none" }}
        onChange={selectFile}
      />
      {src ? (
        <Input
          type="text"
          value={removeExtension(name)}
          placeholder="半角英数字のみ"
          style={{ margin: "0 16px" }}
          onChange={inputName}
        />
      ) : null}
      {src ? (
        <Button onClick={uploadFile}>
          <Icon name="upload" />
          <span style={{ marginLeft: "8px" }}>アップロード</span>
        </Button>
      ) : null}
      <Cropper
        ref={cropper}
        src={src}
        style={
          src
            ? {
                height: "300px",
                width: "300px",
                margin: "16px auto"
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
