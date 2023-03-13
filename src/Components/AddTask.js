import Header from './Header';
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isValid } from '../Validations/validator'


function AddTask() {
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [dueDate, setDueDate] = useState()
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    async function add() {

        const userId = localStorage.getItem("userId")
        const body = { title, description, dueDate }

        const errs = {}
        if (!isValid(body.title)) {
            errs.title = "please fill the title column"
        }
        if (!isValid(body.description)) {
            errs.description = "please fill the Description column"
        }

        if (!isValid(body.dueDate)) {
            errs.dueDate = "please fill the Due Date column"
        }
        else {
            let todayDate = new Date();
            let dd = String(todayDate.getDate()).padStart(2, '0');
            let mm = String(todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = todayDate.getFullYear();
            todayDate = yyyy + "-" + mm + "-" + dd;

            let dueDateArr = dueDate.split("-").map(x => parseInt(x))
            let todayDateArr = todayDate.split("-").map(x => parseInt(x))

            for (let i = dueDateArr.length - 1; i >= 0; i--) {
                if (dueDateArr[i] < todayDateArr[i]) {
                    errs.dueDate = "Due date should be greater then or equals to today's data"

                }
            }
        }

        setErrors(errs)

        body.userId = userId

        if (Object.keys(errs).length === 0) {
            let options = {
                url: `${process.env.REACT_APP_CREATE_TASK_URL}`,
                method: "POST",
                headers: {
                    authorization: localStorage.getItem('token'),
                },
                data: body,
            }
            await axios(options)
            setTitle("")
            setDescription("")
            setDueDate("")
            navigate('/')
        }
    }

    return (
        <>
            <Header />
            <br />
            <br />
            <div className='col-sm-6 offset-sm-3'>
                <div style={{ textAlign: "left" }}>
                    <h5>Title:</h5>
                </div>
                <input type="text" className='form-control'
                    placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
                {(errors.title) ? <p style={{ textAlign: "left", color: "red" }}> {errors.title}</p> : <br />}

                <div style={{ textAlign: "left" }}>
                    <h5>Description:</h5>
                </div>
                <input type="text" className='form-control'
                    placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
                {(errors.description) ? <p style={{ textAlign: "left", color: "red" }}> {errors.description}</p> : <br />}
                <div style={{ textAlign: "left" }}>
                    <h5>Due Date:</h5>
                </div>
                <input type="date" className='form-control'
                    placeholder='Description' onChange={(e) => setDueDate(e.target.value)} />
                {(errors.dueDate) ? <p style={{ textAlign: "left", color: "red" }}> {errors.dueDate}</p> : <br />}
                <button className='btn btn-primary' onClick={add}>Add Task</button>
            </div>
        </>
    )
}

export default AddTask