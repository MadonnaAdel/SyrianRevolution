import { React, useContext, useEffect, useState } from "react";
import styles from "./AddSahedUser/AddShahed.module.css";
import { ContextUser } from "./../context/Context";
import Joi from "joi";

export default function AddLastNeswUser() {
  const { setOpenAuth, getSingleUser, checkConfition } =
    useContext(ContextUser);

  const [addData, setAddData] = useState({
    category: "lastNews",
  });
  const [errorListUser, setErrorListUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setsaveLoading] = useState(false);
  const [errorBackUser, setErrorBackUser] = useState(null);
  const [successAdd, setSuccessAdd] = useState(false);
  const [video, setVideo] = useState("");
  const [imageProfiles, setImageProfiles] = useState([]);
  const [document, setDocument] = useState("");

  function handleChangeImageProfile(e) {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const fileType = file.type;
      if (fileType.startsWith("image/")) {
        setImageProfiles((prevImages) => [...prevImages, { file, caption: "" }]);
        setVideo(null); 
      } else if (fileType.startsWith("video/")) {
        setVideo(file);
        setImageProfiles([]);
      } else {
        console.log("Unsupported file type.");
      }
    });
  }

  function handleCaptionChange(index, e) {
    const newCaption = e.target.value;
    setImageProfiles((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index].caption = newCaption;
      return updatedImages;
    });
  }

  function handlechange(e) {
    setAddData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  useEffect(() => {
    getSingleUser();
  }, [getSingleUser]);

  function handleChangeDocuments(e) {
    setDocument(e.target.files);
  }

  function validationAddUser() {
    let schema = Joi.object({
      name: Joi.string().required().messages({
        "string.empty": "عنوان الخبر مطلوب",
        "any.required": "عنوان الخبر مطلوب",
      }),
      category: Joi.string().required(),
      content: Joi.string().allow(""),
      governorate: Joi.string().allow(""),
      externalLinks: Joi.string().allow(""),
      images: Joi.allow(""),
    });

    return schema.validate({ ...addData, images: imageProfiles }, { abortEarly: false });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await submitNewsRequest('publish');
  }

  async function saveNews(e) {
     e.preventDefault();
    await submitNewsRequest('save');
  }

  // async function submitNewsRequest(type) {
  //   setSuccessAdd(false);
  //   let responseValidateUser = validationAddUser();
  //   if (responseValidateUser.error) {
  //     setErrorListUser([responseValidateUser.error.details]);
  //   } else if (!localStorage.getItem("token")) {
  //     setOpenAuth("login");
  //   } else {
  //     if (checkConfition === true) {
  //       setErrorListUser("");
  //       setSuccessAdd(false);
  //       const formData = new FormData();
  //       formData.append("name", addData.name);
  //       formData.append("category", addData.category);
  //       formData.append("content", addData.content);
  //       formData.append("externalLinks", addData.externalLinks);
  //       formData.append("governorate", addData.governorate);

  //       imageProfiles.forEach((image, index) => {
  //         formData.append(`images`, image.file);
  //         formData.append(`imageDescriptions`, image.caption);
  //       });

  //       if (video) formData.append("video", video);

  //       if (Array.isArray(document)) {
  //         document.forEach((file) => {
  //           formData.append("documents", file);
  //         });
  //       } else if (document instanceof FileList) {
  //         for (let i = 0; i < document.length; i++) {
  //           formData.append("documents", document[i]);
  //         }
  //       }

  //       try {
  //         type == 'publish' ?setLoading(true) : setsaveLoading(true);
  //         const url =
  //           type === 'publish'
  //             ? `https://syrianrevolution1.com/lists/${localStorage.getItem("idUserLogin")}`
  //             : `https://syrianrevolution1.com/lists/posts/${localStorage.getItem("idUserLogin")}`;

  //           const response = await fetch(url, {
  //         method: "POST",
  //         body: formData,
  //         headers: {
  //           Authorization: localStorage.getItem("token"),
  //         },
  //       });

  //       const result = await response.json();
  //       console.log(result);
  //         type == 'publish' ?setLoading(false) : setsaveLoading(false);

  //         if (result._id) {
  //           setSuccessAdd(true);
  //           setErrorBackUser(null);
  //           setErrorListUser(null);
  //         } else {
  //           setErrorBackUser(result);
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     } else {
  //       setOpenAuth("faild");
  //     }
  //   }
  // }





  

  async function submitNewsRequest(type) {
    setSuccessAdd(false);
    setErrorBackUser(null);

    const { error } = validationAddUser();
    if (error) {
      setErrorListUser(error.details);
    } else {
      setErrorListUser(null);

      const formData = new FormData();
      formData.append("name", addData.name);
      formData.append("category", addData.category);
      formData.append("content", addData.content);
      formData.append("externalLinks", addData.externalLinks);
      formData.append("governorate", addData.governorate);

      imageProfiles.forEach((image, index) => {
        formData.append(`images`, image.file);
        formData.append(`imageDescriptions`, image.caption);
      });
           const visibility = type === "save" ? "خاص بي" : "العامة";
      formData.append("visibility", visibility);
      if (video) formData.append("video", video);

      try {
         type === "publish"?
        setLoading(true):
        setsaveLoading(true);

        const url =
          // type === "publish"
          //   ? 
          `https://syrianrevolution1.com/lists/${localStorage.getItem("idUserLogin")}`;
            // : `https://syrianrevolution1.com/lists/posts/${localStorage.getItem("idUserLogin")}`;

        const response = await fetch(url, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        const result = await response.json();
        console.log(result);
        
  type === "publish"?
        setLoading(false):
        setsaveLoading(false);

        if (result._id) {
          setSuccessAdd(true);
          setErrorBackUser(null);
        } else {
          setErrorBackUser(result);
        }
      } catch (error) {
        console.error("Error submitting data:", error);
  type === "publish"?
        setLoading(false):
        setsaveLoading(false);      }
    }
  }

  return (
    <div>
      <form action="" className={styles.form}>
        {errorListUser &&
          errorListUser.map((error, index) => (
            <p
              key={index}
              className="alert alert-secondary alerthemself"
              style={{ transform: "translateY(20px)", width: "90%" }}
            >
              {error[index].message}
            </p>
          ))}
        {errorBackUser &&
          errorBackUser?.error === "Cannot read property '0' of undefined" && (
            <p
              className="alert alert-secondary alerthemself"
              style={{ transform: "translateY(15px)", width: "90%" }}
            >
              يرجي رفع الصورة او الفيديو
            </p>
          )}
        {successAdd && setOpenAuth("successaddinform")}
       <div className={styles.headForm}>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> عنوان الخبر</label>
              <input
                type="text"
                placeholder="عنوان الخبر "
                className="form-control"
                name="name"
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <label htmlFor=""> مكان الخبر</label>
              <input
                type="text"
                placeholder="   مكان الخبر"
                className="form-control"
                name="governorate"
                onChange={handlechange}
              />
            </div>
          </div>

          <div className={styles.input}>
            <div className={styles.inp1}>
              <label htmlFor=""> رابط خارجي</label>
              <input
                type="text"
                name="externalLinks"
                placeholder="رابط خارجي"
                className="form-control"
                onChange={handlechange}
              />
            </div>
            <div className={styles.inp1}>
              <p style={{ marginBottom: "5px", fontSize: "12px" }}>
                ارفع اكثر من صورة او فيديو (اجباري)
              </p>
              <label htmlFor="file-upload" className={styles.customfileupload}>
                ارفع الصورة
              </label>
              <input
                type="file"
                name="selfImg"
                id="file-upload"
                onChange={ handleChangeImageProfile }
                multiple
              />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.inp1}>
              <p style={{ marginBottom: "5px", fontSize: "12px" }}>
                وثيقة او ملف (ملف pdf او word او فيديو mp4 او ملف zip)
              </p>
              <label htmlFor="file-upload1" className={styles.customfileupload}>
                أرفع الملفات
              </label>
              <input
                type="file"
                name="selfImg"
                id="file-upload1"
                onChange={handleChangeDocuments}
              />
            </div>

          </div>
{imageProfiles.length > 0 && (
  <div className={`d-flex flex-wrap justify-content-center`}>
    {imageProfiles.map((image, index) => (
      <div key={index}>
        {image.file instanceof File && (
          <div className="m-2">
            <img
              src={URL.createObjectURL(image.file)}
              alt={`Image ${index}`}
              className="w-100 rounded-3 fimg"
            />
            <input
              type="text"
              className="form-control mt-2"
              placeholder="نص الصورة"
              value={image.caption}
              onChange={(e) => handleCaptionChange(index, e)}
            />
          </div>
        )}
      </div>
    ))}
  </div>
)}

          <div className={styles.input1}>
            <label htmlFor="">شرح مفصل</label>
            <textarea
              name="content"
              id=""
              className="form-control"
              onChange={handlechange}
            ></textarea>
          </div>
        </div>
      </form>
      <div className={styles.btnbottom}>
        <button className="btn btn-success rounded-5" onClick={handleSubmit}>
          {loading ? (
            <div className="spinner-border text-secondary" role="status">
              <span className="sr-only"></span>
            </div>
          ) : (
            "نشر الخبر"
          )}
        </button>
        <button className="btn btn-outline-success rounded-5" onClick={saveNews}>
          {saveLoading ? (
            <div className="spinner-border text-secondary" role="status">
              <span className="sr-only"></span>
            </div>
          ) : (
            "حفظ الخبر"
          )}
        </button>
      </div>
    </div>
  );
}
