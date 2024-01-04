import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { storage } from './firebase/firebase';
import db from './firebase/firebase';
import Loader from './LoaderComponent';

const NAME_BUCKET = "video-search-1bb50.appspot.com";
const API_DNN = "http://184.73.32.194:5000/process_video";

const VideoUploadButton = ({handler}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [urlImagesApi, setUrlImagesApi] = useState([]);
  const [isFinish, setFinish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nameVideo, setNameVideo] = useState("");
  const [timestamps, setTimestamps] = useState({});
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setNameVideo(file.name);
    
    
  };

  const handleUpload = () => {
    // Aquí puedes enviar el archivo al servidor o realizar cualquier otra acción con el archivo seleccionado
    if (selectedFile) {
      console.log("Archivo seleccionado:", selectedFile);
      // Puedes agregar aquí la lógica para enviar el archivo al servidor
      setLoading(true);
      uploadImage();
    } else {
      console.error("Ningún archivo seleccionado");
    }
  };


  const uploadImage = async(user) => {
    const imagesUrlApi = []
    
      //const response = await fetch(captureImage);
      //const blob = await response.blob();
      //const imageFile = selectedFile;
      //console.log("imageFile: ",imageFile);
      const path = selectedFile.name
      const storageRef = ref(storage,path);
      const metadata = {
        contentType: 'image/jpeg',
      }; 
      let up = uploadBytes(storageRef, selectedFile,metadata).then((snapshot) => {
                  console.log('Uploaded a blob or file!', snapshot);
                  //setSave(true);
                  //setUploading(false);
                })
      try {
        await up;
        //setFinish(true);
        //setUploading(false);

        //// -------- agregamos el path del statement ---------
        
        getDownloadURL(ref(storage, path)).then(async(url) => {
          
          console.log('consultado pathurl: ',url);
          handler(url);
          const docRef = await addDoc(collection(db, "images_url") ,{
            path_url: url
          });

          //imagesUrlApi.push(urlApi);
          //setUrlImagesApi([...imagesUrlApi]);
          //createReferenciaStatement(url);
          console.log("guardado correctamente ",url)

          const apiUrl = `${API_DNN}?bucket_name=${NAME_BUCKET}&video_name=${nameVideo}`;
          console.log("fetch a -> ",apiUrl);
          fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                throw new Error(`Error al realizar la petición: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Maneja los datos obtenidos de la API
                console.log('Datos recibidos:', data);
                console.log('timestamps:', data.timestamps);
                setTimestamps(data.timestamps);
            })
            .catch(error => {
                // Maneja cualquier error que haya ocurrido durante la petición
                console.error('Error en la petición:', error.message);
            });

          
        }).catch((error) => {
          // Handle any errors
          console.log(error);
        });  
        setLoading(false);
        setFinish(true);
      }catch(e){
        console.log(e);
      }
    
    

    //console.log("seteando imagesUrlApi: ", imagesUrlApi);
    
    //setFinish(true);
    //await saveUser(user,imagesUrlApi);
    
    
  };

  const renderizarPropiedades = () => {
    const arrayTimestamps = Object.entries(timestamps).map(([key, value]) => ({ key, value })); //[{"key": "0", "value": {"description": "", "titleField": "Nombre"}}, {"key": "1", "value": {"description": "", "titleField": "Edad"}}, {"key": "2", "value": {"description": "", "titleField": "Ciudad"}}]
    console.log(arrayTimestamps);

    return arrayTimestamps.map((item) => (
      <p key={item.key}>
        <p>{item.key}: {item.value[0]}</ p>
      </p>
    ));
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir Video</button>
      {loading &&<Loader/>}
      <div>
        <h1>Información del Objeto:</h1>
        { isFinish && renderizarPropiedades()}
      </div>
    </div>
  );
};

export default VideoUploadButton;
