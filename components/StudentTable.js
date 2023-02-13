import React, { useState } from 'react';
import "../App.css";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {Button, Table} from 'react-bootstrap';
import {useNavigate,Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Pagination from '../components/Pagination';
import ConfirmDialog from './ConfirmDialog';
import Sort from '../components/Sort'







const TableData=()=>{
  const [sorted,setsorted]=useState({sortedField:"id",reversed:false});
 
  const [search,setSearch]=useState("");
  const [confirmDialog, setConfirmDialog] = useState ({isOpen:false,title:'',subTitle:''});
  const [searchItem, setSearchItem]=useState("");
  const navigate = useNavigate();
  const students = useSelector(state=>state);
  const [users,setUsers]=useState(students);
  const dispatch=useDispatch();
  const columns=[
   { 
   title:"Roll Number",field:'rollNum',
   title:"Name",field:'name',
   title:"Mark1",field:'mark1',
   title:"Mark2",field:'mark2',
   title:"Mark3",field:'mark3',
   title:"Mark4",field:'mark4',
   title:"Mark5",field:'mark5'}
   ]
  const usersPerPage = 5;
  const [currentPage,setCurrentPage] = useState(1)
  const numberOfTotalPages = Math.ceil(students.length/usersPerPage);
  const pages=[...Array(numberOfTotalPages+1).keys()].slice(1);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const visibleStudents = students.slice(indexOfFirstUser,indexOfLastUser);

  const deleteStudent=(id,name)=>{
    setConfirmDialog({
      ...confirmDialog,
      isOpen:false
    })
    dispatch({type:"DELETE_STUDENT",payload:id});
    toast.success(` ${name} is deleted from the student Mark List `);
  }

  const logoutHandler=(e)=>{
    localStorage.removeItem('Google Login')
    localStorage.removeItem('Admin Data')
    toast.success('Logged Out Successfully!!!')
    navigate('/login');
  }
  const inputOnChange=(e)=>{
    setSearchItem(e.target.value);
     }
 return(
  <div className='container'>
     <div className='markSheet'><h1>STUDENT MARK LIST</h1></div>
    <div className='search-create'>
      <input type='text'
       placeholder='Search...'
       className="form-control"
       onChange={inputOnChange}
       />
   
    <Link className='create-btn' to={'/create'}>
      <Button className='my-3'>CREATE</Button>
    </Link>
    </div>
    <div>
      <Table striped bordered hover size="sm">
         <thead>
         <Sort users={users} 
    setUsers={setUsers} 
    sorted={sorted}  search={search} setSearch={setSearch}
    setsorted={setsorted} />
         </thead>
         <tbody>
         {visibleStudents.filter((val)=>{
           if(searchItem==val.rollNum||
            val.name.toLowerCase().includes(searchItem.toLowerCase())||
            val.city.toLowerCase().includes(searchItem.toLowerCase())
          ){
             return val;
          }
         }).map((student,id)=>(
            <tr key={id}>
              <td>{student.rollNum}</td>
              <td>{student.name}</td>
              <td>{student.city}</td>
              <td>{student.mark1}</td>
              <td>{student.mark2}</td>
              <td>{student.mark3}</td>
              <td>{student.mark4}</td>
              <td>{student.mark5}</td>
              <td className='actions'>
                <div className='buttons'>
                <Link to={`/edit/${student.id}`}  className="btn btn-success">
                  Edit
                </Link>   &nbsp;
                <Button type='button' onClick={()=>setConfirmDialog({
                  isOpen:true,
                  title:'Are you sure to delete?',
                  subTitle:"You can't undo this operation",
                  onConfirm:()=>{deleteStudent(student.id,student.name)}
                })
              }  className="btn btn-danger">
                  Delete
                </Button></div>
              </td>
            </tr>
          )) 
            }
         </tbody>
      </Table>
    </div>
    <div>
    <Pagination currentPage={currentPage}
 setCurrentPage={setCurrentPage} 
 numberOfTotalPages={numberOfTotalPages} 
 pages={pages} />
    </div>
    <div className="button"><button className="btn btn-dark my-3" onClick={logoutHandler} >Logout</button></div>
  <ConfirmDialog confirmDialog={confirmDialog}
  setConfirmDialog={setConfirmDialog} />
  </div>
 )
}

export default TableData;