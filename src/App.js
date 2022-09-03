import React from 'react';
import Header from './Components/Header';
import TodoForm from './Components/TodoForm';
import './App.css';


const App = () => {

return (
    <div className="container">
      <div className='app-wraper'>
        <div>
          <Header />
          <div>
          <TodoForm />
          </div>
          




        </div>

      </div>
    </div>
  );
};

export default App;
