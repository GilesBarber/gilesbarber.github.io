//import { useCallback, useState } from "react";
import { useEffect, useState } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import styled from "styled-components";
import React from "react"

function App() {

   const TilesContainer = (props) => {
      const [error, setError] = useState(null);
      const [isLoaded, setIsLoaded] = useState(false);
      const [content, setContent] = useState([]);

      useEffect(() => {
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
      }, []);

      if (error) {
         return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
         return <div>Loading...</div>;
      } else {
         return (
            <div className="TilesContainer">
               {TilesList(content, props.handleOpen)}
            </div>
         );
      }
   };

   const theme = {
      colors: {
         bg1: 'green',
         bg2: 'blue',
         bg3: 'yellow'
      }
   }

   const GlobalStyles = createGlobalStyle`
   
   ul{
      width: 100%;
      margin: 0;
      padding: 0;
      display:inline-grid;
      grid-template-columns: auto auto auto; 
      list-style-type:none;
   }


   `

   const Item = styled.li`
   
   box-shadow: 0px 0px 20px rgb(0 0 0 / 30%);
    cursor: pointer;
    border-color: rgba(0, 0, 0, 0.2) !important;
    border: 0px;
    padding: 0;
    border-radius: 0 !important;
    margin: 0;

    &:nth-of-type(1){background-color:${({ theme }) => theme.colors.bg1}}
    &:nth-of-type(2){background-color:${({ theme }) => theme.colors.bg2}}
    &:nth-of-type(3){background-color:${({ theme }) => theme.colors.bg3}}
    button{
      background-color: transparent;
      width:100%;

    }
   `;

   const TilesList = (content, callback) => {
      const list = content.map((element) => (
         <Item key={element.title}>
            <TileButton content={element} handleOpen={callback}>
               {element.title}
            </TileButton>
         </Item>
      ));

      return <ul>{list}</ul>;
   };

   const TileButton = (props) => {
      const handleClick = () => {
         props.handleOpen(props.content);
      };
      return (
         <button className="button tile__button" onClick={handleClick}>
            <h2 className="button__title">{props.children}</h2>
            <div className="tile__icon"></div>
         </button>
      );
   }

   const openPopup = (props) => {
      return null
   }

   const popupIsOpen = (props) => {
      return null
   }

   const PopupContainer = (props) => {
      return null
   }

   const togglePopup = (props) => {
      return null
   }

   const popupContent = (props) => {
      return null
   }

   return (
      <ThemeProvider theme={theme}>
         <div className="App">
            <GlobalStyles />
            <TilesContainer handleOpen={openPopup}></TilesContainer>
            {popupIsOpen && (
               <PopupContainer onTransitionEnd={togglePopup}>
                  {popupContent.text}
               </PopupContainer>
            )}
         </div>
      </ThemeProvider>
   );
}
export default App;