import { MdLocationOn } from "react-icons/md"; 
import { HiCalendar, HiPlus, HiSearch } from "react-icons/hi"
import { useState } from "react";
import { HiMinus } from "react-icons/hi";
import useOutsideClick from "../hooks/useOutsideClick";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';


function Header() {
    // Declare a state variable 'destination' with an initial empty string value
  // and a function 'setDestination' to update its value
  const [destination, setDestination] = useState("");
   // Declare a state variable 'openOptions' with an initial value of 'false'
  const [openOptions, setOpenOptions] = useState(false); 

   // Declare a state variable 'options' with an initial value containing the number of adults, children, and rooms
  // Use 'setOptions' to update these values
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

const handleOptions = (name, operation) => {
setOptions(prev => {
  return {
    ...prev, 
    [name]: operation === "inc" ? options[name] +1 : options[name] -1
  }
})
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

}

export default Header; 

function GuestOptionsList({ options, handleOptions, setOpenOptions}) {

  // Create a reference to the dropdown element to detect outside clicks
  const optionsRef = useRef()

  // This custom hook will listen for clicks outside the "guestOptions" dropdown
  // If a click happens outside, the dropdown will be closed by setting setOpenOptions(false)
  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false)); 
    return (

      // Attach the ref to the div containing the dropdown options for guest selection
      <div className="guestOptions" ref={optionsRef}>
      <OptionItem 
      handleOptions={handleOptions}
      type="adult" 
      options={options} 
      miniList={1}
      />
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
        // Main container for the guest option item
        <div className="guestOptionItem">
            {/* Display the type of option (e.g., "Adults", "Children", etc.) */}
            <span className="optionText">{type}</span>

            {/* Container for the counter buttons and display */}
            <div className="optionCounter">
                {/* Button to decrease the option count */}
                <button 
                    onClick={() => handleOptions(type, "dec")} // Call handleOptions with 'dec' action to decrease the count
                    className="optionCounterBtn"
                    disabled={options[type] < minLimit} // Disable button if count is less than the minimum limit
                >
                    {/* Minus icon inside the button */}
                    <HiMinus className="icon" />
                </button>

                {/* Display the current count for the option */}
                <span className="optionCounterNumber">{options[type]}</span>

                {/* Button to increase the option count */}
                <button 
                    onClick={() => handleOptions(type, "inc")} // Call handleOptions with 'inc' action to increase the count
                    className="optionCounterBtn"
                >
                    {/* Plus icon inside the button */}
                    <HiPlus className="icon" />
                </button>
            </div>
        </div>
    );
}

 
  