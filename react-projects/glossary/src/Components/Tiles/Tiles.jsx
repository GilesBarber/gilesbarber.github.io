import { useEffect, useState } from "react";
import TilesList from "./TilesList";

const TilesContainer = (props) => {
   const [error, setError] = useState(null);
   const [isLoaded, setIsLoaded] = useState(false);
   const [content, setContent] = useState([]);

   useEffect(() => {
      if (!isLoaded) {
         fetch("content/content.json")
            .then((res) => res.json())
            .then(
               (result) => {
                  setIsLoaded(true);
                  setContent(result);
               },
               (error) => {
                  setIsLoaded(true);
                  setError(error);
               }
            );
      }
   }, [isLoaded]);

   if (error) {
      return <div>Error: {error.message}</div>;
   } else if (!isLoaded) {
      return <div>Loading...</div>;
   } else {
      return (
         <div className="tiles-container">
            <TilesList content={content} handleOpen={props.handleOpen} />
            {props.children}
         </div>
      );
   }
};

export default TilesContainer;
