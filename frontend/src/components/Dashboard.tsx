import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axiosInstance';
import Local from '../environment/env';
import Button from '../common/components/CommonButton';
import { toast } from 'react-toastify';
import FriendModal from '../common/components/FriendModal';
// import WaveModal from '../common/components/WaveModal';

const Dashboard:React.FC = () => {
  const token = localStorage.getItem('token');
  const [getwave, setGetwave] = useState<any>(false);
  const [getfriend, setGetfriend] = useState<any>(false);
  const [show, setShow] = useState(0);

  const getLatestWaves = async() => {
    try{
      const response = await api.get(`${Local.GET_LATEST_WAVES}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data.waves;
    }
    catch(err:any){
      toast.error(err.response.data.message);
    }
  }

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['Latestwaves'],
    queryFn: getLatestWaves
  })

  const getMyFriends = async() => {
    try{
      const response = await api.get(`${Local.GET_FRIENDS}`, {
        headers: {
          'Authorization': `Bearer ${token}`
          }
      });

      return response.data;
    }
    catch(err:any){
      toast.error(err.response.data.message);
    }
  }

  const {data:friends, error:frienderror, isLoading:friendloading, isError:friendiserror} = useQuery({
    queryKey: ['Friends'],
    queryFn: getMyFriends
  })

  if (friends?.friends) {
    console.log(friends);
  }

  if (isLoading || friendloading) {
    return (<div>Loading...</div>);
  }

  if (isError  || friendiserror) {
    return (<div>Error: {error?.message} {frienderror?.message}</div>);
  }
  return (
    <>
      <div className='m-2' >
        {/* Waves */}
        <div>
          <div className="row bg-white p-4 rounded">
            <p className='h5 pb-3' >Making Waves</p>

            {data.map((wave:any)=>(
                
                  <div className="col-12 col-sm-6 col-lg-4 mb-5 " key={wave.uuid} data-bs-toggle="modal" data-bs-target="#staticBackdrop" 
                  onClick={()=>setGetwave(wave)} >
                      <div className='d-flex pb-0 border-end ' >
              
                          <div className='d-flex ' >
                          <img
                          src={
                            wave.user_wave.profile_photo
                              ? `${Local.BASE_URL}${wave.user_wave.profile_photo}`
                              : `https://api.dicebear.com/5.x/initials/svg?seed=${wave.user_wave.firstname} ${wave.user_wave.lastname}`
                          }
                          alt="User Profile"
                          className="rounded-circle border"
                          style={{ width: "50px", height: "50px" }}
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        />

                            <div className='ms-3 small ' >
                              <p className='mb-0 Link fw-medium fs-6 ' >{wave.user_wave.email}</p>
                              <p className='my-0 ' > {wave.text} </p>
                              <p className='m-0 Link fw-medium' > Follow </p>
                            </div>

                          </div>

                      </div>

                      {/* Modal */}
                        {getwave && (
                      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-lg ">
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

            <div className="photo mb-0 main-img-div ">
                <div className="d-flex photo ms-5  ">
                    <img
                        src={
                          getwave.user_wave.profile_photo
                            ? `${Local.BASE_URL}${getwave.user_wave.profile_photo}`
                            : `https://api.dicebear.com/5.x/initials/svg?seed=${getwave.user_wave.firstname} ${getwave.user_wave.lastname}`
                            }
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
                <div className='d-flex felx-wrap ms-5' >
                    <div className='d-flex flex-wrap mt-0 w-50  ' >
                        <div className='d-flex ' >
                            <div className='' >
                                <p className='mb-0 fw-semibold ' >Message</p>
                                <p className='mt-1 ms-2 text-secondary' >{getwave.text}</p>
                            </div>
                        </div>

                    </div>

                    <div className="d-flex photo border-start border-2 border-secondary-subtle ">
                        <img
                        src={`${Local.BASE_URL}${getwave.photo}`}
                        alt="User Profile"
                        className="ms-5 ps-5 "
                        style={{ width: "200px"}}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        />
                    </div>

                </div>

                <div className='ms-4' >
                    {!(show) && (
                        <div onClick={()=>{setShow(1)}} >
                            <Button text="Add Comments" type="button" />
                        </div>
                    )}
                    {show==1 && (
                        <div className="row 50  " >
                            <button className='btn btn-close col-1 mt-1 pt-3 me-2' onClick={()=>{setShow(0)}} />
                            <input type="text" className='form-control border-2 col' placeholder='Enter your comment' />
                            <button className='col-1 ms-2 rounded btn-clr text-white border-0' >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                                </svg>
                            </button>
                            <div className='col' ></div>
                        </div>
                    )}
                </div>
                <div
                className="pb-0 mt-2 ms-4 text-secondary bg-dark me-2 overflow-auto"
                style={{ maxHeight: "150px" }} // Adjust the maxHeight as needed
                >
                    <p className="mb-0 pb-1">
                        <b>Jasmine: </b>wefgkweimf
                    </p>
                </div>

            </div>

            </div>
        </div>  
                      </div>
                        )}
                  </div>
                
            ))}

          </div>
        </div>
        
        {/* Friends */}
        <div className='mt-5 mb-4' >
          

            <div className="row bg-white p-4 rounded">
              <p className='h5 pb-3' >Friends</p>
              
              {friends.friends.map((friend:any)=>(
                friend.friend_1.uuid==friends.user.uuid?(
                  <div className="col-12 col-lg-6 mb-3 " key={friend.uuid} data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>{setGetfriend(friend.friend_2)}}>
                    <div className='d-flex pb-0 frnd-card rounded ' >
                      <div className='d-flex ' >
                        <div className='pt-2 ps-2' >
                          <img
                          src={`https://api.dicebear.com/5.x/initials/svg?seed=${friend.friend_2.firstname} ${friend.friend_2.lastname}`}
                          alt="User Profile"
                          className="rounded-circle border"
                          style={{ width: "50px", height: "50px" }}
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          />
                        </div>

                        <div className='ms-3 small cmn-clr ' >
                          <p className='mb-0 mt-1 fw-bold fs-6 ' >{friend.friend_2.firstname}{friend.friend_2.lastname}</p>
                          <p className='mt-0 ' > {friend.friend_2.email} </p>
                        </div>

                      </div>

                      <div className='ms-auto mt-3 me-4' >
                          <p className='badge bg-success fw-medium rounded-4 px-3' >Accepted</p>
                      </div>
                    </div>
                  </div>
                ):(
                  <div className="col-12 col-lg-6 mb-3 " key={friend.uuid} data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>{setGetfriend(friend.friend_1)}}>
                    <div className='d-flex pb-0 frnd-card rounded ' >
                      <div className='d-flex ' >
                        <div className='pt-2 ps-2' >
                          <img
                          src={`https://api.dicebear.com/5.x/initials/svg?seed=${friend.friend_1.firstname} ${friend.friend_1.lastname}`}
                          alt="User Profile"
                          className="rounded-circle border"
                          style={{ width: "50px", height: "50px" }}
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          />
                        </div>

                        <div className='ms-3 small cmn-clr ' >
                          <p className='mb-0 mt-1 fw-bold fs-6 ' >{friend.friend_1.firstname}{friend.friend_1.lastname}</p>
                          <p className='mt-0 ' > {friend.friend_1.email} </p>
                        </div>

                      </div>

                      <div className='ms-auto mt-3 me-4' >
                          <p className='badge bg-success fw-medium rounded-4 px-3' >Accepted</p>
                      </div>
                    </div>
                  </div>
                )
              ))}

              {getfriend && (
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <FriendModal friend={getfriend} />
                </div>

              )}

            </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard