import './SideBar.css';
import { FaMartiniGlassCitrus } from "react-icons/fa6";
import categories from '../../db/Categories';
import alcoholics from '../../db/Alcoholic';
import glasses from '../../db/Glasses';
import ingredients from '../../db/Ingredients';
import { useContext } from 'react';
import { ContextData } from '../MyContext';
import { ContentProps } from '../Content/Content';

const SideBar = () => { 

    const {saveChanges, filters} = useContext<ContentProps>(ContextData);
  
    const hadleFilterChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
       const {value,name} = e.target;      
       const newFilters={...filters,[name]:value};
     
       saveChanges(newFilters);
    }

    const handleFocusChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {value,name} = e.target;  
        let currentElement=undefined;
        if(name ==='filterByIngredient')  {
            currentElement  = ingredients.find(x=>x.strIngredient.toLowerCase() === value.toLowerCase());
            currentElement=currentElement?.strIngredient;
        }  
            
        else if(name ==="filterByGlass")  {
            currentElement  = glasses.find(x=>x.strGlass.toLowerCase() === value.toLowerCase()); 
            currentElement=currentElement?.strGlass;
        } 
        if(currentElement)  {
            const newFilters= {...filters,[name]:currentElement};           
            saveChanges(newFilters);
        }
           
       
    }
 

  return (
    <aside className="sidebar">   
        <div className="container">
            <FaMartiniGlassCitrus className='martiniGlass' />

            {/* Category Section */}
            <section className='categorySection'>
            <h3 className='title'>Categories:</h3>
           <ul className="categoryFilter">
           <li key={-1}>
                <label>
                    <input type="radio" name="filterByCategory"  value='All' onChange={hadleFilterChange}/>All
                </label>
                </li> 
            {categories.map((category,index)=>(
                <li key={index}>
                <label>
                    <input type="radio" name="filterByCategory"  value={category.strCategory} onChange={hadleFilterChange}/>{category.strCategory}
                </label>
                </li> 
            ))}
          
           </ul>
            </section>   
            
                  {/*Alcohol Section  */}
            <section className='alcoholicSection'>
               <h3 className='title'>Alcoholic:</h3>
               <ul className="filter">
                    <li key={-1}>
                            <label>
                                <input type="radio" name="filterByAlcoholic"  value={'All'} onChange={hadleFilterChange}/>All
                            </label>
                            </li> 
                        {alcoholics.map((alc,index)=>(
                            <li key={index}>
                            <label>
                                <input type="radio" name="filterByAlcoholic"  value={alc.strAlcoholic} onChange={hadleFilterChange}/>{alc.strAlcoholic}
                            </label>
                            </li> 
                        ))}
          
              </ul>
            </section>

            {/*Ingredient Section  */}
            <section className='ingredientSection'>
               <h3 className='title'>Ingredients:</h3>         
                <input list="options" id="myIngredients" name="filterByIngredient"  onChange={handleFocusChange}/>
                <datalist id="options" >                  
                    {ingredients.map((ingredient,index)=>(
                      <option key={index} value={ingredient.strIngredient}/>
                    ))}                
                </datalist>
            </section>

            {/* Glass Section */}

            <section className='glassSection'>
            <h3 className='title'>Glass:</h3>  
            <input list="options2" id="myGlass" name="filterByGlass"  onChange={handleFocusChange}/>
                <datalist id="options2" >                  
                    {glasses.map((glass,index)=>(
                      <option key={index} value={glass.strGlass}/>
                    ))}                
                </datalist>
            </section> 

        </div>
    </aside>
  )
}

export default SideBar;
