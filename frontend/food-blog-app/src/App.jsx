import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import MainNavigation from './components/MainNavigation';
import axios from 'axios';
import AddFoodRecipe from './pages/AddFoodRecipe'
import EditRecipe from './pages/EditRecipe';

// Define the loader function that fetches the recipes
const getAllRecipes = async () => {
  let allRecipes = [];
  await axios.get(' https://food-recipe-app-9aeddc513b74.herokuapp.com/recipe')
    .then(res => {
      allRecipes = res.data;  // Make sure res.data contains the recipes
    })
    .catch(err => console.log(err));
  return allRecipes;  // This is what will be passed to the component via useLoaderData
};

const getMyRecipes=async()=>{
  let user=JSON.parse(localStorage.getItem("user"))
  let allRecipes=await getAllRecipes()
  return allRecipes.filter(item=> item.createdBy===user._id)     //filter my recipes and show it at my recipes link
}

const getFavRecipes=()=>{
  return JSON.parse(localStorage.getItem("fav"))  //fav we have attach in RecipeItems
}

// Set up the router with routes and loaders
const router = createBrowserRouter([
  {
    path: '/',                                    //navbar has these links
    element: <MainNavigation />,
    children: [
      {
        //index: true,  // This is equivalent to the "Home" route or use path:'/'
        path: '/',
        element: <Home />,
        loader: getAllRecipes,  // Attach the loader here with home component and then fetch using useLoader Data
      },
      {
        path: '/myRecipe',
        element: <Home />,
        loader: getMyRecipes
      },
      {
        path: '/favRecipe',
        element: <Home />,             
        loader: getFavRecipes
      },
      {
        path: '/addRecipe',
        element: <AddFoodRecipe />
      },
      {
        path: '/editRecipe/:id',
        element: <EditRecipe />
      },
    ],
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} /> 
  );
}













// import React, { useState, useEffect } from 'react';
// import './App.css';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Home from './pages/Home';
// import MainNavigation from '../components/MainNavigation';
// import axios from 'axios';

// // Define the component where data will be fetched
// const HomePage = () => {
//   const [recipes, setRecipes] = useState([]); // Store the recipes
//   const [loading, setLoading] = useState(true); // Track the loading state
//   const [error, setError] = useState(null); // Track if there's an error

//   // Fetch recipes when the component mounts
//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/recipe');
//         setRecipes(response.data); // Set the fetched data
//       } catch (err) {
//         setError(err); // Handle errors if any
//       } finally {
//         setLoading(false); // Set loading to false after the data is fetched
//       }
//     };

//     fetchRecipes();
//   }, []); // Empty dependency array ensures this effect runs only once when the component mounts

//   if (loading) {
//     return <div>Loading...</div>; // Display loading state while data is being fetched
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>; // Handle any error that occurred during fetch
//   }

//   // Pass the recipes to your Home component once data is fetched
//   return <Home recipes={recipes} />;
// };

// // Set up the router with routes
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <MainNavigation />,
//     children: [
//       {
//         path: '/',
//         element: <HomePage />, // Use the HomePage component to fetch and display recipes
//       },
//     ],
//   },
// ]);

// export default function App() {
//   return (
//     <RouterProvider router={router} />
//   );
// }
