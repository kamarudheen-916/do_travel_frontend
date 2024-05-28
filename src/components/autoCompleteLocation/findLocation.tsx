// import  { useEffect, useRef } from 'react'

// const apiKey = 'AIzaSyARZ7aQnRhh5l718d7NYb_ro1_RiVgxhlo';
// const mapApiJs = 'https://maps.googleapis.com/maps/api/js';
// const geocodeJson = 'https://maps.googleapis.com/maps/api/geocode/json';

// function loadAsyncScript(src:any) {
//     return new Promise(resolve => {
//       const script = document.createElement("script");
//       Object.assign(script, {
//         type: "text/javascript",
//         async: true,
//         src
//       })
//       script.addEventListener("load", () => resolve(script));
//       document.head.appendChild(script);
//     })
//   }



// function findLocation() {

//     const searchInputs = useRef(null)
//     const initMapScript = ()=>{
//         if(window.google){
//             return Promise.resolve()
//         }
//         const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
//         return loadAsyncScript(src)
//     }

//     const onChangeAddress =(autocomplete:any)=>{

//     }

//     const initAutocomplete =()=>{
//         if(!searchInputs.current)return;
//         const Autocomplete = new window.google.maps.places.Autocomplete(searchInputs.current);
//         Autocomplete.setFields(['address_component','geometry'])
//         // Autocomplete.addListener('place_changed',()=>onChangeAddress(Autocomplete))
//     }

//     useEffect(()=>{
//         initMapScript().then(()=>initAutocomplete())
//     },[])

//   return (
//     <div>
//         <input ref={searchInputs} type="text"  placeholder='add location'/>
//     </div>
//   )
// }

// export default findLocation
