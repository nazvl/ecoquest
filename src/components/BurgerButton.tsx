import { motion } from "framer-motion";
import { useState } from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import BurgerMenu from "./BurgerMenu";

const Burger = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [currentIcon, setCurrentIcon] = useState(false);

  function buttonClick() {
    setOpacity(0);
    setTimeout(() => {
      setCurrentIcon(!currentIcon);
      setIsClicked(!isClicked);
      setOpacity(1);
    }, 150);
  }

  return (
    <div className="relative md:hidden">
      <motion.button
        animate={{
          scale: isClicked ? 1.4 : 1.3,
          color: isClicked ? "darkgreen" : "black",
          opacity: opacity,
          transition: { duration: 0.2 },
        }}
        onClick={buttonClick}
        className="text-2xl"
      >
        {currentIcon ? <MenuOpenIcon /> : <MenuIcon />}
      </motion.button>
      
      {isClicked && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg z-50">
          <BurgerMenu />
        </div>
      )}
    </div>
  );
};

export default Burger;