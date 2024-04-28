import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AddEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        department: '',
        dateOfJoining: '',
        gender: '',
        address: '',
        hobbies: [], // Initialize as an empty array
    });


    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/api/employees/${id}`)
                .then(res => {
                    setFormData({
                        ...res.data,
                        dateOfJoining: res.data.dateOfJoining.split('T')[0] // Extract date part
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        if (e.target.name === 'hobbies') {
            const selectedHobby = e.target.value;
            const updatedHobbies = e.target.checked
                ? [...formData.hobbies, selectedHobby] // Add hobby to array
                : formData.hobbies.filter(hobby => hobby !== selectedHobby); // Remove hobby from array
            setFormData({
                ...formData,
                hobbies: updatedHobbies
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: value
            });
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            axios.put(`http://localhost:5000/api/employees/${id}`, formData)
                .then(res => {
                    navigate('/list');
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            axios.post('http://localhost:5000/api/employees', formData)
                .then(res => {
                    navigate('/list');
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input required={true} type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                <select required={true} name="department" value={formData.department} onChange={handleChange}>
                    <option value="">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Commerce">COMMERCE</option>
                    {/* Add more department options as needed */}
                </select>
                <input required={true} type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} placeholder="Date Of Joining" />
                <input required={true} type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
                <label>
                    Hobbies:
                    <input type="checkbox" name="hobbies" value="Reading" checked={formData.hobbies.includes('Reading')} onChange={handleChange} /> Reading
                </label>
                <label>
                    <input type="checkbox" name="hobbies" value="Gaming" checked={formData.hobbies.includes('Gaming')} onChange={handleChange} /> Gaming
                </label>
                <label>
                    <input type="checkbox" name="hobbies" value="Coding" checked={formData.hobbies.includes('Coding')} onChange={handleChange} /> Coding
                </label>
                <label>
                    <input type="checkbox" name="hobbies" value="Playing" checked={formData.hobbies.includes('Playing')} onChange={handleChange} /> Playing
                </label>

                <div>
                    Gender:
                    <label>
                        <input required={true} type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} /> Male
                    </label>
                    <label>
                        <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /> Female
                    </label>
                </div>
                {id ? (<button type='submit'>Update</button>) : (<button type='submit'>Save</button>)}
                <button onClick={() => navigate('/list')}>Back</button>
            </form>
        </div>
    );
}

export default AddEditPage;