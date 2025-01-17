import React from 'react';
import '../../styling/createwave.css';

// content for close modal 
// data-bs-dismiss="modal" aria-label="Close"
const WaveModal:React.FC = () => {
    return (
        
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg ">
            <div className="modal-content">
            <div className="mx-2 mt-1 rounded">
                <div className="d-flex justify-content-between align-items-center cw-clr py-4 rounded-top-2">
                    <div className='close' >
                        <svg width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg" data-bs-dismiss="modal" aria-label="Close">
                            <ellipse cx="11.4194" cy="12.6786" rx="10.7319" ry="11.7643" fill="#DECAA5"/>
                            <line y1="-0.5" x2="15.924" y2="-0.5" transform="matrix(0.673947 0.738779 -0.673947 0.738779 6.64966 7.44995)" stroke="#B18D4B"/>
                            <line y1="-0.5" x2="15.924" y2="-0.5" transform="matrix(-0.673947 0.738779 0.673947 0.738779 17.3816 7.44995)" stroke="#B18D4B"/>
                        </svg>

                    </div>
                    <p className="fw-bold mx-auto cw-clr display-1 ">Details</p>
                </div>
            </div>

            <div className="photo ms-5 mb-0 main-img-div ">
                <div className="d-flex photo  ">
                <img
                    src={`https://api.dicebear.com/5.x/initials/svg?seed=A S`}
                    alt="User Profile"
                    className="rounded-circle border"
                    style={{ width: "100px", height: "100px" }}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                />
                <div>
                    <p className="mt-0 mb-0 ms-5 text-white fs-5 fw-semibold"> Full Name </p>
                    <p className="mt-0 ms-5 text-white fs-5 fw-light"> Email </p>
                </div>
                </div>

                <div className='d-flex flex-wrap mt-0 ' >
                    <div  >
                        <p>Message</p>
                    </div>
                    <div></div>
                </div>

            </div>

            </div>
        </div>
    
  )
}

export default WaveModal