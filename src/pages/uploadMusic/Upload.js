import { useState } from "react";
import "./Upload.css";
import { db, storage } from "../../config/firebase";

import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import createRandom from "../../config/createRandom";
import { useNavigate } from "react-router";

export default function UploadMusic() {

  const navigate = useNavigate()
  const [uploadedMusic, setUploadedMusic] = useState();
  const [uploadedMusicCover, setUploadedMusicCover] = useState();

  const [name, setName] = useState();
  const [duration, setDuration] = useState();

  const handleUpload = async () => {
    if(!uploadedMusic && !uploadedMusicCover) return;
    const fileName = createRandom(10);
    saveMusicToDB(fileName, uploadedMusic);
    saveImageToDB(fileName, uploadedMusicCover);
    await handleSubmit(fileName);
  };

  const handleSubmit = async (fileName) => {
    try {
      const docRef = await addDoc(collection(db, "music"), {
        Duration: duration,
        SongId: fileName,
        SongName: name,
      });
      if (docRef) {
        navigate(`/playlistDashboard`)
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Image Upload
  const saveMusicToDB = async (fileName, uploadMusic) => {
    try {
      if (!uploadMusic) return;

      const musicRef = ref(storage, `music/${fileName}.mp3`);

      await uploadBytes(musicRef, uploadMusic).then((snapshot) => {
        console.log(snapshot.ref);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const saveImageToDB = async (fileName, image) => {
    try {
      if (!image) return;

      const imageRef = ref(storage, `image/${fileName}.jpeg`);

      await uploadBytes(imageRef, image).then((snapshot) => {
        console.log(snapshot.ref);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    document.getElementById("file-id").click();
  };
  const handleClickCover = () => {
    document.getElementById("file-id-cover").click();
  };
  return (
    <div className="upload-main">
      <div className="upload-box">
        <h1>UPLOAD MUSIC</h1>
        <div className="upload-song-title">
          <p>Song Title</p>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="upload-song-title">
          <p>Song Duration</p>
          <input
            type="text"
            onChange={(e) => {
              setDuration(e.target.value);
            }}
          />
        </div>
      <div className="upload-file">
        <input
          id="file-id"
          type="file"
          onChange={(e) => {
            setUploadedMusic(e.target.files[0]);
          }}
          accept="audio/mp3,audio/*"
        />
        {uploadedMusic ? (
          <h3>Song Ready To Upload</h3>
        ) : (
          <button onClick={handleClick}>Upload File</button>
        )}
      </div>

      <div className="upload-file">
        <input
          id="file-id-cover"
          type="file"
          onChange={(e) => {
            setUploadedMusicCover(e.target.files[0]);
          }}
          accept="image/jpeg"
        />
        {uploadedMusicCover ? (
          <h3>Cover Ready To Upload</h3>
        ) : (
          <button onClick={handleClickCover}>Upload Cover</button>
        )}
      </div>
      <button className="upload-btn" onClick={handleUpload}>
        Submit
      </button>
      </div>

    </div>
  );
}
