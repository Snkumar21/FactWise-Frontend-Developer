import React, { useState, useMemo, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
ModuleRegistry.registerModules([AllCommunityModule]);

const employeesData = [
    { "id": 1, "firstName": "John", "lastName": "Smith", "email": "john.smith@company.com", "department": "Engineering", "position": "Senior Developer", "salary": 95000, "hireDate": "2021-03-15", "age": 32, "location": "New York", "performanceRating": 4.2, "projectsCompleted": 12, "isActive": true, "skills": ["JavaScript", "React", "Node.js"], "manager": "Sarah Johnson" },
    { "id": 2, "firstName": "Emily", "lastName": "Davis", "email": "emily.davis@company.com", "department": "Marketing", "position": "Marketing Manager", "salary": 78000, "hireDate": "2020-07-22", "age": 29, "location": "Los Angeles", "performanceRating": 4.5, "projectsCompleted": 8, "isActive": true, "skills": ["Digital Marketing", "SEO", "Analytics"], "manager": "Michael Brown" },
    { "id": 3, "firstName": "Michael", "lastName": "Brown", "email": "michael.brown@company.com", "department": "Marketing", "position": "VP Marketing", "salary": 125000, "hireDate": "2019-01-10", "age": 38, "location": "Los Angeles", "performanceRating": 4.7, "projectsCompleted": 15, "isActive": true, "skills": ["Strategy", "Leadership", "Brand Management"], "manager": null },
    { "id": 4, "firstName": "Sarah", "lastName": "Johnson", "email": "sarah.johnson@company.com", "department": "Engineering", "position": "Engineering Manager", "salary": 115000, "hireDate": "2018-11-05", "age": 35, "location": "New York", "performanceRating": 4.6, "projectsCompleted": 18, "isActive": true, "skills": ["Team Leadership", "Architecture", "Python"], "manager": "David Wilson" },
    { "id": 5, "firstName": "David", "lastName": "Wilson", "email": "david.wilson@company.com", "department": "Engineering", "position": "CTO", "salary": 180000, "hireDate": "2017-05-12", "age": 42, "location": "New York", "performanceRating": 4.8, "projectsCompleted": 25, "isActive": true, "skills": ["Technical Strategy", "Leadership", "Cloud Architecture"], "manager": null },
    { "id": 6, "firstName": "Lisa", "lastName": "Garcia", "email": "lisa.garcia@company.com", "department": "Sales", "position": "Sales Representative", "salary": 65000, "hireDate": "2022-02-28", "age": 26, "location": "Chicago", "performanceRating": 3.9, "projectsCompleted": 6, "isActive": true, "skills": ["CRM", "Negotiation", "Customer Relations"], "manager": "Robert Martinez" },
    { "id": 7, "firstName": "Robert", "lastName": "Martinez", "email": "robert.martinez@company.com", "department": "Sales", "position": "Sales Manager", "salary": 92000, "hireDate": "2020-09-14", "age": 34, "location": "Chicago", "performanceRating": 4.3, "projectsCompleted": 11, "isActive": true, "skills": ["Sales Strategy", "Team Management", "B2B Sales"], "manager": "Jennifer Lee" },
    { "id": 8, "firstName": "Jennifer", "lastName": "Lee", "email": "jennifer.lee@company.com", "department": "Sales", "position": "VP Sales", "salary": 135000, "hireDate": "2019-06-18", "age": 40, "location": "Chicago", "performanceRating": 4.6, "projectsCompleted": 16, "isActive": true, "skills": ["Strategic Sales", "Leadership", "Market Analysis"], "manager": null },
    { "id": 9, "firstName": "James", "lastName": "Anderson", "email": "james.anderson@company.com", "department": "HR", "position": "HR Specialist", "salary": 58000, "hireDate": "2021-08-30", "age": 28, "location": "Austin", "performanceRating": 4.0, "projectsCompleted": 7, "isActive": true, "skills": ["Recruitment", "Employee Relations", "HRIS"], "manager": "Karen White" },
    { "id": 10, "firstName": "Karen", "lastName": "White", "email": "karen.white@company.com", "department": "HR", "position": "HR Manager", "salary": 85000, "hireDate": "2019-12-02", "age": 36, "location": "Austin", "performanceRating": 4.4, "projectsCompleted": 13, "isActive": true, "skills": ["HR Strategy", "Policy Development", "Leadership"], "manager": null },
    { "id": 11, "firstName": "Alex", "lastName": "Thompson", "email": "alex.thompson@company.com", "department": "Engineering", "position": "Junior Developer", "salary": 72000, "hireDate": "2023-01-16", "age": 24, "location": "New York", "performanceRating": 3.8, "projectsCompleted": 4, "isActive": true, "skills": ["Java", "Spring Boot", "MySQL"], "manager": "Sarah Johnson" },
    { "id": 12, "firstName": "Maria", "lastName": "Rodriguez", "email": "maria.rodriguez@company.com", "department": "Finance", "position": "Financial Analyst", "salary": 68000, "hireDate": "2021-11-08", "age": 30, "location": "Miami", "performanceRating": 4.1, "projectsCompleted": 9, "isActive": true, "skills": ["Financial Modeling", "Excel", "SAP"], "manager": "Thomas Clark" },
    { "id": 13, "firstName": "Thomas", "lastName": "Clark", "email": "thomas.clark@company.com", "department": "Finance", "position": "Finance Manager", "salary": 98000, "hireDate": "2018-04-25", "age": 37, "location": "Miami", "performanceRating": 4.5, "projectsCompleted": 14, "isActive": true, "skills": ["Financial Planning", "Budget Management", "Leadership"], "manager": null },
    { "id": 14, "firstName": "Amanda", "lastName": "Taylor", "email": "amanda.taylor@company.com", "department": "Marketing", "position": "Content Specialist", "salary": 55000, "hireDate": "2022-06-12", "age": 25, "location": "Los Angeles", "performanceRating": 3.7, "projectsCompleted": 5, "isActive": true, "skills": ["Content Writing", "Social Media", "Adobe Creative"], "manager": "Michael Brown" },
    { "id": 15, "firstName": "Ryan", "lastName": "Miller", "email": "ryan.miller@company.com", "department": "Engineering", "position": "DevOps Engineer", "salary": 88000, "hireDate": "2020-10-19", "age": 31, "location": "Seattle", "performanceRating": 4.3, "projectsCompleted": 10, "isActive": true, "skills": ["AWS", "Docker", "Kubernetes"], "manager": "Sarah Johnson" },
    { "id": 16, "firstName": "Jessica", "lastName": "Moore", "email": "jessica.moore@company.com", "department": "Sales", "position": "Account Executive", "salary": 75000, "hireDate": "2021-04-03", "age": 27, "location": "Denver", "performanceRating": 4.0, "projectsCompleted": 8, "isActive": false, "skills": ["Account Management", "Salesforce", "Presentation"], "manager": "Robert Martinez" },
    { "id": 17, "firstName": "Daniel", "lastName": "Harris", "email": "daniel.harris@company.com", "department": "Finance", "position": "Senior Accountant", "salary": 73000, "hireDate": "2019-08-14", "age": 33, "location": "Miami", "performanceRating": 4.2, "projectsCompleted": 12, "isActive": true, "skills": ["Accounting", "Tax Preparation", "QuickBooks"], "manager": "Thomas Clark" },
    { "id": 18, "firstName": "Nicole", "lastName": "Jackson", "email": "nicole.jackson@company.com", "department": "HR", "position": "Recruiter", "salary": 62000, "hireDate": "2022-09-05", "age": 29, "location": "Austin", "performanceRating": 3.9, "projectsCompleted": 6, "isActive": true, "skills": ["Talent Acquisition", "LinkedIn Recruiter", "Interviewing"], "manager": "Karen White" },
    { "id": 19, "firstName": "Kevin", "lastName": "Wright", "email": "kevin.wright@company.com", "department": "Engineering", "position": "QA Engineer", "salary": 76000, "hireDate": "2020-12-07", "age": 30, "location": "Seattle", "performanceRating": 4.1, "projectsCompleted": 11, "isActive": true, "skills": ["Test Automation", "Selenium", "API Testing"], "manager": "Sarah Johnson" },
    { "id": 20, "firstName": "Stephanie", "lastName": "Lopez", "email": "stephanie.lopez@company.com", "department": "Marketing", "position": "Digital Marketing Specialist", "salary": 64000, "hireDate": "2021-12-20", "age": 26, "location": "Phoenix", "performanceRating": 3.8, "projectsCompleted": 7, "isActive": true, "skills": ["Google Ads", "Facebook Ads", "Email Marketing"], "manager": "Michael Brown" }
];

// RENDER BADGES
const ActiveBadge = ({ value }) => {
    const text = value ? "Active" : "Inactive";
    const bg = value ? "bg-green-100" : "bg-gray-200";
    const textColor = value ? "text-green-800" : "text-gray-600";

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${bg} ${textColor}`}>
            {text}
        </span>
    );
};

const SkillsRenderer = ({ value }) => {
    if (!Array.isArray(value)) return null;
    return (
        <div className="flex flex-wrap gap-1">
            {value.map((skill, index) => (
                <span
                    key={index}
                    className="text-[11px] px-2 py-0.5 rounded-md border border-gray-300 bg-white"
                >
                    {skill}
                </span>
            ))}
        </div>
    );
};

// MAIN COMPONENT
export default function FactWiseDashboard() {
    const gridRef = useRef(null);
    const [gridApi, setGridApi] = useState(null);

    const onGridReady = (params) => {
        setGridApi(params.api);
    };

    const [rowData] = useState(employeesData);
    const [quickFilter, setQuickFilter] = useState("");

    // Stats
    const stats = useMemo(() => {
        const total = rowData.length;
        const avgSalary = Math.round(
            rowData.reduce((s, r) => s + (r.salary || 0), 0) / total
        );
        const activeCount = rowData.filter(r => r.isActive).length;
        const byDept = rowData.reduce((acc, r) => {
            acc[r.department] = (acc[r.department] || 0) + 1;
            return acc;
        }, {});

        return { total, avgSalary, activeCount, byDept };
    }, [rowData]);

    // Column Definitions
    const columnDefs = useMemo(
        () => [
            { headerName: "ID", field: "id", width: 80 },
            {
                headerName: "Name",
                valueGetter: p => `${p.data.firstName} ${p.data.lastName}`,
                sortable: true,
                filter: "agTextColumnFilter",
                minWidth: 160,
            },
            { headerName: "Email", field: "email", minWidth: 220 },
            { headerName: "Department", field: "department", filter: "agSetColumnFilter" },
            { headerName: "Position", field: "position", minWidth: 160 },
            {
                headerName: "Salary",
                field: "salary",
                valueFormatter: p =>
                    p.value ? `$${p.value.toLocaleString()}` : "",
                filter: "agNumberColumnFilter",
            },
            {
                headerName: "Hire Date",
                field: "hireDate",
                valueFormatter: p =>
                    p.value ? new Date(p.value).toLocaleDateString() : "",
            },
            { headerName: "Age", field: "age", width: 100 },
            { headerName: "Location", field: "location" },
            { headerName: "Perf.", field: "performanceRating", width: 110 },
            { headerName: "Projects", field: "projectsCompleted", width: 110 },
            {
                headerName: "Active",
                field: "isActive",
                width: 120,
                cellRenderer: p => <ActiveBadge value={p.value} />,
            },
            {
                headerName: "Skills",
                field: "skills",
                minWidth: 200,
                cellRenderer: p => <SkillsRenderer value={p.value} />,
            },
            { headerName: "Manager", field: "manager" },
        ],
        []
    );

    const defaultColDef = useMemo(
        () => ({
            resizable: true,
            sortable: true,
            filter: true,
            floatingFilter: true,
            minWidth: 80,
        }),
        []
    );

    // Export CSV
    const onExport = () => {
        gridRef.current?.api.exportDataAsCsv({
            fileName: "factwise_employees.csv",
        });
    };

    // Quick Filter
    useEffect(() => {
        if (gridApi) {
            gridApi.setQuickFilter(quickFilter);
        }
    }, [quickFilter, gridApi]);

    return (
        <div className="p-6 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <header className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold">FactWise — Employee Dashboard</h1>
                        <p className="text-sm text-gray-600">
                            Client-side AG Grid implementation to showcase sorting, filtering and handling datasets efficiently.
                        </p>
                    </div>

                    <div className="flex gap-2 items-center">
                        <input
                            placeholder="Quick search (name, email, dept...)"
                            value={quickFilter}
                            onChange={(e) => setQuickFilter(e.target.value)}
                            className="px-3 py-2 border rounded-md text-sm"
                        />
                        <button
                            onClick={onExport}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
                        >
                            Export CSV
                        </button>
                    </div>
                </header>

                {/* Stats Section */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-white rounded-lg shadow text-center">
                        <h3 className="text-sm text-gray-600">Total Employees</h3>
                        <p className="text-xl font-semibold">{stats.total}</p>
                    </div>

                    <div className="p-4 bg-white rounded-lg shadow text-center">
                        <h3 className="text-sm text-gray-600">Avg Salary</h3>
                        <p className="text-xl font-semibold">${stats.avgSalary.toLocaleString()}</p>
                    </div>

                    <div className="p-4 bg-white rounded-lg shadow text-center">
                        <h3 className="text-sm text-gray-600">Active Employees</h3>
                        <p className="text-xl font-semibold">{stats.activeCount}</p>
                    </div>
                </div>

                {/* AG Grid */}
                <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
                    <AgGridReact
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        animateRows={true}
                        onGridReady={onGridReady}
                    />
                </div>
            </div>
        </div>
    );
}