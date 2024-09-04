import { MdLocationOn } from "react-icons/md"; 
import { HiCalendar, HiPlus, HiSearch } from "react-icons/hi"
import { useState } from "react";
import { HiMinus } from "react-icons/hi";




// Define the Header component
function Header() {
  // State to keep track of the destination input by the user
  const [destination, setDestination] = useState("");
  
  // State to manage whether the options menu is open or closed
  const [openOptions, setOpenOptions] = useState(false); 
  
  // State to manage the number of adults, children, and rooms
  const [options, setOptions] = useState({
      adult: 1,     // Initial number of adults
      children: 0,  // Initial number of children
      room: 1,      // Initial number of rooms
  });

  // Functionality for the component would be added here

  return (
      // JSX code for rendering the component would be added here
  );
}


  return (
    <div className="header">
      <div className="headerSearch">        
      <div className="headerSearchItem">    
      <MdLocationOn className="headerIcon locationIcon" />
      <input 
      value={destination}
      onChange={(e) => setDestination(e.target.value)}
      type="text"
      placeholder="where to go"
      className="headerSearchInput"
      name="destination"
      id="destination"
      />
      <span className="seperator"></span>
      </div>
      <div className="headerSearchItem">
        <HiCalendar className="headerIcon dateIcon"/>
        <div className="dateDropDown">2023/06/23</div>
        <span className="seperator"></span>
      </div>
      <div className="headerSearchItem">
      <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}
      > 1 adult &bull; 2 children &bull; 1 room
      </div>
      {openOptions && <GuestOptionsList options={options}/>}
      <span className="seperator"></span>
      </div>
      <div className="headerSearchItem">
        <button className="headerSearchBtn">
            <HiSearch className="headerIcon" />
        </button>
      </div>
    </div>
    </div>
  ); 
}

export default Header; 




function GuestOptionsList() {
    return (
      <div className="guestOptions">
      <OptionItem />
      <OptionItem />
      <OptionItem />
      </div>
    );
  }
  


  function OptionItem(){
    return (
        <div className="guestOptionItem">
        <span className="optionText">Adult</span>
        <div className="optionCounter">
          <button className="optionCounterBtn">
              <HiMinus className="icon" />
          </button>
          <span className="optionCounterNumber">2</span>
          <button className="optionCounterBtn">
          <HiPlus className="icon" />
          </button>
        </div>
      </div>
    ); 
  }
 
  