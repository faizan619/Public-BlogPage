import React from 'react';
import { useNavigate } from 'react-router-dom';


function Trator() {

  const aneeza = "faizanalamsajjadalammoinuddinshaikhchamanali";

  const navigate = useNavigate();
  
  const handleadmin = ()=>{
    let a = confirm("You are really the admin?")
    if(a){
      let b = prompt("Enter the password")
      console.log(b);
      if (b===aneeza){
        navigate('/admin/faizan');
      }
      else{
        alert('Wrong Password');
        navigate('/');
      }
    }
    else{
      return null;
    }
  }
  return (
    <div className="footer">
      © 2023 - Design and Develop by <span onClick={handleadmin}>faizan</span> 
    </div>
  )
}

export default Trator;