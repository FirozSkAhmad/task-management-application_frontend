import Header from './Header';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useEffect, useState } from 'react'


function CompletedTasks() {
    const [data, setData] = useState([])
    const getData = async function register() {
        const userId = localStorage.getItem("userId")
        let options = {
            url: `${process.env.REACT_APP_GET_COMPLETED_TASKS_URL}/${userId}`,
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

    const [value, setValue] = useState("")

    async function sort() {
        if (value === "") {
            alert("select sort by, before clicking sort")
        }
        const userId = localStorage.getItem("userId")
        let options = {
            url: `${process.env.REACT_APP_GET_TASKS_BY_SORT_COM_URL}/${value}/${userId}`,
            method: "GET",
            headers: {
                authorization: localStorage.getItem('token'),
            },
        }
        const result = await axios(options)
        setData(result.data)
    }

    async function deleteTask(id, title) {
        if (window.confirm(`Are you sure, do you want to delete ${title} task`)) {
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
    }

    return (
        <>
            <Header />
            <br />
            <div className='col-sm-8 offset-sm-2'>
                <h3 style={{ position: 'absolute', textAlign: "left" }}>Completed Tasks:</h3>
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
                            <th>Operations</th>
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
                                    <td style={{ color: "green" }}>{item.status}</td>
                                    <td><button className='btn btn-danger' onClick={() => deleteTask(item._id, item.title)}>Delete</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            </div> : <div className='col-sm-8 offset-sm-2'>
                <h1 style={{ marginTop: "50px" }}>No Completed Tasks</h1>
            </div>}
        </>
    )
}

export default CompletedTasks
