import React, { useState } from "react"
import { axiosWithAuth } from "../utils/axiosWithAuth";

const AddColorForm = ({ updateColors }) => {
    const [color, setColor] = useState({
        color: "",
        code: { hex: "" }
    })
    
    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth().post("colors", color)
            .then(res => updateColors(res.data))
            .catch(err => console.log("Failed to add color", err))
        setColor({
            color: "",
            code: { hex: "" }
        })    
    }

    return (
    <form onSubmit={handleSubmit}>
        <h3> Add a new color</h3>
            <label>
            Color name:
            <input
            onChange={e =>
                setColor({ ...color, color: e.target.value })
            }
            value={color.color}
            />
        </label>
        <label>
            Hex code:
            <input
            onChange={e =>
                setColor({
                ...color,
                code: { hex: e.target.value }
                })
            }
            value={color.code.hex}
            />
        </label>
        <div className="button-row">
            <button type="submit">Add Color</button>
        </div>
    </form>
    )
}

export default AddColorForm