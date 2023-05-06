import './App.css'
import React, {useState} from 'react'
import {useEffect} from 'react'




function App() {
  const [toDo,setToDo]=useState('');
  const [toDos,setToDos]=useState(()=>{
    const savedtoDos=localStorage.getItem("toDos")
    console.log("sss",savedtoDos);
    const initialvalue=JSON.parse(savedtoDos)
    return (initialvalue || "")
  });




  const dayNames=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const date=new Date()
  const day=dayNames[date.getDay()]

  const dayNamesShort=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  const curDate=new Date();
  const hours=curDate.getHours()
  const AMorPM=hours>=12 ? 'PM':'AM';
  var hour=hours % 12;
  const hour12=()=>{
    if(hour===0) hour=12;
      return hour;
  };

  const toDoDate=curDate.getDate()+'.'+(curDate.getMonth()+1)+'.'+curDate.getFullYear();
  const toDoDay=dayNamesShort[curDate.getDay()];
  const toDoTime=hour12()+':'+curDate.getMinutes()+':'+curDate.getSeconds()+''+AMorPM;
  const toDoTimeDateDay=toDoTime+''+toDoDay+''+toDoDate;

  const userInput=(e)=>{
    setToDo(e.target.value);
  };

  const resetInput=()=>{
    setToDo('');
  };

  const inputSubmit=(e)=>{
    e.preventDefault();
    if(toDo){
      setToDos([...toDos,{
        id:Date.now(),
        toDoTime:toDoTimeDateDay,
        text:toDo,
        status:false,
        statusDrop:false,
        statusRemove:false,
        statusRetrive:false
      }]);
      setToDo('');
    }
  }

  
  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
    console.log("kkk",localStorage.key("toDoos"));
 }, [toDos]);

  
  
  return (
    <div className="app">
      <div className='headings'>
        <div className="mainHeading">
          <h1 className='gradient-text'>ToDo List</h1>
        </div>
        <div className="subHeading">
          <h2 className='gradient-text2'>Whoop, it's {day} !!! </h2>
        </div>      
      </div>
      <form onSubmit={inputSubmit}>
            <div className="toDoInput">
               <div className="left">
                  <input value={toDo} onChange={userInput} type="text" placeholder=" Plan Something . . ." />
               </div>
               <div className="right erase">
                  <i onClick={resetInput} className="fas fa-eraser" title="Clear"></i>
               </div>
               <div className="rightEnd  add">
                  <button style={{ border: 'none', outline: 'none', backgroundColor: '#fff' }} type="submit"><i   className="fas fa-plus" title="Add"></i></button>
               </div>
            </div>
         </form>

         <div className="container done">
            <h3>Done</h3>
            {
              toDos&&toDos.map((value)=>{
                     if(value.status && !value.statusRemove){
             return(
                        <div key={value.id} className="toDo">
                           <div className="left"></div>
                           <div className="top">
                              <p className="textCross">{value.text}</p>
                           </div>
                           <div className="bottom">
                              <p>{value.toDoTime}</p>
                           </div>
                           <div className="right bin">
                               <i onClick={(e)=>{
                                  let isdelete = window.confirm("Deleting ToDo permanently !");
                                  if (isdelete) {
                                     e.target.value = true;
                                  }
                                 setToDos(toDos.filter(value2=>{
                                   if(value2.id===value.id){
                                    value2.statusRemove=e.target.value;
                                   }
                                   return value2
                                 }))
                               }} value={value.statusRemove} className="fas fa-trash-alt" title="Remove"></i>
                           </div>
                        </div> );
                     }
                     return null;
                 })   
                     
            }
            
         </div>

         <div className='container onGoing'>
          <h3>On Going</h3>
          {

           toDos&& toDos.map((value)=>{
             if(!value.status && !value.statusDrop){

                 return(
              
                  <div key={value.id} className="toDo">
                    <div className='left tick'>
                      <i onClick={(e)=>{
                        console.log(e);
                        console.log(e.target.value);
                        console.log(value);
                        e.target.value=true;
                        setToDos(toDos.filter(value2=>{
                          if(value2.id===value.id){
                           value2.status=e.target.value;
                          }
                          return value2
                        }))
                      }} value={value.status} className="fas fa-check" title='Done'></i>
                    </div>
                    <div className='top'>
                      <p>{value.text}</p>
                    </div>
                    <div className='bottom'>
                      <p>{value.toDoTime}</p>
                      <p>{value.id}</p>
                    </div>
                    <div className='right close'>
                      <i onClick={(e)=>{
                        e.target.value=true;
                        setToDos(toDos.filter(value2=>{
                          if(value2.id===value.id){
                            value2.statusDrop=e.target.value
                          }
                          return value2
                        }));
                      }} value={value.statusDrop} className="fas fa-times" title='Drop'></i>
                    </div>
                  </div>
               
                 )
                  }else if(value.statusRetrive && !value.status){
                    return(
                      <div key={value.id} className="toDo">
                    <div className='left tick'>
                      <i onClick={(e)=>{
                        console.log(e);
                        console.log(e.target.value);
                        console.log(value);
                        e.target.value=true;
                        setToDos(toDos.filter(value2=>{
                          if(value2.id===value.id){
                           value2.status=e.target.value;
                          }
                          return value2
                        }))
                      }} value={value.status} className="fas fa-check" title='Done'></i>
                    </div>
                    <div className='top'>
                      <p>{value.text}</p>
                    </div>
                    <div className='bottom'>
                      <p>{value.toDoTime}</p>
                      <p>{value.id}</p>
                    </div>
                    <div className='right close'>
                      <i onClick={(e)=>{
                        e.target.value=true;
                        setToDos(toDos.filter(value2=>{
                          if(value2.id===value.id){
                            value2.statusDrop=e.target.value
                            value.statusRetrive=!e.target.value
                          }
                          return value2
                        }));
                      }} value={value.statusDrop} className="fas fa-times" title='Drop'></i>
                    </div>
                  </div>
                    )
                  }
                  return null;
              })

           }
                 
               
         </div>

         <div className='container dropped'> 
         <h3>Dropped</h3>
         {
             toDos&& toDos.map((value)=>{
                     if(value.statusDrop && !value.statusRemove && !value.statusRetrive){
             return(
                <div key={value.id} className="toDo">
                  <div className='left recycle'>
                    <i onClick={(e)=>{
                      let isdelete=window.confirm("Retriving dropped ToDo");
                      if(isdelete){
                        e.target.value=true;
                      }
                      setToDos(toDos.filter(value2=>{
                        if(value2.id===value.id){
                          value.statusRetrive=e.target.value
                        }
                        return value2
                      }));
                    }} value={value.statusRetrive} className="fas fa-redo-alt" title='Retrive'></i>
                  </div>
                  <div className='top'>
                    <p className='textCross'>{value.text}</p>
                  </div>
                  <div className='bottom'>
                    <p>{value.toDoTime}</p>
                  </div>
                  <div className='rigth bin'>
                    <i onClick={(e)=>{
                      let isdelete = window.confirm("Deleting ToDo permanently !");
                      if (isdelete) {
                         e.target.value = true;
                      }
                     setToDos(toDos.filter(value2=>{
                       if(value2.id===value.id){
                        value2.statusRemove=e.target.value;
                       }
                       return value2
                     }))
                    }} value={value.statusRemove} className="fas fa-trash-alt" title='Remove'></i>
                  </div>
                </div> )
                }
                return null;
            })   
                
       }
             
        </div>
    </div>
    
  )
}

export default App;
