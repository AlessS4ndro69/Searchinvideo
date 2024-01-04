import React, {useEffect, useState} from "react";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import db from "./firebase/firebase";

const id_video = "5152";

const videos = [
    {
      title: 'Video 1',
      description: 'Descripción del video 1',
      thumbnail: 'url_de_miniatura_1.jpg',
      videoUrl: 'url_del_video_1.mp4',
    },
    {
      title: 'Video 2',
      description: 'Descripción del video 2',
      thumbnail: 'url_de_miniatura_2.jpg',
      videoUrl: 'url_del_video_2.mp4',
    },
    // Agrega más objetos para más videos
  ];

  const VideoCard = ({ object_name, times, thumbnail, videoUrl }) => {
    return (
      <div style={styles.card}>
        <div style={styles.info}>
          <h2>{object_name}</h2>
          {/* <p>{description}</p> */}
          {/* {times.map((item, index) => (
            <div >
                <img key={index} src={item.thumbnails} style={styles.thumbnail} />
                <p>{item.time}</p>
            </div>
          ))} */}
        </div>
        
        
          
        
      </div>
    );
  };

const Fotogramas = () => {
    const [data, setData] = useState([]);

    useEffect(()=>{
        const f = async() => {
            const docRef = doc(db, "data_video", id_video);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data().objects);
                setData(docSnap.data().objects);
            } else {
            // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        };
        f();
    },[]);
    

      return (
        <div style={styles.gallery}>
          {data.map((item, index) => (
            <VideoCard key={index} {...item} />
          ))}
        </div>
      );
};

export default Fotogramas;

const styles = {
    gallery: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    card: {
      border: '1px solid #ccc',
      borderRadius: '8px',
      margin: '10px',
      padding: '10px',
      width: '300px',
    },
    thumbnail: {
      width: '100%',
      height: 'auto',
      borderRadius: '8px',
      marginBottom: '10px',
    },
    info: {
      textAlign: 'left',
    },
    video: {
      width: '100%',
    },
  };
    

