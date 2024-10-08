import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function PrivateNews() {
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  function getLastNews() {
    return axios
      .get(`https://syrianrevolution1.com/users/single/${localStorage.getItem('idUserLogin')}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error('Error fetching the data: ', error);
      });
  }

  let { data, refetch } = useQuery('last', getLastNews);

  const handleChange = async (event, newsId) => {
    const newValue = event.target.value;
    try {
      await updateVisibility(newsId, newValue);
      setSelectedOption((prevOptions) => ({
        ...prevOptions,
        [newsId]: newValue,
      }));
    } catch (error) {
      console.error('حدث خطأ أثناء تحديث الرؤية:', error);
    }
  };

  const updateVisibility = async (newsId, newValue) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `https://syrianrevolution1.com/lists/updateVisibility/${newsId}`,
        { visibility: newValue },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log('تم تحديث الرؤية بنجاح', res);
      refetch();
    } catch (error) {
      console.error('حدث خطأ أثناء تحديث الرؤية:', error);
    }
  };
const publish = async (postId) => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await axios.post(
      `https://syrianrevolution1.com/lists/posts/${localStorage.getItem('idUserLogin')}/publish/${postId}`,
      {},
      {
        headers: {
          Authorization: ` ${token}`, 
        },
      }
    );

    console.log(response.data); 


    refetch();

  } catch (err) {
    console.error('Error occurred:', err);
    alert('حدث خطأ أثناء الاتصال بالخادم.');
  }
};

  return (
    <>
      <section className="regime" style={{ marginBottom: '50px' }}>
        <div className="container py-2">
          
              <div className="header position-relative py-5">
          <h5 className=" text-danger">منشوراتي الخاصة</h5>
        </div>
          <Swiper spaceBetween={30} slidesPerView={4}>
            {data?.lists
              ?.filter((e) => e.category === 'lastNews' && e.visibility === 'خاص بي')
              ?.map((last, i) => (
                <SwiperSlide key={i}>
                  <div>
                    <select
                      id="small-dropdown"
                      value={selectedOption[last._id] || last.visibility}
                      onChange={(event) => handleChange(event, last._id)}
                      style={{ padding: '5px', fontSize: '14px' }}
                      className="m-2"
                    >
                      <option value="" disabled>
                        {last.visibility}
                      </option>
                      <option value="العامة">العامة</option>
                      <option value="خاص بي">خاص بي</option>
                    </select>
                  </div>

                  {last.images.length > 0 && (
                    <img
                      src={`https://syrianrevolution1.com/postImages/${last.images[0]?.imgPath}`}
                      alt={last.images[0]?.description || 'image'}
                      className="w-100 rounded-3 fimg"
                    />
                  )}

                  {last.video && (
                    <video
                      width="320"
                      height="240px"
                      style={{ width: '100%', marginBottom: '30px', height: '200px' }}
                      className="w-100 rounded-3 fimg"
                      controls
                    >
                      <source src={`https://syrianrevolution1.com/postImages/${last?.video}`} type="video/mp4" />
                      المتصفح الخاص بك لا يدعم تشغيل الفيديو.
                    </video>
                  )}

                  <p>
                    {last.name}
                    <br />
                    <button
                      className="btu d-inline-block mx-1 px-3 rounded-3"
                      onClick={() => navigate(`/newsDetails/${last._id}`)}
                    >
                      المزيد
                    </button>
                    <small className="datedSingle">{last?.createdAt && last?.createdAt.slice(0, 10)}</small>
                  </p>
                </SwiperSlide>
              ))}
          </Swiper>

                <div className="header position-relative py-5">
          <h6 className=" text-danger">المنشورات المحفوظة    </h6>
        </div>
          <Swiper spaceBetween={30} slidesPerView={4}>
            {data?.saveLists?.map((last, i) => (
              <SwiperSlide key={i}>
                <div>
                  {last.images.length > 0 && (
                    <img
                      src={`https://syrianrevolution1.com/postImages/${last.images[0]?.imgPath}`}
                      alt={last.images[0]?.description || 'image'}
                      className="w-100 rounded-3 fimg"
                    />
                  )}

                  {last.video && (
                    <video
                      width="320"
                      height="240px"
                      style={{ width: '100%', marginBottom: '30px', height: '200px' }}
                      className="w-100 rounded-3 fimg"
                      controls
                    >
                      <source src={`https://syrianrevolution1.com/postImages/${last?.video}`} type="video/mp4" />
                      المتصفح الخاص بك لا يدعم تشغيل الفيديو.
                    </video>
                  )}

                  <p>
                    {last.name}
                    <br />
                    <div>

                    <button
                      className="btu d-inline-block mx-1 px-3 rounded-3"
                      onClick={() => navigate(`/newsDetails/${last._id}`)}
                    >
                      المزيد
                    </button>
                    <button
                      className="btu d-inline-block mx-1 px-3 rounded-3"
                      onClick={() => publish(last._id)}
                    >
                      نشر
                      </button>
                    </div>
                      
                    <small className="datedSingle">{last?.createdAt && last?.createdAt.slice(0, 10)}</small>
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
