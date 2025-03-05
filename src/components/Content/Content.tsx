import {ChangeEvent, useState} from 'react';
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { Filters } from '../Types';
import './Content.css';

import { Drink } from '../Types';
import DrinkItem from '../Drink/Drink';
type ContentProps = {
    drinks: Drink[],
    filters:Filters,
    saveChanges:(filter:Filters)=>void
}

const Content = ({drinks, filters, saveChanges}:ContentProps) => {
  const [content, setContent] = useState("");

  const changeContent=(e:ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target;
     setContent(value);
     const newFilters={...filters,[name]:value};
     console.log(newFilters);
     saveChanges(newFilters);
  }


  return (
    
    <main className='content'>
      {/* Header */}
      <header className='header'>
        <div className="flex-container">
            <div className="logo"></div>
            <div className="search">
              <input type="text" name='searchByName' value={content} onChange={changeContent} placeholder='Search...'  />
              <HiMiniMagnifyingGlass  className='searchIcon'/>
            </div>
        </div> 
      </header>

        {/* Container */}
        <div className="container">
          {drinks.map((drink)=>(
            <DrinkItem key={drink.idDrink} drink={drink}/>
          ))}
           
        </div>   
   </main>  
   
  )
}

export default Content;
