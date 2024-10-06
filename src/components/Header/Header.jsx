import { MdLocationOn } from "react-icons/md"; 
import { HiCalendar, HiPlus, HiSearch } from "react-icons/hi"
import { useState } from "react";
import { HiMinus } from "react-icons/hi";
import useOutsideClick from "../hooks/useOutsideClick";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";


function Header() {
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false); 
  const [options, setOptions] = useState({
      adult: 1,
      children: 0,
      room: 1,
  }); 
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'traveling-date-range',
    }, 
  ]); 
  const [openDate, setOpenDate] = useState(false);  
  const navigate = useNavigate(); 
  const [searchParams, setSearchParams] = useSearchParams();
  const handleOptions = (name, operation) => {
setOptions(prev => {
  return {
    ...prev, 
    [name]: operation === "inc" ? options[name] +1 : options[name] -1
  }
}); 
  }; 
}; 


const handleSearch = ()=> {
  const encodedParams = createSearchParams({
    date: JSON.stringify(date), 
    destination, 
    oprions: JSON.stringify(options), 
  }); 
  //mote: => setSearchParams(encodedParams); 
  navigate({
    pathname: "/hotels", 
    search: encodedParams.toString(), 
  }); 
};
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
        <div onClick={() => setOpenDate(!openDate)} className="dateDropDown">
        ${format(new Date(date[0].startDate), "MM/dd/yyyy")} to
         ${format(new Date(date[0].endDate), "MM/dd/yyyy")}
          </div>
          {openDate && (
            <DateRange 
            onChange={item => setDate([item.selection])} 
          ranges={date} 
          className="date"
          minDate={new Date()}
          moveRangeOnFirstSelection={true}
          />
        )}
        <span className="seperator"></span>
      </div>
      <div className="headerSearchItem">
      <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}
      > {options.adult} adult &bull; {options.children} children &bull; 
       {options.room} room
      </div>
      {openOptions && (
      <GuestOptionsList setOpenOptions={setOpenOptions} 
      handleOptions={handleOptions} 
      options={options}/>
    ) }
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



export default Header; 

function GuestOptionsList({ options, handleOptions, setOpenOptions}) {
  const optionsRef = useRef()
  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false)); 
    return (
      <div className="guestOptions" ref={optionsRef}>
      <OptionItem 
      handleOptions={handleOptions}  
      type="adult"   
      options={options} 
      miniList={1}     
      />



// Rendering the first OptionItem component for 'children' options
      <OptionItem 



      handleOptions={handleOptions}
      type="children" 

      options={options} 
      miniList={1}
      />
      <OptionItem 
      handleOptions={handleOptions}
      type="room" 
      options={options}
       miniList={1}
       />
      </div>
    );
  }

  function OptionItem(options, type, minLimit, handleOptions) {
    return (
        <div className="guestOptionItem">
            <span className="optionText">{type}</span>
            <div className="optionCounter">
                <button 
                    onClick={() => handleOptions(type, "dec")} 
                    className="optionCounterBtn"
                    disabled={options[type] < minLimit} 
                >
                    <HiMinus className="icon" />
                </button>
                <span className="optionCounterNumber">{options[type]}</span>
                <button 
                    onClick={() => handleOptions(type, "inc")} 
                    className="optionCounterBtn"
                >
                    <HiPlus className="icon" />
                </button>
            </div>
        </div>
    );
}





 
  