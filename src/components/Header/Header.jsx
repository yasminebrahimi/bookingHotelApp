import { MdLocationOn } from "react-icons/md"; 
import { HiCalendar, HiPlus, HiSearch } from "react-icons/hi"
import { useState } from "react";
import { HiMinus } from "react-icons/hi";


function Header() {
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false); 
  const [options, setOptions] = useState({
      adult: 1,
      children: 0,
      room: 1,
  }); 



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
 
  