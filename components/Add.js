import React, {useState} from "react";
import { Button,Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import ValidatorAdd from "../components/validatorAdd";

const Add=()=>{
  const [err,setErr]=useState({});
 const [values, setValues] = useState({
  rollNum:'',name:'',city:'',mark1:'',mark2:'',mark3:'',mark4:'',mark5:''
 })
 const rollNum=values.rollNum;
 console.log(rollNum);
 const name=values.name;
 const city=values.city;
 const mark1=values.mark1;
 const mark2=values.mark2;
 const mark3=values.mark3;
 const mark4=values.mark4;
 const mark5=values.mark5;
 console.log(values);
 const students=useSelector((state)=>state);
 const dispatch =useDispatch();
 const navigate=useNavigate();
 console.log(students);
 
 const handleChange=(event)=>{
   setValues({
    ...values,[event.target.name]:event.target.value
   })
 }
  

const handleSubmit=(e)=>{
e.preventDefault();
setErr(ValidatorAdd(values.rollNum,values.name,values.city,values.mark1,values.mark2,values.mark3,values.mark4,values.mark5))
if(!values.rollNum||!values.name||!values.city||!values.mark1||!values.mark2||!values.mark3||!values.mark4||!values.mark5){
  return toast.warning("please fill in all fields")
}
const studData={
  id : students[students.length-1].id+1,
  rollNum,
  name,
  city,
  mark1,mark2,mark3,mark4,mark5
}
dispatch({type:"Add_Student",payload:studData});
toast.success(`Student ${name} added Successfully!!`);
navigate("/studentsMarkDetails");
};
return (
  
    <div>
 <div className="create">
          <h1>Create New Student Mark list</h1>
            <Form className="d-grid gap-2">
              
             <Form.Group className="mb-3" controlId="formId">
                <Form.Control 
                 type="text" 
                 name="rollNum"
                 placeholder="Enter Student Roll No." required 
                 onChange={handleChange}>
            </Form.Control>
            {err.rollNum&&rollNum.length<=0?<p className="error">{err.rollNum}</p>:""}
           
                </Form.Group>

              <Form.Group className="mb-3" controlId="formId">
                 <Form.Control type="text" 
                   name="name" 
                   placeholder="Enter Student Name" required 
                   
                   onChange={handleChange}>
                 </Form.Control>
                 {err.name&&name.length<=0?<p className="error">{err.name}</p>:""}
              
                 </Form.Group>

              <Form.Group className="mb-3" controlId="formId">
                <Form.Control type="text"
                 name="city" placeholder="Enter Student City" required 
                 
                 onChange={handleChange}>
                </Form.Control>
                {err.city&&city.length<=0?<p className="error">{err.city}</p>:""}
              
                 </Form.Group>

              <Form.Group className="mb-3" controlId="formId">
                <Form.Control type="text"
                 name="mark1"
                 placeholder="Enter Student Mark1" required 
               
                 onChange={handleChange}>
                </Form.Control>
                {err.mark1&&mark1.length<=0?<p className="error">{err.mark1}</p>:""}
              
                             </Form.Group>

              <Form.Group className="mb-3" controlId="formId">
                <Form.Control type="text"
                  name="mark2" placeholder="Enter Student Mark2" required 
               
                  onChange={handleChange}>
                </Form.Control>
                {err.mark2&&mark2.length<=0?<p className="error">{err.mark2}</p>:""}
              
               </Form.Group>

              <Form.Group className="mb-3" controlId="formId">
                <Form.Control type="text" 
                name="mark3" 
                placeholder="Enter Student Mark3" required 
               
                onChange={handleChange}>
                </Form.Control>
                {err.mark3&&mark3.length<=0?<p className="error">{err.mark3}</p>:""}
              
                  </Form.Group>

              <Form.Group className="mb-3" controlId="formId">
                <Form.Control type="text" 
                name="mark4" placeholder="Enter Student Mark4" required
               
                onChange={handleChange} >
                </Form.Control>
                {err.mark4&&mark4.length<=0?<p className="error">{err.mark4}</p>:""}
             
               </Form.Group>

              <Form.Group className="mb-3" controlId="formId">
                <Form.Control type="text"
                 name="mark5" placeholder="Enter Student Mark5" required 
             
                 onChange={handleChange}>
                </Form.Control>
                {err.mark5&&mark5.length<=0?<p className="error">{err.mark5}</p>:""}
             
                </Form.Group>

              <Button className="submitBtn"  type="submit" onClick={handleSubmit}>Submit</Button>
            </Form>
        </div>
    </div>
  )
}

export default Add;