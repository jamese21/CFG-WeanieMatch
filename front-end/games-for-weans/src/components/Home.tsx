import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
const URL = "http://localhost:3005";

function GetCurrentSessionData() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`${URL}/sessions/`)
            .then((res) => res.json())
            .then(data => 
                data.map(session => {
                    let gameTitle = fetch(`${URL}/games/${session.gameID}`)
                    .then((res) => res.json())
                    .then(game => {
                        console.log(`${URL}/games/${session.gameID}`);
                        return (
                            game.title
                        )
                    }
                    )
                    return {
                        sessionID: session.sessionID,
                        game: session.gameID,
                        isOnline: session.isOnline === 1 ? "Yes" : "No"
                    };
                })
            )
            .then(sessions => setData(sessions))
        }
    , []);
    console.log(data);
    return data;
}

function SessionsTable(rowData) {
    const textComparator = (valueA: string, valueB: string) => {
        return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
    };

    // TODO: Fetch request
    // const rowData = [
    //     { name: 'John Angus', role: 'Child', busy: "Yes" },
    //     { name: 'Amy Plummer', role: 'Volunteer', busy: "No" },
    //     { name: 'Fin Cochrane', role: 'Volunteer', busy: "Yes" },
    //     { name: 'Liv Bowden', role: 'Child', busy: "No" },
    //     { name: 'Bella Young', role: 'Child', busy: "No" },
    //     { name: 'Lisa Tavoosi', role: 'Child', busy: "Yes" },
    //     { name: 'Charles Cook', role: 'Child', busy: "No" },
    //     { name: 'Charlie Nash', role: 'Volunteer', busy: "Yes" },
    //     { name: 'Reiko Tang', role: 'Child', busy: "No" },
    //     { name: 'Peter Graham', role: 'Child', busy: "Yes" },
    // ]
    const columnDefs = [
        { headerName: 'Session ID', field: "sessionID", flex: 1 },
        { headerName: 'Game',field: "game", flex: 1 },
        { headerName: 'Online', field: "isOnline", flex: 1 }
    ];
    
    return (
        <div>
        <h1>Current Sessions</h1>
        <div className="ag-theme-alpine">
            <AgGridReact rowData={rowData} columnDefs={columnDefs as any} />
        </div>
        </div>
    )
}

function getFreeVolunteerData() {
    
}
export default function Home() {
    // TODO: Add Fetch request
    // const [sessionData] = useState([
    //     { game: "Minecraft", players: "1 out of 2", length: "1hr" },
    //     { game: "Fortnite", players: "2 out of 2", length: "1hr 30min" },
    //     { game: "Call of Duty", players: "2 out of 2", length: "30 minute" }
    // ]);
    const sessionColDefs = [
        { headerName: 'Game', field: "game", flex: 1 },
        { headerName: '# of Players',field: "players", flex: 1 },
        { headerName: 'Length', field: "length", flex: 1 }
    ];

    // TODO: Add Fetch request
    const [volunteerData] = useState([
        { name: 'Kylie Brandt'},
        { name: 'Lacie Savage'},
        { name: 'Edna Rowe'},
        { name: 'Harold Bernard'},
        { name: 'Ashley Escobar'},
    ]);
    const volunteerColDefs = [
        { headerName: 'Free Volunteers', field: 'name', flex: 1},
    ];

    // TODO: Add Fetch request
    const [inventoryData] = useState([
        { name: 'Xbox One', type: 'Console' },
        { name: 'Nintendo Switch', type: 'Console' },
        { name: 'Minecraft', type: 'Physical Game' },
        { name: 'Call of Duty', type: 'Physical Game' },
        { name: 'Xbox One', type: 'Console' },
    ]);
    const inventoryColDefs = [
        { headerName: 'Name', field: 'name', flex: 1},
        { headerName: 'Type', field: 'type', flex: 1},
    ];
    
    const sessionData = GetCurrentSessionData();

    return (
        <div className="table-display">
            <div className="ag-theme-alpine" style={{ height: '90%' }}>
                <h1>Game Sessions</h1>
                <AgGridReact rowData={sessionData} columnDefs={sessionColDefs as any} />
            </div>
            
            <div className="column-split">
                <div className="ag-theme-alpine">
                    <h1>Free Volunteers</h1>
                    <AgGridReact className="hide-header" headerHeight={0} rowData={volunteerData} columnDefs={volunteerColDefs as any } />
                </div>
                
                <div className="ag-theme-alpine">
                    <h1>Free Inventory</h1>
                    <AgGridReact className="hide-header" headerHeight={0} rowData={inventoryData} columnDefs={inventoryColDefs as any} />
                </div>
            </div>
        </div>
    );
    

}