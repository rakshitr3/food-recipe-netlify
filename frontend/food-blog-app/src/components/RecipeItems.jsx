import { Link, useLoaderData } from "react-router-dom";
import foodImg from "../assets/foodRecipe.png";
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";

export default function RecipeItems() {
  const recipes = useLoaderData()            //if we wont use loader function here then we need to pass get all recipes function as prop from parent or app.jsx to home.jsx then here
  const [allRecipes,setAllRecipes]=useState()

  let path = window.location.pathname === "/myRecipe" ? true : false   //edit only if user is on myRecipe page as on home we have recipes of all users
  
  let favItems=JSON.parse(localStorage.getItem("fav")) ?? []          //if no fav item then set favItems an empty array
  const [isFavRecipe,setIsFavRecipe]=useState(false)
  
  console.log(allRecipes)

  useEffect(()=>{
    setAllRecipes(recipes)
  },[recipes])                        //once we get data from backend using get all recipes fn (ref app.jsx) set it by setAllRecipes as we defined it empty initially

  const onDelete=async(id)=>{
    //alert("Are you sure you want to delete this recipe!!")   but this wont contain cancel button
    await axios.delete(` https://food-recipe-app-9aeddc513b74.herokuapp.com/recipe/${id}`)
    .then((res)=>console.log(res))
    setAllRecipes(recipes.filter(recipe=>recipe._id !== id))      //for refreshing the page once data deleted as component rerender on state change //updata part handled by EditRecipe.jsx
    let filterItem=favItems.filter(recipe=> recipe._id !== id)     //filter favItems array on same criteria as above with id given by user
    localStorage.setItem("fav",JSON.stringify(filterItem))
  }

  const favRecipe=(item)=>{                                                 //refer app.jsx also
    let filterItem=favItems.filter(recipe=> recipe._id !== item._id)
     favItems=favItems.filter(recipe=>recipe._id==item._id).length===0 ? [...favItems,item] : filterItem   //check if the item we select is already there in favItems or not if not then add else remove by line 35
      
     localStorage.setItem("fav",JSON.stringify(favItems))      //set updated favItems in local storage
      setIsFavRecipe(pre=> !pre)          //if false then make it true else make it false just for rerendering or refresh as state change
    }

  return (
    <>
      <div className="card-container">
        {
          allRecipes?.map((item, index) => {
            return (
              <div key={index} className="card">
                <img src={` https://food-recipe-app-9aeddc513b74.herokuapp.com/images/${item.coverImage}`} width="120px" height="100px" alt={item.title} />         {/* src={foodImg} for same image hardcoded As we made public folder static so we just use image here not public folder*/}
                <div className="card-body">
                  <div className="title">{item.title}</div>
                  <div className="icons">
                    <div className="timer"><BsStopwatchFill />{item.time}</div>
                    {(!path) ? <FaHeart onClick={()=>favRecipe(item)}
                      style={{ color:(favItems.some(res=> res._id === item._id)) ? "red" : ""}}
                      /> :          //on home page show only heart icon or add to favorite and on myRecipe page show edit and delete both
                      <div className="action">
                       <Link to={`/editRecipe/${item._id}`} className="editIcon"> <FaEdit /> </Link>
                        <MdDelete onClick={()=>onDelete(item._id)} className="deleteIcon" />
                      </div>
                    }
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}