import { useEffect, useState } from "react";
import styled from "styled-components";
const number_tiles = 3;
const tile_size = 100 / number_tiles;

const Popup = styled.div`
   background: beige;
   left: 0;
   position: absolute;
   top: 0;
   transition: all 0.5s ease-in-out;
   height: 0;
   width: ${tile_size}vmin;
`;

const PopupContainer = ({
   onTransitionEnd,
   children,
   horizontalSpan,
   verticalSpan,
   horizontalDir,
   verticalDir,
}) => {
   const [popupStyles, setPopupStyles] = useState({
      opacity: 1,
   });

   useEffect(() => {
      // on mount animate horizontal
      setPopupStyles({
         height: `${verticalSpan * tile_size}vmin`,
         width: `${tile_size}vmin`,
      });

      // delay 500ms animate vertical
      setTimeout(() => {
         setPopupStyles({
            height: `${verticalSpan * tile_size}vmin`,
            width: `${horizontalSpan * tile_size}vmin`,
         });
      }, 500);

      console.log(children);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const closePopup = () => {
      setPopupStyles({
         opacity: 0,
      });
   };

   const checkState = () => {
      if (popupStyles.opacity <= 0) {
         onTransitionEnd();
      }
   };

   return (
      <Popup
         className="tile__content"
         style={popupStyles}
         onTransitionEnd={checkState}
      >
         {children} <br />
         <button onClick={closePopup}>Close</button>
      </Popup>
   );
};

export default PopupContainer;
