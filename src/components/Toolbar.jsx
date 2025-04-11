
function Toolbar({ add }){
    return(
        <div className="toolbar-wrapper">
            <div className="toolbar">
                <span className="toolbar-btn" onClick={add}>Add</span>
                <span className="toolbar-btn">Edit</span>
                <span className="toolbar-btn-delete">Delete</span>
            </div>
        </div>
        
    )
}

export default Toolbar