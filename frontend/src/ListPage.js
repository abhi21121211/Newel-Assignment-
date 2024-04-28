import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ListPage() {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/api/employees?search=${searchTerm}`)
            .then(res => {
                setEmployees(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [searchTerm])

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            axios.delete(`http://localhost:5000/api/employees/${id}`)
                .then(res => {
                    setEmployees(employees.filter(employee => employee._id !== id));
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    return (
        <div className="list-page-container" >
            <input className="search-input" type='text' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder='Search' />
            <table className="employee-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Date of Joining</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee => (
                            <tr key={employee._id}>
                                <td>{employee.name}</td>
                                <td>{employee.department}</td>
                                <td>{new Date(employee.dateOfJoining).toLocaleDateString()}</td>
                                <td>
                                    <Link to={`/view/${employee._id}`}><button className="action-button">View</button></Link>
                                    <Link to={`/edit/${employee._id}`}><button className="action-button">Edit</button></Link>
                                    <button className="action-button" onClick={() => handleDelete(employee._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Link to="/add"><button className="add-button">Add Employee</button></Link>
        </div>
    )
}

export default ListPage;