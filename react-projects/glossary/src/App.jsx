import { useState } from "react";
import PopupContainer from "./Components/Popup/Popup";
import TilesContainer from "./Components/Tiles/Tiles";
import "./scss/style.scss";

function App() {
   const [popupIsOpen, setOpenState] = useState(false);
   const [popupContent, setPopupContent] = useState({ text: "" });

   const openPopup = (content) => {
      setOpenState(true);
      setPopupContent(content);
   };

   const togglePopup = () => {
      setOpenState(!popupIsOpen);
   };

   return (
      <div className="App">
         <TilesContainer handleOpen={openPopup}>
            {popupIsOpen && (
               <PopupContainer
                  onTransitionEnd={togglePopup}
                  horizontalSpan={popupContent.horizontal_span}
                  verticalSpan={popupContent.vertical_span}
                  horizontalDir={popupContent.horizontal_dir}
                  verticalDir={popupContent.vertical_dir}
               >
                  {popupContent.text}
               </PopupContainer>
            )}
         </TilesContainer>
      </div>
   );
}

export default App;
