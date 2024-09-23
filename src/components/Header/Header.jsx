import { MdLocationOn } from "react-icons/md"; 
import { HiCalendar, HiPlus, HiSearch } from "react-icons/hi"
import { useState } from "react";
import { HiMinus } from "react-icons/hi";
import useOutsideClick from "../hooks/useOutsideClick";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';


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



// Function to handle changes in options (like incrementing or decrementing the value of a certain option).
// 'name' refers to the option to modify, and 'operation' determines whether to increase ('inc') or decrease ('dec') its value.

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


      {/* Container for the search elements in the header */}
      <div className="headerSearch">        
      <div className="headerSearchItem"> 



        {/* First search item: Location input field */}   
      <MdLocationOn className="headerIcon locationIcon" />


       {/* Input field for entering the destination */}
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


      {/* Second search item: Date selection */}
      <div className="headerSearchItem">

         {/* Location icon (using MdLocationOn component) */}
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


{/* A separator element between other elements */}
        <span className="seperator"></span>


        {/* Start of a container for a search item in the header */}
      </div>


       {/* The div responsible for showing the guest options (adults, children, rooms). 
      On click, it toggles the state `openOptions`, which controls the visibility 
      of the dropdown menu. */}
      <div className="headerSearchItem">
      <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}
      > {options.adult} adult &bull; {options.children} children &bull; 
       {options.room} room
      </div>


      {/* If `openOptions` is true, the GuestOptionsList component is rendered. 
      This component allows users to modify the number of guests and rooms */}
      {openOptions && (
      <GuestOptionsList setOpenOptions={setOpenOptions} 
      handleOptions={handleOptions} 
      options={options}/>
    ) }


    {/* Separator between the options section and the search button */}
      <span className="seperator"></span>
      </div>
      <div className="headerSearchItem">


        {/* Search button section */}
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
      handleOptions={handleOptions}   /* Function passed to handle changes to options */
      type="adult"    /* Type of option, "adult" in this case */
      options={options}     /* State or props passed as options (e.g., number of adults) */
      miniList={1}      /* Possibly a prop to customize the list, here it's set to 1 */
      />



// Rendering the first OptionItem component for 'children' options
      <OptionItem 


// Function to handle changes in options (likely updates the parent component state)
      handleOptions={handleOptions}
      type="children" 

      // The type of option being handled, in this case, it's for "children"
      options={options} 


      // A prop likely used to limit or control the display of a mini-list (perhaps for a dropdown or subset of options)
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

 
  