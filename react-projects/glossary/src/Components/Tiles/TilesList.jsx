import styled from "styled-components";
import TileButton from "./TileButton";

const Item = styled.li``;

const TilesList = (props) => {
   if (props.content.tiles) {
      const list = props.content.tiles.map((element) => (
         <Item key={element.title}>
            <TileButton content={element} handleOpen={props.handleOpen}>
               {element.title}
            </TileButton>
         </Item>
      ));
      return <ul>{list}</ul>;
   } else {
      return "";
   }
};

export default TilesList;
