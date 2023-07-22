import React, {  useState } from 'react'
import SaveModal from './SaveModal';


const SaveButton = ({course, studentId}) => {
    const likeIcon = '\u2665';
    const outlineLikeIcon = '\u2661'
    const [savedState, setSavedState] = useState(null);
    //console.log('save', savedState)

    // Edit Course State
    const [editModalState, setEditModal] = useState(false);
    // Set State Function
    const handleEditModalOpen = () => setEditModal(true);
    const handleEditModalClose = () => setEditModal(false);

    // useEffect(()=>{
    //     const getSaved= 
    // })

  return (
 
    <div>
        {savedState ? (
            <>
             <button className='save-button'
   >{likeIcon}</button>
            </>
        ):(
            <> 
            <button className='save-button'
          onClick = {handleEditModalOpen}>{outlineLikeIcon}</button>
        <SaveModal
                show = {editModalState}
                handleClose = {handleEditModalClose}
                course ={course}
                studentId={studentId}
                save={setSavedState}/>
                </>
        )}
     </div>

  )
}

export default SaveButton