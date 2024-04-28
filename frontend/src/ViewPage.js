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
        <div>{
            employee && (
                <div>
                    <h1>{employee.name}</h1>
                    <p>{employee.department}</p>
                    <p>{employee.dateOfJoining}</p>
                    <p>{employee.hobbies}</p>
                    <p>{employee.address}</p>
                    <p>{employee.gender}</p>
                    <button onClick={handleBack}>Back</button>
                </div>

            )}

        </div>
    )
}

export default ViewPage