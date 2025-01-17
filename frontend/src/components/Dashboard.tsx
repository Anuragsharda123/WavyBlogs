import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axiosInstance';
import Local from '../environment/env';
import { toast } from 'react-toastify';
import WaveModal from '../common/components/WaveModal';

const Dashboard:React.FC = () => {
  const token = localStorage.getItem('token');

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

  console.log(data);

  if (isLoading) {
    return (<div>Loading...</div>);
  }

  if (isError) {
    return (<div>Error: {error.message}</div>);
  }
  return (
    <>
      <div className='m-2' >
        {/* Waves */}
        <div>
          <div className="row bg-white p-4 rounded">
            <p className='h5 pb-3' >Making Waves</p>

            {data.map((wave:any)=>(
              <>
                <div className="col-12 col-sm-6 col-lg-4 mb-5 " key={wave.uuid} data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
                    <div className='d-flex pb-0 border-end ' >
            
                        <div className='d-flex ' >
                          {wave.user_wave.profile_photo && (
                            <div className='pt-1 ps-2' >
                              <img
                              src={`${Local.BASE_URL}${wave.user_wave.profile_photo}`}
                              alt="User Profile"
                              className="rounded-circle border"
                              style={{ width: "50px", height: "50px" }}
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              />
                            </div>
                          )}
                          {!(wave.user_wave.profile_photo) && (
                            <div className='pt-1 ps-2' >
                              <img
                              src={`https://api.dicebear.com/5.x/initials/svg?seed=$A S`}
                              alt="User Profile"
                              className="rounded-circle border"
                              style={{ width: "50px", height: "50px" }}
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              />
                            </div>
                          )}

                          

                          <div className='ms-3 small ' >
                            <p className='mb-0 Link fw-medium fs-6 ' >{wave.user_wave.email}</p>
                            <p className='my-0 ' > {wave.text} </p>
                            <p className='m-0 Link fw-medium' > Follow </p>
                          </div>

                        </div>

                    </div>
                </div>

                {/* Modal */}
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                  <WaveModal />
                </div>
              </>
            ))}

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