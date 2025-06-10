import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditRecipe(e) {                           //same as AddFoodRecipe.jsx
    const [recipeData, setRecipeData] = useState({
        title: '',
        time: '',
        ingredients: [],
        instructions: '',
        file: null,
    });

    const navigate = useNavigate()
    const{id}=useParams()

    useEffect(()=>{
        const getData=async()=>{
            await axios.get(` https://food-recipe-render.onrender.com/recipe/${id}`)    //first fetch the data by specific id or the user whose data we want to edit
            .then(response=>{
                let res=response.data
                setRecipeData({
                    title:res.title,
                    ingredients:res.ingredients.join(","),  //as ingredients is an array so join it to make it string(split will make string to array)
                    instructions:res.instructions,
                    time:res.time
                })
            })
        }
        getData()
    },[])
    const onHandleChange = (e) => {
        let val = (e.target.name === "ingredients") ? e.target.value.split(",") : (e.target.name === "file") ? e.target.files[0] : e.target.value
        setRecipeData(pre => ({ ...pre, [e.target.name]: val }))
    }
    const onHandleSubmit = async (e) => {             //don't forget to use async else you always face an issue as data wont upload instantly 
        e.preventDefault()
        console.log(recipeData)
        await axios.put(` https://food-recipe-render.onrender.com/recipe/${id}`, recipeData,{
            headers:{
                'Content-Type':'multipart/form-data',           
                'authorization':'bearer '+localStorage.getItem("token")        //to verify this router with token so we can access it only after login
            }                                                                      //The Bearer token is a type of access token that is typically used for authentication in web applications
        })
            .then(() => navigate("/myRecipe"))
    }
    return (
        <>
            <div className='container'>
                <form className='form' onSubmit={onHandleSubmit}>
                    <div className='form-control'>
                        <label>Title</label>
                        <input type="text" className='input' name="title" value={recipeData.title} onChange={onHandleChange}></input>
                    </div>
                    <div className='form-control'>
                        <label>Time</label>
                        <input type="text" className='input' name="time" value={recipeData.time} onChange={onHandleChange}></input>
                    </div>
                    <div className='form-control'>
                        <label>Ingredients</label>
                        <textarea type="text" className='input-textarea' name="ingredients" rows="5" value={recipeData.ingredients} onChange={onHandleChange}></textarea>
                    </div>
                    <div className='form-control'>
                        <label>Instructions</label>
                        <textarea type="text" className='input-textarea' name="instructions" rows="5" value={recipeData.instructions} onChange={onHandleChange}></textarea>
                    </div>
                    <div className='form-control'>
                        <label>Recipe Image</label>
                        <input type="file" className='input' name="file" onChange={onHandleChange}></input>
                    </div>
                    <button type="submit">Edit Recipe</button>
                </form>
            </div>
        </>
    )
}