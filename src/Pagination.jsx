import React from 'react'

function Pagination({goToNextPage,goToPrevPage}) {
  return (
    <div className='flex flex-row items-center justify-center'>
        {goToPrevPage && <button className="m-2 p-2  border-blue-600  border-[2px] hover:bg-orange-400" onClick={goToPrevPage}>Previous</button>}
        {goToNextPage && < button className="m-2 p-2  border-blue-600  border-[2px] hover:bg-orange-400" onClick={goToNextPage}>Next</button>}
    </div>
  )
}

export default Pagination