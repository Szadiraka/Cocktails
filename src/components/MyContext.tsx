import React,{ createContext } from 'react';
import {useEffect,useState} from 'react';
import {Filters,Drink} from './Types';
import { ContentProps } from './Content/Content';


export const ContextData= createContext<ContentProps>({drinks:[],filters:{ searchByName: "", filterByGlass: "All", filterByCategory: "All",
                                                 filterByAlcoholic: "All", filterByIngredient: "All",},saveChanges:()=>{}});

const MyContext = ({children}:{children:React.ReactNode}) => {

      
  useEffect(()=>{
    const func =async()=>{      
        try{
          const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
          if(!response.ok){
            throw new Error('Something went wrong');
          }else{
            const {drinks}=await response.json();                     
             setDrinks(drinks);
             setFiltredDrinks(drinks);
          }
         
        }catch(error){
            console.log(error);
        }   
  
    };
    func();
},[]);

const [filters,setFilters]=useState<Filters>({ searchByName: "",
                                              filterByGlass: "All",
                                              filterByCategory: "All",
                                              filterByAlcoholic: "All",
                                              filterByIngredient: "All",
                                            });
const [drinks, setDrinks] = useState<Drink[]>([]);
const [filtredDrinks, setFiltredDrinks] = useState<Drink[]>([]);

const saveChanges=(filter_:Filters)=>{
  setFilters(filter_);
let newFiltredDrinks=[...drinks];
                    console.log("New Arrow:",newFiltredDrinks);
// FilterByGlass
if(filter_.filterByGlass !== "All")
 newFiltredDrinks = newFiltredDrinks.filter(drink=>{return drink.strGlass?.toLowerCase() === filter_.filterByGlass?.toLowerCase()});

//  FilterByCategory
if(filter_.filterByCategory !== "All")
  newFiltredDrinks = newFiltredDrinks.filter(drink=>{return drink.strCategory?.toLowerCase() === filter_.filterByCategory?.toLowerCase()});

// FilterByAlcoholic
if(filter_.filterByAlcoholic !== "All")
  newFiltredDrinks = newFiltredDrinks.filter(drink=>{return drink.strAlcoholic?.toLowerCase() === filter_.filterByAlcoholic?.toLowerCase()});
 
// FilterByIngredient
if(filter_.filterByIngredient !== "All"){
      newFiltredDrinks = newFiltredDrinks.filter(drink =>{          
         return Object.entries(drink).some(([key,value])=>
               key.startsWith('strIngredient') &&
               value?.toLowerCase().includes(filter_.filterByIngredient?.toLowerCase()))
      });
}
 console.log("After Ingredient:",newFiltredDrinks);
// FilterByName
if(filter_.searchByName !== "")
  newFiltredDrinks = newFiltredDrinks.filter(drink=>{return drink.strDrink?.toLowerCase().includes(filter_.searchByName?.toLowerCase())});
  
  
  console.log(newFiltredDrinks);  
  setFiltredDrinks(newFiltredDrinks); 
}


  return (
    <ContextData.Provider value={{filters, drinks: filtredDrinks, saveChanges}}>
       {children}
    </ContextData.Provider>
  )
}

export default MyContext;
