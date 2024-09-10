import React, { useContext, useEffect, useState } from 'react'
import styles from '../styleDashboard/DataDisplaySite.module.css'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ContextUser, useUser } from '../context/Context';
import one from '../image/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFileZipper } from '@fortawesome/free-solid-svg-icons';
export default function ResponseLastNews() {
  const [martyrDisplay, setMartyrDataDisplay] = useState([]);
  const [loading, setLoading] = useState(false);
 
  const { setOpenAlert, setOpenAlertStore,role } = useContext(ContextUser);
  const { getListUser } = useUser();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    async function getMartyr() {
      await axios
        .get(`https://syrianrevolution1.com/lists/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((result) => setMartyrDataDisplay(result.data))
        .catch((error) => {
          console.log(error);
        });
    }
    getMartyr();
  }, [id]);

  function openImage(src) {
    setOpenAlert(true);
    setOpenAlertStore(src);
  }

  async function handleDeletePost() {
    setLoading(true);
    await axios
      .delete(
        `https://syrianrevolution1.com/lists/${id}/${localStorage.getItem(
          "idUserLogin"
        )}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        if (response.data === "list Deleted Successfully") {
          setLoading(false);
          navigate("/dashboard/dataDisplaySite");
          getListUser();
        }
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className={styles.DisplayMartysDash}>
      {" "}
      <div className={`headDashboard`}>
        <p>البيانات المعروضة بالموقع </p>
      </div>
   
      <div
        style={{
          display: "flex",
          gap: "30px",
          marginTop: "30px",
          transform: "translatex(-5px)",
        }}
        className="aoomedia"
      >
        <div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "10px",
              alignItems: "center",
            }}
          >
            {martyrDisplay?.user?.selfImg !== undefined &&
            martyrDisplay?.user?.selfImg !== "undefined" &&
            martyrDisplay?.user?.selfImg !== "" ? (
              <img
                src={`https://syrianrevolution1.com/images/${martyrDisplay?.user?.selfImg}`}
                alt="profile"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <img
                src={one}
                alt="profile"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                }}
              />
            )}

            <p>{martyrDisplay?.user?.username}</p>
          </div>
        </div>
        {role === "admin" || role === "owner" ? (
          <div>
            <h6>الوثيقة الشخصية : </h6>
            <img
              src={`https://syrianrevolution1.com/images/${martyrDisplay?.user?.docImg}`}
              alt="profile"
              style={{ width: "70px", height: "70px", cursor: "pointer" }}
              onClick={() => {
                openImage(
                  `https://syrianrevolution1.com/images/${martyrDisplay?.user?.docImg}`
                );
              }}
            />
          </div>
        ) : (
          ""
        )}
      </div>
 
      <div className={styles.details}>
        <div className={styles.allDetailseRight}>
          <div className={styles.detailsright}>
            <h6> العنوان : </h6>
            <p>{martyrDisplay?.name}</p>
          </div>
          <div className={styles.detailsright}>
            <h6> الصورة : </h6>
            <br />
            <p>
              {" "}
              {martyrDisplay?.selfImg &&
              martyrDisplay?.selfImg === "undefined" ? (
                "لم تتم الاضافة"
              ) : martyrDisplay?.selfImg !== "undefined" ? (
                <img
                  src={`https://syrianrevolution1.com/postImages/${martyrDisplay?.selfImg}`}
                  alt="trails"
                  style={{ width: "100px", cursor: "pointer" }}
                  onClick={() => {
                    openImage(
                      `https://syrianrevolution1.com/postImages/${martyrDisplay.selfImg}`
                    );
                  }}
                />
              ) : (
                "لم تتم الاضافة"
              )}{" "}
            </p>
          </div>
          <div className={styles.detailsright}>
            <h6> روابط خارجية : </h6>{" "}
            {martyrDisplay?.externalLinks !== undefined &&
            martyrDisplay?.externalLinks !== "undefined" ? (
              <a href={martyrDisplay?.externalLinks} target="blank">
                {" "}
                {martyrDisplay?.externalLinks}
              </a>
            ) : (
              "لم تتم الاضافة"
            )}{" "}
          </div>
          <div className={styles.detailsright}>
            <h6> المحافظة : </h6>{" "}
            {martyrDisplay?.governorate !== undefined &&
            martyrDisplay?.governorate !== "undefined"
              ? martyrDisplay?.governorate
              : "لم تتم الاضافة"}{" "}
          </div>
          <div className={styles.detailsright}>
            <h6> الوثائق و الملفات : </h6>
            <br />
            <div>
              {" "}
              {martyrDisplay?.documents !== undefined &&
              martyrDisplay?.documents !== "undefined"
                ? martyrDisplay?.documents.map((doc, index) => (
                    <div key={index} style={{ display: "inline" }}>
                      {doc.slice(-4).toLowerCase() === ".jpg" ||
                      doc.slice(-4).toLowerCase() === ".png" ||
                      doc.slice(-5).toLowerCase() === ".jpeg" ? (
                        <img
                          src={`https://syrianrevolution1.com/postImages/${doc}`}
                          alt="documents"
                          style={{ width: "100px" }}
                          onClick={() => {
                            openImage(
                              `https://syrianrevolution1.com/postImages/${doc}`
                            );
                          }}
                        />
                      ) : (
                        ""
                      )}
                      {doc.slice(-4).toLowerCase() === ".pdf" ||
                      doc.slice(-4) === ".doc" ||
                      doc.slice(-5) === ".docx" ? (
                        <a
                          href={`https://syrianrevolution1.com/postImages/${doc}`}
                          style={{ margin: "0 15px" }}
                        >
                          <FontAwesomeIcon
                            icon={faFile}
                            style={{
                              fontSize: "50px",
                              transform: "translateY(15px)",
                            }}
                          />
                        </a>
                      ) : (
                        ""
                      )}
                      {doc.slice(-4).toLowerCase() === ".mp4" ? (
                        <video
                          controls
                          style={{ width: "150px", height: "150px" }}
                        >
                          <source
                            src={`https://syrianrevolution1.com/postImages/${doc}`}
                            type="video/mp4"
                          />
                        </video>
                      ) : (
                        ""
                      )}
                      {doc.slice(-4).toLowerCase() === ".zip" ? (
                        <a
                          href={`https://syrianrevolution1.com/postImages/${doc}`}
                        >
                          <FontAwesomeIcon icon={faFileZipper} />
                        </a>
                      ) : (
                        ""
                      )}
                    </div>
                  ))
                : "لم تتم الاضافة"}{" "}
            </div>
          </div>
        </div>

        <div className={styles.detailsLeft}>
          <div>
            <h6>شرح مفصل : </h6>{" "}
            {martyrDisplay?.content !== undefined &&
            martyrDisplay?.content !== "undefined"
              ? martyrDisplay?.content
              : "لم تتم الاضافة"}{" "}
          </div>
        </div>
      </div>
      <div className={styles.btnbottom}>
        <button
          className="btn btn-warning"
          onClick={() =>
            navigate(`/dashboard/dataDisplaySiteupdate/${martyrDisplay._id}`)
          }
        >
      
          تعديل
   
        </button>
        <button className="btn btn-danger" onClick={handleDeletePost}>
          {loading ? (
            <div className="spinner-border text-secondary" role="status">
              <span className="sr-only"></span>
            </div>
          ) : (
            "حذف"
          )}
        </button>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          رجوع
        </button>
      </div>
    </div>
  );
}









