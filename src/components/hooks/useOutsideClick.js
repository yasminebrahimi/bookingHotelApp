import { useEffect } from "react";

// Custom hook to handle clicks outside of a specific element (except for an element with a specific ID).
export default function useOutsideClick(ref, exceptionId, cb) {
    
    // useEffect hook to handle side-effects when the component mounts and unmounts.
    useEffect(() => {
        
        // Function to be called when a "mousedown" event is detected.
        function handleOutsideClick(event) {
            // Check if the ref (element) exists and contains the event target (i.e., clicked element).
            // Also, ensure the clicked element's id is not the exceptionId (an allowed element to be clicked).
            if (ref.current && ref.current.contains(event.target) &&
                event.target.id !== exceptionId) {
                // If the conditions are met, execute the callback function (cb).
                cb();
            }
        }

        // Add event listener to detect mousedown (i.e., click) anywhere on the document.
        document.addEventListener("mousedown", handleOutsideClick);

        // Cleanup function to remove the event listener when the component unmounts or the dependencies change.
        return () => {
            // Make sure to remove the "mousedown" event listener to avoid memory leaks.
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [ref, cb]); // useEffect dependencies: the effect will re-run if ref or cb changes.
}
