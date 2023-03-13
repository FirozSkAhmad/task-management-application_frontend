import Header from './Header';
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


function UpdateTask() {

    const params = useParams()
    const Id = params.Id

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [dueDate, setDueDate] = useState()
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    async function update(taskId) {
        const userId = localStorage.getItem("userId")

        const body = { title, description, dueDate }

        const errs = {}

        let todayDate = new Date();
        let dd = String(todayDate.getDate()).padStart(2, '0');
        let mm = String(todayDate.getMonth() + 1).padStart(2, '0');
        let yyyy = todayDate.getFullYear();
        todayDate = yyyy + "-" + mm + "-" + dd;

        let dueDateArr = dueDate.split("-").map(x => parseInt(x))
        let todayDateArr = todayDate.split("-").map(x => parseInt(x))

        for (let i = dueDateArr.length - 1; i >= 0; i--) {
            if (dueDateArr[i] < todayDateArr[i]) {
                errs.dueDate = "Due date should be greater then or equals to today's data"
            }
        }

        setErrors(errs)

        body.userId = userId

        if (Object.keys(errs).length === 0) {
            let options = {
                url: `${process.env.REACT_APP_UPDATE_TASK_URL}/${taskId}`,
                method: "PUT",
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

    const [data, setData] = useState([])
    const getData = async function register() {
        let options = {
            url: `${process.env.REACT_APP_GET_TASK_URL}/${Id}`,
            method: "get",
            headers: {
                authorization: localStorage.getItem('token'),
            }
        }
        const result = await axios(options)

        result.data.dueDate = result.data.dueDate.replace("T00:00:00.000Z", "")

        setData(result.data)
        setTitle(result.data.title)
        setDescription(result.data.description)
        setDueDate(result.data.dueDate)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Header />
            <br />
            <br />
            <div className='col-sm-6 offset-sm-3'>
                <div style={{ textAlign: "left" }}>
                    <h5>Title:</h5>
                </div>
                <input type="text" className='form-control' defaultValue={data.title}
                    placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
                <br />
                <div style={{ textAlign: "left" }}>
                    <h5>Description:</h5>
                </div>
                <input type="text" className='form-control' defaultValue={data.description}
                    placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
                <br />
                <div style={{ textAlign: "left" }}>
                    <h5>Due Date:</h5>
                </div>
                <input type="date" className='form-control' defaultValue={data.dueDate}
                    placeholder='Description' onChange={(e) => setDueDate(e.target.value)} />
                {(errors.dueDate) ? <p style={{ textAlign: "left", color: "red" }}> {errors.dueDate}</p> : <br />}
                <button className='btn btn-primary' onClick={() => update(data._id)}>Update</button>
            </div>
        </>
    )
}


export default UpdateTask