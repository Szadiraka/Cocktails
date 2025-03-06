import React from 'react';


import './Drink.css';
import { Drink } from '../Types';
import { useNavigate } from 'react-router-dom';

type DrinkProps = {
    drink: Drink;
};



const DrinkItem = ({drink}:DrinkProps) => {

  const navigate= useNavigate();

  const showDetails=()=>{    
    navigate(`/drink/${drink.idDrink}`);  
   }


  return (
    <div className='drink-card' onClick={showDetails}>
        <div className="img">
            <img src={drink.strDrinkThumb} alt={drink.strDrink} />
        </div>
        <h3 className='title'>{drink.strDrink}</h3>
      
    </div>
  )
}

export default DrinkItem;
