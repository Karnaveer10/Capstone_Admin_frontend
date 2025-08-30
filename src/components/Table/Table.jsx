import React from 'react'
import './Table.css'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
const table = () => {
    const [teams, setTeams] = useState([]);
    const [panel1, setPanel1] = useState([]);
    const [panel2, setPanel2] = useState([]);
    const [panel1Selected, setPanel1Selected] = useState("");
    const [panel2Selected, setPanel2Selected] = useState("");
    const [rowSelections, setRowSelections] = useState({});
    // structure: { 0: { panel1: "", panel2: "" }, 1: { panel1: "", panel2: "" } }

    const handleChange = (rowIndex, field, value) => {
        setRowSelections(prev => ({
            ...prev,
            [rowIndex]: {
                ...prev[rowIndex],
                [field]: value,
            }
        }));
    };
    const updateDb=async(rowIndex,guideName)=>{
        try {

                const url = "http://127.0.0.1:3000";
                const res = await axios.post(`${url}/panel_update`,
                    {
                        guideName: guideName,
                        panel1: rowSelections[rowIndex]?.panel1 || "",
                        panel2: rowSelections[rowIndex]?.panel2 || ""
                    });
                console.log(res.data);


            } catch (error) {
                console.error("Error:", error.message);
            }
    }

    useEffect(() => {
        const getData = async () => {
            try {

                const url = "http://127.0.0.1:3000";
                const teamres = await axios.get(`${url}/admin_get_teaminfo`,);
                setTeams(teamres.data);
                const profres = await axios.get(`${url}/admin_get_profdata`,);
                console.log(profres.data);
                setPanel1(profres.data);
                setPanel2(profres.data);


            } catch (error) {
                console.error("Error:", error.message);
            }
        }
        getData();
    }, [])

    return (
        <div>
            <div className="table-container">
                <table className="slot-table">
                    <thead>
                        <tr>
                            <th>Group Memebers</th>
                            <th>Guide</th>
                            <th>Panel 1 </th>
                            <th>Panel 2</th>
                            <th>Save</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((t, index) => {
                            const selection = rowSelections[index] || { panel1: "", panel2: "" };

                            return (
                                <tr key={index}>
                                    <td>
                                        <ul>
                                            {t.students.map((s, i) => (
                                                <li key={i}>
                                                    {s.regno} {s.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>{t.guideName}</td>

                                    {/* Panel 1 */}
                                    <td>
                                        <select
                                            value={selection.panel1}
                                            onChange={(e) => handleChange(index, "panel1", e.target.value)}
                                        >
                                            <option value="">Select Panel 1</option>
                                            {panel1.map((p1, i) =>
                                                p1.name !== t.guideName && p1.name !== selection.panel2 && (
                                                    <option key={i} value={p1.name}>{p1.name}</option>
                                                )
                                            )}
                                        </select>
                                    </td>

                                    {/* Panel 2 */}
                                    <td>
                                        <select
                                            value={selection.panel2}
                                            onChange={(e) => handleChange(index, "panel2", e.target.value)}
                                        >
                                            <option value="">Select Panel 2</option>
                                            {panel2.map((p2, i) =>
                                                p2.name !== t.guideName && p2.name !== selection.panel1 && (
                                                    <option key={i} value={p2.name}>{p2.name}</option>
                                                )
                                            )}
                                        </select>
                                    </td>

                                    <td><button className='btn-save' onClick={()=>updateDb(index,t.guideName)}>Save</button></td>
                                    <td><button className='btn-edit'>Edit</button></td>
                                </tr>
                            );
                        })}





                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default table
