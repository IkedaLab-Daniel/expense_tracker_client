
function Toolbar({ add, edit, delete_book}){
    return(
        <div className="toolbar-wrapper">
            <div className="toolbar">
                <span className="toolbar-btn" onClick={add}>Add</span>
                <span className="toolbar-btn" onClick={edit}>Edit</span>
                <span className="toolbar-btn-delete" onClick={delete_book}>Delete</span>
            </div>
        </div>
        
    )
}

export default Toolbar