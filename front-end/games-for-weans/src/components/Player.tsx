import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
const URL = "http://localhost:3005";

function PlayerData(data) {

    const textComparator = (valueA: string, valueB: string) => {
        return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
    };

    // TODO: Fetch busy status
    const [busyStatus, setBusyStatus] = useState(false)

    const games = [
        { name: 'Call of Duty' },
        { name: 'Minecraft' },
        { name: 'Fortnite' }
    ]

    const gameColDefs = [
        {headerName: 'Favourite Games', field: 'name', flex: 1},
    ];

    // TODO: POST Request
    const setToBusy = () => {
        setBusyStatus(true);
        console.log(busyStatus);
    }

    const setToFree = () => {
        setBusyStatus(false);
        console.log(busyStatus);
    }

    return (
        <div >
            <div >
                <div className="Info" style={{padding: "20px"}}>
                    <h1>{data.name}</h1>
                    <h2>{data.role}</h2>
                    {!busyStatus && <button className="Primary-button-medium" onClick={setToBusy}>Set to Busy</button>}
                    {busyStatus && <button className="Primary-button-medium" onClick={setToFree}>Set to Free</button>}
                </div>
            <div style={{width: "300px", height: "300px", padding: "20px"}}>
                <div className="ag-theme-alpine" style={{height:"100%", width: "100%"}}>
                <AgGridReact 
                rowData={games} 
                columnDefs={gameColDefs as any}
                            // onRowClicked={(row) => navigate(`/movie?id=${row.data.imdbID}`)}
                />
                </div>
            </div>
            </div>
            {/* <div style={{backgroundColor: "grey"}}>
                <h1>Schedule</h1>
            </div> */}
        </div>
    )
}

export default function GetPlayerData() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    console.log(`${URL}/players/${id}`);
    useEffect(() => {
        fetch(`${URL}/players/${id}`)
            .then((res) => res.json())
            .then(data => {
                console.log(`${URL}/players/${id}`);
                return {
                        playerID: data.playerID,
                        name: data.name,
                        role: data.playerType,
                        busy: data.inSession,
                }
            }
            )
            .then(player => setData(player))
        }
    , []);
    return (
        <div>
            {PlayerData(data)}
        </div>
    )
}