
import React,{useEffect, useState} from "react";

// To get data from local storage

const getLocalData = ()=>{
  let list = localStorage.getItem('lists');
  console.log(list);
  if(list){
    return JSON.parse(localStorage.getItem('lists'));
  } 
  else{
    return [];
  }
}

const TodoForm = () => {

const [newItem, setNewItem] = useState("");
const [items, setItems] = useState(getLocalData());
const [editBtn ,setEditBtn] = useState(true);
const [getId ,setgetId] = useState();


    
const inputChangeHandler = (event) => {

    setNewItem(event.target.value); // to get/store value put in input field 
    
}

const addItem = (event) => {
    if(!newItem){
        alert("Please Add a Todo..");
        return;
    }else if(newItem && !editBtn){
      setItems(
        items.map((todoItem) => {
          if(todoItem.id === getId){
            return {...todoItem,value:newItem}
          }
          return todoItem;
          

        })
    
        )
        event.preventDefault();
        setEditBtn(true);
        setNewItem('');
        setgetId(null);
    
      }
    else{

    event.preventDefault(); // to stop auto refresh on submit
    const todoItem = {

        id:Math.floor(Math.random()*1000),
        value :newItem //input se milne wala value
    };

    setItems(updatedItem => [...updatedItem,todoItem]);
    setNewItem(""); //to set input field blank after object(todoItem) is created

    // console.log(todoItem);
    console.log(items);
}
    
}


const deleteItem = (id) =>{
  const newArray = items.filter(todoItem => todoItem.id !== id
 );
 setItems(newArray);

}

const editItem  =(id) =>{
     let newEditItem = items.find((todoItem) => {
      return todoItem.id === id

     });
     console.log(newEditItem);

     setEditBtn(false);
     setNewItem(newEditItem.value);
     setgetId(id);
     
             

}
// local storage

useEffect(()=>{
 localStorage.setItem('lists',JSON.stringify(items))
},[items]);
   
return(
    <>
        <form onSubmit = {addItem}>
            <input
             className="task-input" 
             type="text" autoFocus
             placeholder="Enter a todo .." 
             value= {newItem}
             onChange= {inputChangeHandler}
             />
             {
                editBtn ? <button  className="button-add" type="submit"> Add </button> :
                <button  className="button-update" type="submit"> Update </button>
             }
             
        </form>

        {/* list of items */}
        <div>
          
          {items.map(todoItem =>{
            
            return(<div>

                    <li className= "list-item" key={todoItem.id}>
                     <div className="list"> 
                        {todoItem.value} 
                     </div>
                     <div className="list">
                     
                       <button onClick={() => editItem(todoItem.id)} className="button-edit">
                       <i className ="bi bi-pencil-square"></i>
                       </button>

                       <button onClick={() => deleteItem(todoItem.id)} className="button-delete">
                         <i className ="bi bi-trash3 "></i>
                       </button>
                     </div>
                     



                    </li>
                    

                


                </div>

            )
          })}
           
          
           </div>

        

        
    </>
    )
    
}

export default TodoForm;