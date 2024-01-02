
import React, {useEffect} from "react";
import { doc, setDoc } from "firebase/firestore"; 
import db from "./firebase/firebase";

// Add a new document in collection "cities"




const Main = () => {

    useEffect(()=>{
        const f = async () => {
            try {
              await setDoc(doc(db, "cities", "LA"), {
                name: "Los Angeles",
                state: "CA",
                country: "USA"
              });
              console.log("Document successfully written!");
            } catch (error) {
              console.error("Error writing document: ", error);
            }
          };
          
        f();
    },[]);

    return (
        <div><p>Hola soy main</p></div>
    );
};




export default Main;