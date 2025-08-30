import React, { useState, useEffect } from 'react';
import './Table.css';

const Table = () => {
    const [teams, setTeams] = useState([]);
    const [panel1, setPanel1] = useState([]);
    const [panel2, setPanel2] = useState([]);
    const [rowSelections, setRowSelections] = useState({});

    const handleChange = (rowIndex, field, value) => {
        setRowSelections(prev => ({
            ...prev,
            [rowIndex]: {
                ...prev[rowIndex],
                [field]: value,
            }
        }));
    };

    const updateDb = async (rowIndex, guideName) => {
        try {
            // Uncomment and modify this section for your actual API call
            /*
            const url = "http://127.0.0.1:3000";
            const res = await axios.post(`${url}/panel_update`,
                {
                    guideName: guideName,
                    panel1: rowSelections[rowIndex]?.panel1 || "",
                    panel2: rowSelections[rowIndex]?.panel2 || ""
                });
            console.log(res.data);
            */
            
            console.log("Updating database:", {
                guideName: guideName,
                panel1: rowSelections[rowIndex]?.panel1 || "",
                panel2: rowSelections[rowIndex]?.panel2 || ""
            });
            alert("Data saved successfully!");
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                // Uncomment and modify this section for actual API calls
                /*
                const url = "http://127.0.0.1:3000";
                const teamres = await axios.get(`${url}/admin_get_teaminfo`);
                setTeams(teamres.data);
                const profres = await axios.get(`${url}/admin_get_profdata`);
                console.log(profres.data);
                setPanel1(profres.data);
                setPanel2(profres.data);
                */

                // Mock data for demonstration - replace with your actual API calls
                setTeams([
                    {
                        guideName: "Ravi Kumar",
                        students: [
                            { regno: "21BCS001", name: "Alice" },
                            { regno: "21BCS002", name: "Bob" }
                        ]
                    },
                    {
                        guideName: "Arvind Sharma", 
                        students: [
                            { regno: "24BDS3042", name: "Mark" },
                            { regno: "24BDS1230", name: "Jacob" }
                        ]
                    }
                ]);

                const panelData = [
                    { name: "Anita Deshmukh" },
                    { name: "Ravi Kumar" },
                    { name: "Arvind Sharma" },
                    { name: "Meena Iyer" },
                    { name: "Suresh Nair" }
                ];
                
                setPanel1(panelData);
                setPanel2(panelData);

                // Set some initial selections for demo
                setRowSelections({
                    0: { panel1: "Anita Deshmukh", panel2: "Meena Iyer" },
                    1: { panel1: "Ravi Kumar", panel2: "Suresh Nair" }
                });

            } catch (error) {
                console.error("Error:", error.message);
            }
        };
        getData();
    }, []);

    return (
        <div className="page-container">
            

            {/* Table Container */}
            <div className="main-container">
                <div className="table-wrapper">
                    <table className="capstone-table">
                        <thead>
                            <tr>
                                <th>GROUP MEMBERS</th>
                                <th>GUIDE</th>
                                <th>PANEL 1</th>
                                <th>PANEL 2</th>
                                <th>SAVE</th>
                                <th>EDIT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map((team, index) => {
                                const selection = rowSelections[index] || { panel1: "", panel2: "" };
                                
                                return (
                                    <tr key={index}>
                                        <td className="group-members-cell">
                                            <div className="students-list">
                                                {team.students.map((student, i) => (
                                                    <div key={i} className="student-item">
                                                        <span className="bullet-point"></span>
                                                        <span className="student-regno">{student.regno}</span>
                                                        <span className="student-name">{student.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        
                                        <td className="guide-cell">{team.guideName}</td>

                                        <td className="panel-cell">
                                            <select
                                                className="panel-select"
                                                value={selection.panel1}
                                                onChange={(e) => handleChange(index, "panel1", e.target.value)}
                                            >
                                                <option value="">Select Panel 1</option>
                                                {panel1.map((p1, i) =>
                                                    p1.name !== team.guideName && p1.name !== selection.panel2 && (
                                                        <option key={i} value={p1.name}>{p1.name}</option>
                                                    )
                                                )}
                                            </select>
                                        </td>

                                        <td className="panel-cell">
                                            <select
                                                className="panel-select"
                                                value={selection.panel2}
                                                onChange={(e) => handleChange(index, "panel2", e.target.value)}
                                            >
                                                <option value="">Select Panel 2</option>
                                                {panel2.map((p2, i) =>
                                                    p2.name !== team.guideName && p2.name !== selection.panel1 && (
                                                        <option key={i} value={p2.name}>{p2.name}</option>
                                                    )
                                                )}
                                            </select>
                                        </td>

                                        <td className="action-cell">
                                            <button 
                                                className="btn-save"
                                                onClick={() => updateDb(index, team.guideName)}
                                            >
                                                Save
                                            </button>
                                        </td>

                                        <td className="action-cell">
                                            <button className="btn-edit">
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Table;
