import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";

// QUARTZ THEME
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import data from "../data/employee.json";

const FactWiseDashboard = () => {

    const rowData = data.employees;

    const colDefs = useMemo(() => [
        { field: "id", filter: true, sortable: true, width: 90 },
        { field: "firstName", filter: true, sortable: true },
        { field: "lastName", filter: true, sortable: true },
        { field: "email", filter: true, width: 260 },
        { field: "department", filter: true, sortable: true },
        { field: "position", filter: true, sortable: true },
        { field: "salary", filter: true, sortable: true },
        { field: "hireDate", filter: true },
        { field: "age", filter: true },
        { field: "location", filter: true },
        { field: "performanceRating", filter: true },
        { field: "projectsCompleted", filter: true },
        { 
            field: "isActive", 
            headerName: "Active", 
            width: 120,
            cellRenderer: (param) =>
                param.value ? "✅ Active" : "❌ Inactive"
        },
        {
            field: "skills",
            headerName: "Skills",
            width: 230,
            cellRenderer: (params) => params.value.join(", ")
        },
        { field: "manager", filter: true }
    ], []);

    const gridOptions = {
        animateRows: true,
        rowHeight: 45,
    };

    return (
        <div className="ag-theme-quartz" style={{ height: 600, width: "100%" }}>
            <AgGridReact 
                rowData={rowData} 
                columnDefs={colDefs} 
                gridOptions={gridOptions}
            />
        </div>
    );
};

export default FactWiseDashboard;