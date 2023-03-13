import Header from './Header';
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


function TaskNSettings() {
    const params = useParams()
    const Id = params.Id

    const [typeOfN, setType] = useState()
    const [frequency, setFrequency] = useState()
    const [time, setTime] = useState()
    const [meridiem, setMeridiem] = useState()
    const [day, setDay] = useState()
    const [date, setDate] = useState()

    const navigate = useNavigate()

    async function updateNS(taskId) {
        const userId = localStorage.getItem("userId")

        const body = { typeOfN, frequency, time, meridiem, day, date }

        body.userId = userId

        let options = {
            url: `${process.env.REACT_APP_UPDATE_TASK_URL}/${taskId}`,
            method: "PUT",
            headers: {
                authorization: localStorage.getItem('token'),
            },
            data: body,
        }
        await axios(options)
        setType("")
        setFrequency("")
        setTime("")
        setMeridiem("")

        alert(`notifcation settings are updated sucessfully.`)

        navigate('/')
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

        setData(result.data)

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
                    <h5>Type of notification:</h5>
                </div>
                <div>
                    <select className="form-select" defaultValue='Pick Category' onChange={(e) => setType(e.target.value)}>
                        <option value="">--select type of notification--</option>
                        <option value='email'>email</option>
                        <option value="sms">sms</option>
                        <option value="push">push</option>
                    </select>
                </div>
                <p style={{ textAlign: "left" }}> <h7 style={{ color: "red" }}>current setting:</h7> {data.typeOfN}</p>
                <div style={{ textAlign: "left" }}>
                    <h5>Frequerency:</h5>
                </div>
                <div>
                    <select className="form-select" onChange={(e) => setFrequency(e.target.value)}>
                        <option value="">--select frequerency--</option>
                        <option value="daily">daily</option>
                        <option value="weekly">weekly</option>
                        <option value="monthly">monthly</option>
                    </select>
                    <p style={{ textAlign: "left" }}> <h7 style={{ color: "red" }}>current setting:</h7> {data.frequency}</p>
                </div>
                {
                    (frequency === "monthly" || (data.frequency === "monthly" && frequency === "monthly")) ?
                        <>
                            <div style={{ textAlign: "left" }}>
                                <h5>Date:</h5>
                            </div>
                            <div>
                                <select className="form-select" onChange={(e) => setDate(e.target.value)}>
                                    <option value="">--select date--</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                </select>
                                <p style={{ textAlign: "left" }}> <h7 style={{ color: "red" }}>current setting:</h7> {data.date}</p>
                            </div>
                        </> : null
                }
                {
                    (frequency === "weekly" || (data.frequency === "weekly" && frequency === "weekly")) ?
                        <>
                            <div style={{ textAlign: "left" }}>
                                <h5>Day:</h5>
                            </div>
                            <div>
                                <select className="form-select" onChange={(e) => setDay(e.target.value)}>
                                    <option value="">--select Day--</option>
                                    <option value="Sunday">Sunday</option>
                                    <option value='Monday' >Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                </select>
                            </div>
                            <p style={{ textAlign: "left" }}> <h7 style={{ color: "red" }}>current setting:</h7> {data.day}</p>
                        </> : null
                }
                <div style={{ textAlign: "left" }}>
                    <h5>Time:</h5>
                </div>
                <div>
                    <select className="form-select" onChange={(e) => setTime(e.target.value)}>
                        <option value="">--select time--</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                    <p style={{ textAlign: "left" }}> <h7 style={{ color: "red" }}>current setting:</h7> {data.time}</p>
                </div>
                <div style={{ textAlign: "left" }}>
                    <h5>Meridiem:</h5>
                </div>
                <div>
                    <select className="form-select" onChange={(e) => setMeridiem(e.target.value)}>
                        <option value="">--select meridiem--</option>
                        <option value="am">am</option>
                        <option value="pm">pm</option>
                    </select>
                    <p style={{ textAlign: "left" }}> <h7 style={{ color: "red" }}>current setting:</h7> {data.meridiem}</p>
                </div>
                <br />
                <button className='btn btn-primary' onClick={() => updateNS(data._id)}>Update Notification Settings</button>
            </div>
        </>
    )
}

export default TaskNSettings