import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function Inventory() {
    const [ManageInventoryData] = useState([
        { console: "iPad", count: "70"},
        { console: "xBox", count: "15"},
        { console: "PS4", count: "12"},
        { console: "PS5", count: "10"}
    ]);
    const ManageInventoryColDefs = [
        { headerName: 'Console', field: 'console'},
        { headerName: 'Number Available', field: 'count'},
    ];
return (
    <div className="table-display">
        <div className="table">
            <div className="ag-theme-alpine">
                <AgGridReact rowData={ManageInventoryData} columnDefs={ManageInventoryColDefs as any} />
            </div>
            </div>
        </div>
    )
}