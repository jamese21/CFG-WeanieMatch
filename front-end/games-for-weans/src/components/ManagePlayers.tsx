import { AgGridReact } from "ag-grid-react";
import React, { useState, useEffect } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useNavigate } from "react-router-dom";
const URL = "http://localhost:3005";


function PlayersTable(rowData) {
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
    const navigate = useNavigate();
    const columnDefs = [
        {headerName: 'Name', field: 'name', flex: 1, comparator: textComparator, sortable: true},
        {headerName: 'Role', field: 'role', flex: 1, comparator: textComparator, sortable: true},
        {headerName: 'Busy', field: 'busy', flex: 1, comparator: textComparator, sortable: true}
    ];
    
    return (
        <div style={{width: "800px", height: "400px"}}>
            <div className="ag-theme-alpine" style={{height:"100%", width: "100%"}}>
            <AgGridReact 
            rowData={rowData} 
            columnDefs={columnDefs as any}
            onRowClicked={(row) => navigate(`/player?id=${row.data.playerID}`)}
            />
            </div>
        </div>
    )
}

export default function ManagePlayers() {
    const data = GetPlayers();
    return(
        <div>
            {PlayersTable(data)}
        </div>
      );
}

function GetPlayers() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`${URL}/players/`)
            .then((res) => res.json())
            .then(data => 
                data.map(player => {
                    return {
                        playerID: player.playerID,
                        name: player.name,
                        role: player.playerType,
                        busy: player.inSession === 1 ? 'Yes' : 'No'
                    };
                })
            )
            .then(players => setData(players))
        }
    , []);
    console.log(data);
    return data;
}