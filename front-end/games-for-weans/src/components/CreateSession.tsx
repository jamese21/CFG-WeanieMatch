import React from 'react'
import Select from 'react-select'
import { useState } from 'react'
const URL = "http://localhost:3005";

const handleSubmit = (e) => {
    // const data = {
    //     player1ID: player,
    //     password: password,
    //     longExpiry: false
    // }
    // fetch(`${URL}/sessions`, {
    //     method: "POST",
    //     headers:{
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(data)
    // })
}
export default function CreateSession() {
    const [playerChoice, setPlayerChoice] = useState("")
    const [gameChoice, setGameChoice] = useState("")
    const [locationChoice, setLocationChoice] = useState("")
    const [onlineOnly, setOnlineOnly] = useState(false)

    const checkHandler = () => {
        setOnlineOnly(!onlineOnly)
    }

    // TODO: Fetch request
    const names = [
        { value: 'john_angus', label: 'John Angus' },
        { value: 'fin_cochrane', label: 'Fin Cochrane' },
        { value: 'liv_bowden', label: 'Liv Bowden' }
    ]

    // TODO: Fetch request
    const games = [
        { value: 'call_of_duty', label: 'Call of Duty' },
        { value: 'minecraft', label: 'Minecraft' },
        { value: 'fortnite', label: 'Fortnite' }
    ]

    // TODO: POST Request
    return (
        <div style={{ width: "500px", backgroundColor: "lavender", padding: "10px", borderRadius: "30px"}}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                <h3>Player: </h3>
                <div className='select-option'>
                    <Select className='drop-down' options={names} onChange={(choice) => {
                        if (choice) {
                            setPlayerChoice(choice.value)}
                        }}/>
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                <h3>Game: </h3>
                <div className='select-option'>
                    <Select className='drop-down' options={games} onChange={(choice) => {
                        if (choice) {
                            setGameChoice(choice.value)}
                        }}/>
                </div>
            </div>
            <div>
                <h3 style={{ display: "flex", flexDirection: "row", justifyContent: "end" }}>
                    <div style={{ padding: "5px" }}>
                        <input type="radio" name="location" value="Online" id="online" onClick={() => setLocationChoice('online')}/>
                        <label htmlFor="online">Online</label>
                    </div>
                    <div style={{ padding: "5px" }}>
                        <input type="radio" name="location" value="Medium" id="local" onClick={() => setLocationChoice('local')}/>
                        <label htmlFor="local">Local</label>
                    </div>
                </h3>
            </div>
            {/* <div style={{ display: "flex", flexDirection: "row", justifyContent: "end" }}>
                <input type="checkbox" id="checkbox" checked={onlineOnly} onChange={checkHandler}/>
                <label htmlFor="checkbox">Online-only</label>
            </div> */}
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "end", padding: "10px"}}>
            {(playerChoice === "" || gameChoice === "") && <button className='Primary-button-medium' disabled style={{ display: "flex", flexDirection: "row", justifyContent: "right" }}>Save</button>}
            {(playerChoice !== "" && gameChoice !== "") && <button className='Primary-button-medium' onClick={handleSubmit}style={{ display: "flex", flexDirection: "row", justifyContent: "right" }}>Save</button>}
            </div>
        </div>
    )
}