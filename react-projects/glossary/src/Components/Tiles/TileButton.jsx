const TileButton = (props) => {
   const handleClick = () => {
      props.handleOpen(props.content);
   };
   return (
      <button className="button button__tile" onClick={handleClick}>
         <h2 className="button__title">{props.children}</h2>
         <div className="tile__icon"></div>
      </button>
   );
};

export default TileButton;
