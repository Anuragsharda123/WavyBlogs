import React from 'react'

const Dashboard:React.FC = () => {

  return (
    <>
      <div className='m-2' >
        {/* Waves */}
        <div>
          <div className="row bg-white p-4 rounded">
          <p className='h5 pb-3' >Making Waves</p>
          
            <div className="col-12 col-sm-6 col-lg-4 mb-3">
              <div className="p-3 border bg-light">Item 1</div>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mb-3">
              <div className="p-3 border bg-light">Item 2</div>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mb-3">
              <div className="p-3 border bg-light">Item 3</div>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mb-3">
              <div className="p-3 border bg-light">Item 4</div>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mb-3">
              <div className="p-3 border bg-light">Item 5</div>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mb-3">
              <div className="p-3 border bg-light">Item 6</div>
            </div>

          </div>
        </div>
        
        {/* Friends */}
        <div className='mt-5 mb-4' >

            <div className="row bg-white p-4 rounded">
              <p className='h5 pb-3' >Friends</p>
                <div className="col-12 col-lg-6 mb-3">
                  <div className="p-3 border bg-light">Item 1</div>
                </div>
                <div className="col-12 col-lg-6 mb-3">
                  <div className="p-3 border bg-light">Item 2</div>
                </div>
                <div className="col-12 col-lg-6 mb-3">
                  <div className="p-3 border bg-light">Item 3</div>
                </div>
                <div className="col-12 col-lg-6 mb-3">
                  <div className="p-3 border bg-light">Item 4</div>
                </div>
                <div className="col-12 col-lg-6 mb-3">
                  <div className="p-3 border bg-light">Item 5</div>
                </div>
                <div className="col-12 col-lg-6 mb-3">
                  <div className="p-3 border bg-light">Item 6</div>
                </div>

            </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard