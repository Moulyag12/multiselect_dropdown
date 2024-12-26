import { useEffect,useState } from 'react';
import './App.css';

function App() {
  const[userData,setUserData]=useState([]);
  const[searchValue,setSearchValue]=useState("");
  const[showList,setShowList]=useState(false);
  const[chipData,setChipData]=useState([]);
    useEffect(()=>{
     const fetchUsers=async()=>{
      try{
        const response= await fetch("https://dummyjson.com/users");
         const data=await response.json();
         const userData=data.users.map((user)=>({
          fullName:`${user.firstName} ${user.lastName}`
         }));
         console.log(userData);
         setUserData(userData);
      }catch(error){
          console.log(error);
      }
     };
     fetchUsers();
    },[]); // [] It indicates this  effect render only once after the initial render

    const filterItems=userData.filter((item)=>
      item.fullName.toLowerCase().includes(searchValue.toLowerCase())
    );
    const addchip=(selecteditem)=>{
  const updatedChip=[...chipData,selecteditem];
  console.log(updatedChip);
  setChipData(updatedChip);
  setUserData(userData.filter((chip)=>chip.fullName!==selecteditem.fullName));
  setSearchValue("");
    }

    const removeChip=(selecteditem)=>{
      setChipData(chipData.filter((chip)=>chip.fullName!==selecteditem.fullName));
      setUserData([...userData, selecteditem]);

    }
  return (
    <div className="App">
      <div className='multi-dropdown'>
      <div className='input-container'>
      {chipData.map((chip, index) => (
          <span key={index} className="chip">
            {chip.fullName}
            <button
              className="remove-chip"
              onClick={() => removeChip(chip)}
            >
              X
            </button>
          </span>
        ))}
     <input 
     className='input-box'
     placeholder='Search....'
     onFocus={()=>setShowList(true)}
     value={searchValue} 
     onChange={(e)=>setSearchValue(e.target.value)}>{chipData.fullName}</input>
     </div>
     <ul className='user-list'>
      { showList &&
      filterItems.map((value,index)=>(
      <li onClick={()=>addchip(value)}key={index}>{value.fullName}</li>
     ))}
     </ul>
     </div>
    </div>
  );
}

export default App;
