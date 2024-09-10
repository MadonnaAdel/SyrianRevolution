import React, { useContext, useState } from 'react';
import style from './RegisterUser/RegisterUser.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContextUser } from "../context/Context";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function TawsikEmail() {
    const { setOpenAuth } = useContext( ContextUser );
    const [ imageProfile, setImageProfile ] = useState( "" );
    const [ loading, setLoading ] = useState( false );
    const [ nofile, setFile ] = useState(false );

     function handleChangeImageProfile(e) {
       setImageProfile(e.target.files[0]);
     }
  
    async function handleTawsek( e ) {
        e.preventDefault()
        if ( !imageProfile ) {
           setFile(true)
            return;
        }
        setFile( false );
         const formData = new FormData();
        formData.append( "image", imageProfile );
        setLoading( true );
    await axios
      .patch(
        `https://syrianrevolution1.com/users/doc/${localStorage.getItem(
          "idUserLogin"
        )}`,formData,
          {
            headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
        .then( ( result ) => {
            setLoading( false )
          if ( result.data.user.createdAt ) {
            alert( 'تم رفع الوثيقة وسيتم مراجعتها' )
            setOpenAuth('')
           }
        } )
        .catch( ( error ) => {
            setLoading( false );
            console.log( error );
      });
}

  return (
    <div className={style.RegisterUser}>
      <form className={style.formsSuccessRegister}>
        <FontAwesomeIcon
          icon={faXmark}
          style={{ margin: "20px 20px 0 0", color: "red", fontSize: "20px" }}
          onClick={() => setOpenAuth("")}
        />
        <div className={style.informSuccess}>
          {nofile && (
            <p className="alert alert-secondary alerthemself" style={{transform:'translateY(-10px)',width:'100%'}}>
              يرجي رفع الوثيقة
            </p>
          )}
          <p style={{ fontSize: "12px", marginBottom: "25px" }}>صورة الوثيقة</p>
          <label htmlFor="tu" className="customfileupload">
            ارفع الصورة
          </label>
          <input
            name="image"
            type="file"
            id="tu"
            onChange={handleChangeImageProfile}
          />

          <div className={style.btnInpu}>
            <button onClick={handleTawsek}>
              {" "}
              {loading ? (
                <div className="spinner-border text-secondary" role="status">
                  <span className="sr-only"></span>
                </div>
              ) : (
                " توثيق الحساب"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

