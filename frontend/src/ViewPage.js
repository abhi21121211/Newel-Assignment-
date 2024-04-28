import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
function ViewPage() {
    const Navigate = useNavigate()
    const { id } = useParams()
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/employees/${id}`)
            .then(res => {
                setEmployee(res.data)

            })
            .catch(err => console.log(err))
    }, [id])

    const handleBack = () => {
        Navigate('/list');
    }
    return (
        <div className="view-page-container">
            {employee && (
                <div className="employee-details">
                    <h1>{employee.name}</h1>
                    <p>Department: {employee.department}</p>
                    <p>Date of Joining: {employee.dateOfJoining}</p>
                    <p>Hobbies: {employee.hobbies.join(', ')}</p>
                    <p>Address: {employee.address}</p>
                    <p>Gender: {employee.gender}</p>
                    <button onClick={handleBack}>Back</button>
                </div>
            )}
        </div>
    )
}

export default ViewPage