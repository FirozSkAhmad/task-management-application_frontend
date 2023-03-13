import Header from './Header';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Home() {
    const [data, setData] = useState([])
    const getData = async function register() {
        const userId = localStorage.getItem("userId")
        let options = {
            url: `${process.env.REACT_APP_GET_TASKS_URL}/${userId}`,
            method: "get",
            headers: {
                authorization: localStorage.getItem('token'),
            }
        }
        const result = await axios(options)
        setData(result.data)
    }
    useEffect(() => {
        getData()
    }, [])

    const navigate = useNavigate()

    function update(id) {
        navigate(`/updateTask/${id}`)
    }

    function notification(id) {
        navigate(`/taskNSettings/${id}`)
    }

    async function deleteTask(id, title) {
        alert(`Are you sure, do you want to delete ${title} task` )
        const userId = localStorage.getItem("userId")
        const body = { userId }
        let options = {
            url: `${process.env.REACT_APP_DELETE_TASK_URL}/${id}`,
            method: "PUT",
            headers: {
                authorization: localStorage.getItem('token'),
            },
            data: body
        }
        await axios(options)
        getData()
    }

    async function updateStatus(id) {
        const userId = localStorage.getItem("userId")
        const body = { userId }
        let options = {
            url: `${process.env.REACT_APP_UPDATE_STATUS_URL}/${id}`,
            method: "PUT",
            headers: {
                authorization: localStorage.getItem('token'),
            },
            data: body
        }
        await axios(options)
        getData()
    }

    const [value, setValue] = useState("")

    async function sort() {
        if (value === "") {
            alert("select sort by, before clicking sort")
        }
        const userId = localStorage.getItem("userId")
        let options = {
            url: `${process.env.REACT_APP_GET_TASKS_BY_SORT_URL}/${value}/${userId}`,
            method: "GET",
            headers: {
                authorization: localStorage.getItem('token'),
            },
        }
        const result = await axios(options)
        setData(result.data)
    }

    return (
        <>
            <Header />
            <br />
            <div className='col-sm-8 offset-sm-2'>
                <h3 style={{ position: 'absolute', textAlign: "left" }}>Tasks:</h3>
            </div>
            <br />
            <br />
            {(data.length > 0) ? <div className='col-sm-8 offset-sm-2'>
                <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                    <div >
                        <button className="btn btn-warning" onClick={sort}>SORT</button>
                    </div >
                    <div style={{ marginRight: "3px" }}>
                        <select className="form-select" onChange={(e) => setValue(e.target.value)}>
                            <option value="">--Sort By--</option>
                            <option value="created">Created Date</option>
                            <option value="due_date">Due Date</option>
                        </select>
                    </div >
                </div>
                <br />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th colSpan="3">Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, IDX) => {
                                return <tr key={item._id}>
                                    <td>{IDX + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{item.dueDate.replace("T00:00:00.000Z", "")}</td>
                                    <td style={{ color: "red" }}>{item.status}
                                        <br />
                                        <button className='btn btn-success' onClick={() => updateStatus(item._id)} style={{ fontSize: "10px" }}>Mark status as completed</button>
                                    </td>
                                    <td><button className='btn btn-success' onClick={() => update(item._id)}>Update</button></td>
                                    <td><button className='btn btn-secondary' onClick={() => notification(item._id)}>Notification Settings</button></td>
                                    <td><button className='btn btn-danger' onClick={() => deleteTask(item._id, item.title)}>Delete</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            </div> : <div className='col-sm-8 offset-sm-2'>
                <h1 style={{ marginTop: "50px" }}>Click On Add Task to Add Tasks</h1>
                <h1 style={{ marginTop: "50px" }}>To See The Completed Tasks Click On Completed Tasks</h1>
            </div>}
        </>
    )
}

export default Home