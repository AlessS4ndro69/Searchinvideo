
import React, {useEffect} from "react";

import Fotogramas from "./Fotogramas";
import logo from './logo.svg';
import './App.css';
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import db from "./firebase/firebase";

import VideoUploadButton from "./UploadVideo";

// Add a new document in collection "cities"

const id_video = "5152";
const name_object = "person";
const description_object = ["22_03", "15_1","15_59"];
const name_video = "1.mp4";
const url_video = "https://firebasestorage.googleapis.com/v0/b/video-search-1bb50.appspot.com/o/1.mp4?alt=media&token=a4ba5bab-1dda-4e17-9dc3-9fdc661c28ac";


const Main = () => {

    useEffect(()=>{
        
/*
        const f = async () => {
            try {
              await setDoc(doc(db, "videos", id_video), {
                name: "La gran aventura",
                duration: 51822,
              });
              console.log("Document successfully written!");
            } catch (error) {
              console.error("Error writing document: ", error);
            }


            try{
                await setDoc(doc(db, "data_video", id_video),{
                    name_object: name_object,
                    description_object: description_object,
                });
            } catch (error) {
                console.error("Error writing document: ", error);
            } 
          };
          
        f();*/



    },[]);

    return (
        <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}

          <p>
            Video
          </p>
          <video width="640" height="360" controls>
            <source src={url_video} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
        </video>
        <VideoUploadButton/>
        </header>
        <Fotogramas/>
      </div>
    );
};




export default Main;