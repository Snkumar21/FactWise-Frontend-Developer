import React, { useMemo, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
ModuleRegistry.registerModules([AllCommunityModule]);

import data from "../data/employee.json";

const FactWiseDashboard = () => {
    const [searchText, setSearchText] = useState("");
    const gridApiRef = useRef(null);

    const rowData = data?.employees ?? [];

    const colDefs = useMemo(() => [
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
            cellRenderer: (param) => (param.value ? "✅ Active" : "❌ Inactive"),
        },
        {
            field: "skills",
            headerName: "Skills",
            width: 230,
            cellRenderer: (params) => Array.isArray(params.value) ? params.value.join(", ") : "",
        },
        { field: "manager" },
    ], []);

    const defaultColDef = {
        sortable: true,
        filter: true,
        resizable: true,
    };

    const gridOptions = {
        animateRows: true,
        rowHeight: 45,
    };

    const applyQuickFilter = () => {
        const api = gridApiRef.current;
        if (!api) return;

        if (typeof api.setGridOption === 'function') {
            api.setGridOption("quickFilterText", searchText);
            api.onFilterChanged?.();
        } else if (typeof api.setQuickFilter === 'function') {
            api.setQuickFilter(searchText);
        } else {
            try {
                api.setFilterModel && api.setFilterModel(api.getFilterModel());
            } catch (e) {
                // ignore
            }
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2 style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "15px",
                background: "linear-gradient(90deg, #2b2b2bff, #686868ff)", WebkitBackgroundClip: "text", color: "transparent" }}>
                FactWise Employee Dashboard
            </h2>

            {/* SEARCH BAR */}
            <div style={{ marginBottom: "15px", display: "flex", gap: "10px", alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="🔍 Search anything..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') applyQuickFilter(); }}
                    style={{
                        width: "320px",
                        padding: "10px 15px",
                        borderRadius: "12px",
                        border: "2px solid #2200b8ff",
                        outline: "none",
                        fontSize: "16px",
                        background: "#fff7f0",
                    }}
                />

                <button
                    onClick={applyQuickFilter}
                    style={{
                        padding: "10px 20px",
                        background: "linear-gradient(103deg,#2200b8ff,#5bc9ff)",
                        border: "none",
                        color: "white",
                        borderRadius: "12px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "16px",
                    }}
                >
                    Apply
                </button>

                <button
                    onClick={() => { setSearchText(''); if (gridApiRef.current) { if (typeof gridApiRef.current.setGridOption === 'function') { gridApiRef.current.setGridOption('quickFilterText', ''); gridApiRef.current.onFilterChanged?.(); } else { gridApiRef.current.setQuickFilter && gridApiRef.current.setQuickFilter(''); } } }}
                    style={{
                        padding: "10px 14px",
                        background: "#e6e6e6",
                        border: "none",
                        color: "#333",
                        borderRadius: "12px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "14px",
                    }}
                >
                    Clear
                </button>
            </div>

            {/* AG GRID */}
            <div className="ag-theme-quartz" style={{ height: 600, width: "100%", borderRadius: "14px" }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    gridOptions={gridOptions}
                    onGridReady={(params) => { gridApiRef.current = params.api; params.api.sizeColumnsToFit(); window.addEventListener('resize', () => params.api.sizeColumnsToFit()); }}
                />
            </div>
        </div>
    );
};

export default FactWiseDashboard;