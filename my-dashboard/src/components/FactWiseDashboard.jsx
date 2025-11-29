import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";

// AG Grid Quartz Theme + All Modules
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
ModuleRegistry.registerModules([AllCommunityModule]);

// FIX: Correct JSON filename
import data from "../data/employee.json";

const FactWiseDashboard = () => {

    const rowData = data.employees;

    const colDefs = useMemo(
        () => [
            { field: "id", width: 90 },
            { field: "firstName" },
            { field: "lastName" },
            { field: "email", width: 260 },
            { field: "department" },
            { field: "position" },
            { field: "salary" },
            { field: "hireDate" },
            { field: "age" },
            { field: "location" },
            { field: "performanceRating" },
            { field: "projectsCompleted" },
            {
                field: "isActive",
                headerName: "Active",
                width: 120,
                cellRenderer: (param) =>
                    param.value ? "✅ Active" : "❌ Inactive",
            },
            {
                field: "skills",
                headerName: "Skills",
                width: 230,
                cellRenderer: (params) => params.value.join(", "),
            },
            { field: "manager" },
        ],
        []
    );

    const defaultColDef = {
        sortable: true,
        filter: true,
        resizable: true,
    };

    const gridOptions = {
        animateRows: true,
        rowHeight: 45,
    };

    return (
        <div className="ag-theme-quartz" style={{ height: 600, width: "100%" }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                gridOptions={gridOptions}
            />
        </div>
    );
};

export default FactWiseDashboard;