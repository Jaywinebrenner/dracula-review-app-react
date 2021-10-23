
import React, { useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import AddDraculaModal from './AddDraculaModal';
import AverageRating from './AverageRating';
import firebase from "./firebase"

 /* eslint-disable */ 


function Home({dropDownValue, handleLoading}) {

    const [ allDraculas, setAllDraculas] = useState('')
    const [ isAddDraculaModalShowing, setIsAddDraculaModalShowing] = useState(false)

    const toggleAddDraculaModal = () => {
      setIsAddDraculaModalShowing((prevExpanded) => !prevExpanded)
  } 
  const draculasRef = firebase.firestore().collection("draculas")
  const reviewsRef = firebase.firestore().collection("reviews")


  
  const getDraculas = () => {
    handleLoading(true)
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data())
      })
      setAllDraculas(items)
      console.log("FB DRACULAS", allDraculas)
      handleLoading(false)
    })
  }

    useEffect(() => {

      draculasRef.onSnapshot(snap => {
      const data = snap.docs.map(doc => doc.data())
      setAllDraculas(data)
      console.log("ALL DRACULAS", allDraculas)
      handleLoading(false)
      });

      reviewsRef.onSnapshot(snap => {
        const data = snap.docs.map(doc => doc.data())
        // let dracReviews = await reviews.filter((rev) => rev.dracula_id === thisDraculaId)
        // setThisDracsReviews([...dracReviews])
        // console.log("FB reviews", allDraculas)
        // handleLoading(false)
        });

      



      return null
   
      // getDraculas()


      // handleLoading(true)
      // const fetchData = async () => {
      //     const response = await fetch(`http://localhost:3000/api/v1/draculas`);

      //     const draculas = await response.json();
      //     console.log("dracula res", draculas)
      //     setAllDraculas(draculas);
         
      //   };
      //   fetchData()
      //   const fetchAllReviews = async () => {
      //     try {
      //         const response = await fetch(`http://localhost:3000/api/v1/reviews`);
      //         const reviews = await response.json();
      //         // let dracReviews = await reviews.filter((rev) => rev.dracula_id === thisDraculaId)
      //         // setThisDracsReviews([...dracReviews])
      //         console.log("ALL REVIEWS", reviews)
      //         let scores = await reviews.map((rev) => rev.score)
      //         console.log("ALL SCROES", scores)

      //     } catch (error) {
      //         console.log(error)
      //     }

      //   }
      //   fetchAllReviews()
      //   handleLoading(false)
    
      }, []);



      console.log("dropdown", dropDownValue)

      const filterSet = () => {
        if(dropDownValue === "Alphabetize Draculas") {
          allDraculas.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        })
          // setAllDraculas(allDraculas);
        }
        if(dropDownValue === "Most Popular Draculas") {
          allDraculas.sort(function(a, b){
            if(b.scores < a.scores) { return -1; }
            if(b.scores > a.score) { return 1; }
            return 0;
        })
        }        
        if(dropDownValue === "Least Popular Draculas") {
          allDraculas.sort(function(a, b){
            if(a.scores < b.scores) { return -1; }
            if(a.scores > b.score) { return 1; }
            return 0;
        })
        }
      }
      filterSet();


  return (
    <div className="home">
      <div className="subheader-wrapper">
        <h1 className="subheader">Draculas to Review</h1>
        <FontAwesomeIcon onClick={toggleAddDraculaModal} className="plus-drac" size='3x' icon={faPlusCircle} />
      </div>
      <div className="dracula-wrap">
        {allDraculas && allDraculas.map((dracula) => (
          <div key={dracula.id}>
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
            <AverageRating size={"1x"} rating={dracula.scores}/>
          </div>
     ))}
        </div>
      {isAddDraculaModalShowing && <AddDraculaModal toggleAddDraculaModal={toggleAddDraculaModal}/>}
      </div>
  );
}

export default Home;
