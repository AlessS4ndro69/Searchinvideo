import React from "react";
import  HashLoader  from "react-spinners/HashLoader";


const override= {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const Loader = (props) => {
    
    return(
        <HashLoader
                color={props.color}
                loading={props.loading}
                cssOverride= {override}
                size={120}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
    );
};

export default Loader;