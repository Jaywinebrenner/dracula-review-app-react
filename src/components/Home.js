
import React, { useEffect, useState} from 'react'
// import axios from 'axios'
import { Link } from "react-router-dom";

 /* eslint-disable */ 


function Home() {

    const [ allDraculas, setAllDraculas] = useState('')

    useEffect(() => {
      
        const fetchData = async () => {
          const response = await fetch(`http://localhost:3000/api/v1/draculas`);

          const draculas = await response.json();
          console.log("dracula res", draculas)
          setAllDraculas(draculas);
        };
        fetchData();
    
      }, []);


    // const renderDraculas = () => {
    //     console.log("All Dracs",allDraculas)
   
    //         allDraculas.map((dracula)=> {
    //             console.log(dracula.name)
    //         })
    // }

  return (
    <div className="home">
      <h1 className="subheader">Draculas to Review</h1>
      <div className="dracula-wrap">
        {allDraculas && allDraculas.map((dracula) => (
          <div  key={dracula.id}>
            <Link to={{
              pathname: `/detail/${dracula.id}`,
              state: {
                allDraculas: allDraculas,
                thisDraculaId: dracula.id
              }

            }}>
            <img className="dracula-image" src={dracula.image_url} />
            </Link>
            <p>{dracula.name}</p>
          </div>
     ))}
        </div>
      </div>
  );
}

export default Home;
