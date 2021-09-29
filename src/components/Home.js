
import React, { useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import AddDraculaModal from './AddDraculaModal';

 /* eslint-disable */ 


function Home() {

    const [ allDraculas, setAllDraculas] = useState('')
    const [ isAddDraculaModalShowing, setIsAddDraculaModalShowing] = useState(false)

    const toggleAddDraculaModal = () => {
      setIsAddDraculaModalShowing((prevExpanded) => !prevExpanded)
  } 

    useEffect(() => {

        const fetchData = async () => {
          const response = await fetch(`http://localhost:3000/api/v1/draculas`);

          const draculas = await response.json();
          console.log("dracula res", draculas)
          setAllDraculas(draculas);
        };
        fetchData();
    
      }, []);


  return (
    <div className="home">
      <div className="subheader-wrapper">
        <h1 className="subheader">Draculas to Review</h1>
        <FontAwesomeIcon onClick={toggleAddDraculaModal} className="plus-drac" size='3x' icon={faPlusCircle} />
      </div>
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
      {isAddDraculaModalShowing && <AddDraculaModal toggleAddDraculaModal={toggleAddDraculaModal}/>}
      </div>
  );
}

export default Home;
