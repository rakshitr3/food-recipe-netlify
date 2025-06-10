import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddFoodRecipe(e) {
    const [recipeData, setRecipeData] = useState({
        title: '',
        time: '',
        ingredients: [],
        instructions: '',
        file: null,
    });
    const navigate = useNavigate()
    const onHandleChange = (e) => {
        let val = (e.target.name === "ingredients") ? e.target.value.split(",") : (e.target.name === "file") ? e.target.files[0] : e.target.value
        setRecipeData(pre => ({ ...pre, [e.target.name]: val }))
    }
    const onHandleSubmit = async (e) => {             //don't forget to use async else you always face an issue as data wont upload instantly 
        e.preventDefault()
        console.log(recipeData)
        await axios.post(" https://food-recipe-render.onrender.com/recipe", recipeData,{
            headers:{
                'Content-Type':'multipart/form-data',           
                'authorization':'bearer '+localStorage.getItem("token")        //to verify this router with token so we can access it only after login
            }                                                                      //The Bearer token is a type of access token that is typically used for authentication in web applications
        })
            .then(() => navigate("/"))
            .catch((error) => {
                 console.error("Error submitting recipe data: ", error);
                alert("Something went wrong! Please try again.");
            });
    }
    return (
        <>
            <div className='container'>
                <form className='form' onSubmit={onHandleSubmit}>
                    <div className='form-control'>
                        <label>Title</label>
                        <input type="text" className='input' name="title" required value={recipeData.title} onChange={onHandleChange}></input>
                    </div>
                    <div className='form-control'>
                        <label>Time</label>
                        <input type="text" className='input' name="time" required onChange={onHandleChange}></input>
                    </div>
                    <div className='form-control'>
                        <label>Ingredients</label>
                        <textarea type="text" className='input-textarea' name="ingredients" rows="5" required onChange={onHandleChange}></textarea>
                    </div>
                    <div className='form-control'>
                        <label>Instructions</label>
                        <textarea type="text" className='input-textarea' name="instructions" rows="5" required onChange={onHandleChange}></textarea>
                    </div>
                    <div className='form-control'>
                        <label>Recipe Image</label>
                        <input type="file" className='input' name="file" required onChange={onHandleChange}></input>
                    </div>
                    <button type="submit">Add Recipe</button>
                </form>
            </div>
        </>
    )
}