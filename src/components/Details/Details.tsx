
import { useParams , Link } from 'react-router-dom';
import {useContext, useState ,useEffect } from 'react';
import { ContextData } from '../MyContext';
import { Drink } from '../Types';
import './Details.css';

type Ingredient={
  ingredient:string;
  measure:string;
  [key:string]:string;
}

const Details = () => {
const {id}= useParams();
const {drinks} = useContext(ContextData);
const [currentDrink, setCurrentDrink] = useState<Drink | null>(null);
const [ingredients, setIngredients] = useState<Ingredient[]>([]);

useEffect(() => {
  const drink = drinks.find((drink) => drink.idDrink === id);
  if(drink){
    setCurrentDrink(drink || null);
    //получить новый массив 
    extractIngredients(drink);
  }

}, []);

const extractIngredients= (drink:Drink)=>{
  let ingredients:Ingredient[]=[];
  for(let i =1;i<=15;i++){
     const ingredient = drink[`strIngredient${i}` as keyof Drink];
     const measure= drink[`strMeasure${i}` as keyof Drink];

     if(ingredient){
        ingredients.push({ingredient,measure: measure|| "" });
     }
  }

  setIngredients(ingredients);
  
}



  return (
    <section className='details-container'>
            {/* Header */}
            <header className='header'>
                <div className="flex-container">
                    <div className="logo"></div>
                    <Link className='link' to={`/`}>Main Page</Link>
                </div> 
            </header>
            {/* Detail_Info */}
            <section className='detail-content'>
              {currentDrink? (
              <>
               
                <div className="flex-card">
                 <div className='title'>{currentDrink.strDrink}</div>
                  <div className="img">
                    <img src={currentDrink.strDrinkThumb} alt={currentDrink.strDrink} />
                  </div>
                
                </div>


                <div className="flex-card2">
                  <div className="info_ingredients">
                      <h3 className='color1'>Ingredients:</h3>
                      <ul>
                        {ingredients.map((item, index) => (
                          <li key={index}>
                            {item.ingredient} - {item.measure}
                          </li>
                        ))}                       
                      </ul>
                  </div>

                  <div className="recipe-drink">
                    <h3 className='color2'>Recipe:</h3>
                    <p>{currentDrink.strInstructions}</p>
                  </div>
                </div>
              </>

              ):(<div className='title'>Loading...</div>) }
            </section>
   
    
    </section>
   
  )
}

export default Details;
