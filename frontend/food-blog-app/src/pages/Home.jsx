import React, { useState } from 'react';
import foodRecipe from '../assets/foodRecipe.png';
import RecipeItems from '../components/RecipeItems';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import InputForm from '../components/inputForm';

export default function Home() {

  const navigate=useNavigate()  
  
  const [isOpen,setIsOpen]=useState(false)

  const addRecipe=()=> {
    let token=localStorage.getItem("token")
    if(token){
    navigate("/addRecipe")
  }
  else{
    setIsOpen(true)            //if user wont authorize then open dialog box
  }
}
  return (
    <>
      <section className='home'>
        <div className='left'>
          <h1>Food Recipe</h1>
          <h5>It is a long established fact that a reader will be distracted by the readable content...</h5>
          <button onClick={addRecipe}>Share your recipe</button>      {/*as this is button not a link so useNavigate use here*/}
        </div>
        <div className='right'>
          <img src={foodRecipe} width="320px" height="300px" alt="Food Recipe" />
        </div>
      </section>
      <div className='bg'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#d4f6e8" fillOpacity="1" d="M0,32L40,32C80,32,160,32,240,58.7C320,85,400,139,480,149.3C560,160,640,128,720,101.3C800,75,880,53,960,80C1040,107,1120,181,1200,213.3C1280,245,1360,235,1400,229.3L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
        </svg> {/*use getwaves.io*/}
      </div>
       {(isOpen) && <Modal onClose={()=> setIsOpen(false)}>        {/*open popup box*/}
                <InputForm setIsOpen={()=>setIsOpen(false)}/>     {/*same as we use in navbar*/}  {/*open input form*/}
              </Modal>}  

      {/* Pass the allRecipes to the RecipeItems component */}
      <div className='recipe'>
        <RecipeItems />                       {/*this component will create cards*/}
      </div>
    </>
  );
}
