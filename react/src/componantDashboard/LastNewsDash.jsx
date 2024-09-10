import React, { useEffect, useState } from "react";
import styles from "../styleDashboard/LastNew.module.css";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import axios from "axios";

export default function Black() {
  const navigate = useNavigate();
  const [addData, setAddData] = useState({
    category: "lastNews",
  });
  const [errorListUser, setErrorListUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [errorBackUser, setErrorBackUser] = useState(null);
  const [successAdd, setSuccessAdd] = useState(false);
 const [imageProfiles, setImageProfiles] = useState([]);
  const [video, setVideo] = useState(null);

  function handleChangeImageProfile(e) {
    const files = Array.from(e.target.files);
    console.log(files);
    
    files.forEach((file) => {
      const fileType = file.type;
      if (fileType.startsWith("image/")) {
        setImageProfiles((prevImages) => [
          ...prevImages,
          { file, caption: "" },
        ]);
        setVideo(null); 
      } else if (fileType.startsWith("video/")) {
        setVideo(file);
        setImageProfiles([]); 
      } else {
        console.log("Unsupported file type.");
      }
    });
  }

  useEffect(() => {
    console.log(video, "Video state updated");
  }, [video]);

  function handleCaptionChange(index, e) {
    const newCaption = e.target.value;
    setImageProfiles((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index].caption = newCaption;
      return updatedImages;
    });
  }

  function handleChange(e) {
    setAddData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  function validationAddUser() {
    const schema = Joi.object({
      name: Joi.string().required().messages({
        "string.empty": "عنوان الخبر مطلوب",
        "any.required": "عنوان الخبر مطلوب",
      }),
      category: Joi.string().required().messages({
        "string.empty": "الفئة مطلوبة",
        "any.required": "الفئة مطلوبة",
      }),
      content: Joi.string().allow("").messages({
        "string.base": "المحتوى يجب أن يكون نصًا",
      }),
      governorate: Joi.string().allow("").messages({
        "string.base": "المحافظة يجب أن تكون نصًا",
      }),
      externalLinks: Joi.string().allow("").messages({
        "string.base": "الروابط الخارجية يجب أن تكون نصًا",
      }),
      images: Joi.array().min(1).when('video', {
        is: Joi.exist(),
        then: Joi.array().min(0), // إذا كان هناك فيديو، الصور ليست مطلوبة
        otherwise: Joi.array().min(1).messages({
          "array.min": "يجب رفع صورة أو فيديو",
        })
      }),
      video: Joi.any().optional().messages({
        "any.base": "الفيديو غير صحيح",
      }),
    });

    const hasImagesOrVideo = imageProfiles.length > 0 || video !== null;

    if (!hasImagesOrVideo) {
      return {
        error: {
          details: [
            { message: "يجب رفع صورة أو فيديو", path: ["images"], type: "custom" },
          ],
        },
      };
    }

    return schema.validate(
      { ...addData, images: imageProfiles, video: video }, 
      { abortEarly: false }
    );
  }


  async function handleSubmit(e) {
    e.preventDefault();
    await submitNewsRequest("publish");
  }

  async function saveNews(e) {
    e.preventDefault();
    await submitNewsRequest("save");
  }

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
        setSaveLoading(true);

        const url =
       
          `https://syrianrevolution1.com/lists/${localStorage.getItem("idUserLogin")}`;

        const response = await fetch(url, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        const result = await response.json();
        
  type === "publish"?
        setLoading(false):
        setSaveLoading(false);

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
        setSaveLoading(false);      }
    }
  }


  return (
    <div className={styles.LastNewsDash}>
      <div className="headDashboard">
        <p>ادخال البيانات / اخر الاخبار</p>
      </div>
      <div className={styles.informLastNews}>
        {errorListUser &&
          errorListUser.map((error, index) => (
            <p
              key={index}
              className="alert alert-secondary alerthemself"
              style={{ transform: "translateY(0)", width: "100%" }}
            >
              {error.message}
            </p>
          ))}
        {successAdd && (
          <p
            className="alert alert-success alerthemself"
            style={{ transform: "translateY(0)", width: "100%" }}
          >
            تمت الاضافة بنجاح
          </p>
        )}
        {errorBackUser &&
          errorBackUser?.error === "Cannot read property '0' of undefined" && (
            <p
              className="alert alert-secondary alerthemself"
              style={{ transform: "translateY(0)", width: "100%" }}
            >
              يرجى رفع الصورة
            </p>
          )}

        <div className={styles.input}>
          <div className={styles.inp1}>
            <label htmlFor=""> عنوان الخبر </label>
            <input
              type="text"
              className="form-control"
              placeholder="عنوان الخبر"
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className={styles.inp1}>
            <p style={{ fontSize: "10px", marginBottom: "5px" }}>
              ارفع اكثر من صورة أو فيديو (إجباري)
            </p>
            <label htmlFor="f1" className="customfileupload">
              {" "}
              ارفع من هنا
            </label>
            <input
              id="f1"
              type="file"
              className="form-control"
              name="selfImg"
              onChange={handleChangeImageProfile}
              multiple
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

        <div className={styles.input}>
          <div className={styles.inp1}>
            <label htmlFor=""> مكان الخبر</label>
            <input
              type="text"
              className="form-control"
              placeholder="مكان الخبر"
              name="governorate"
              onChange={handleChange}
            />
          </div>
          <div className={styles.inp1}>
            <label htmlFor=""> روابط خارجية (يوتيوب) - اختياري</label>
            <input
              type="text"
              className="form-control"
              placeholder="رابط خارجي"
              name="externalLinks"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.inp2}>
          <label htmlFor=""> محتوى الخبر</label>
          <textarea
            name="content"
            placeholder="محتوى الخبر"
            className="form-control"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className={styles.btnbottom}>
          <button
            className="add btn btn-success rounded-pill"
            onClick={handleSubmit}
          >
            {loading ? (
              <div className="spinner-border text-secondary" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              "إضافة"
            )}
          </button>
          <button
            className=" btn btn-outline-success rounded-5"
            onClick={saveNews}
          >
            {saveLoading ? (
              <div className="spinner-border text-secondary" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              "حفظ"
            )}
          </button>
          
        </div>
      </div>
    </div>
  );
}
