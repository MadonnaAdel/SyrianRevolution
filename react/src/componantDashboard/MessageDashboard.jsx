import { useEffect, useState } from "react";
import styles from "../styleDashboard/AddSuperVisor.module.css";
import axios from "axios";
import Joi from "joi";
import { useUser } from "../context/Context";
export default function MessageDashboard() {
    const {messageAndPaypal} = useUser() 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ category: "message" ,content:""});
  const [success, setSuccess] = useState(false);
  const [ errorListUser, setErrorListUser ] = useState( [] );

   useEffect(() => {
     if (messageAndPaypal.length > 0) {
       const messageContent =
         messageAndPaypal.find((e) => e.category === "message")?.content || "";
       setMessage((prevState) => ({ ...prevState, content: messageContent }));
     }
   }, [messageAndPaypal]);

  function validationAddUser() {
    let schema = Joi.object({
      category: Joi.string().required(),
      content: Joi.string().required().messages({
        "string.empty": "  الرسالة مطلوبة",
        "any.required": "  الرسالة مطلوبة",
      }),
    });
    return schema.validate(message, { abortEarly: false });
  }
  async function handleSubmit(e) {
    setSuccess(false);
    e.preventDefault();
    let responseValidateUser = validationAddUser();
    if (responseValidateUser.error) {
      setErrorListUser([responseValidateUser.error.details]);
    } else {
      setErrorListUser("");
      setLoading(true);
      await axios
        .post(
          `https://syrianrevolution1.com/messagePaypal/add/${localStorage.getItem(
            "idUserLogin"
          )}`,
          message,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((result) => {
        
          if (result.data.success === "MessagePaypal added successfully") {
            setLoading(false);
            setSuccess(true);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  }

  const [desktop, setDesktop] = useState({ category: "desktop" ,content :""});
  const [loadingDesktop, setLoadingDasktop] = useState(false);
  const [successDektop, setSuccessDesktop] = useState(false);
  const [ errorListUserDesktop, setErrorListUserDsktop ] = useState( [] );

     useEffect(() => {
       if (messageAndPaypal.length > 0) {
         const messageContent =
           messageAndPaypal.find((e) => e.category === "desktop")?.content ||
           "";
         setDesktop((prevState) => ({ ...prevState, content: messageContent }));
       }
     }, [messageAndPaypal]);

  function validationAddUserDesktop() {
    let schema = Joi.object({
      category: Joi.string().required(),
      content: Joi.string().required().messages({
        "string.empty": "    الرابط مطلوب",
        "any.required": "   الرابط مطلوب",
      }),
    });
    return schema.validate(desktop, { abortEarly: false });
  }

    async function handleSubmitDesktop(e) {
      setSuccessDesktop(false);
      e.preventDefault();
      let responseValidateUserDesktop = validationAddUserDesktop();
      if (responseValidateUserDesktop.error) {
        setErrorListUserDsktop([responseValidateUserDesktop.error.details]);
      } else {
        setErrorListUserDsktop("");
        setLoadingDasktop(true);
        await axios
          .post(
            `https://syrianrevolution1.com/messagePaypal/add/${localStorage.getItem(
              "idUserLogin"
            )}`,
          desktop,
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          )
          .then((result) => {
          
            if (result.data.success === "MessagePaypal added successfully") {
              setLoadingDasktop(false);
              setSuccessDesktop(true);
            }
          })
          .catch((error) => {
            setLoadingDasktop(false);
            console.log(error);
          });
      }
  }

    const [android, setAndroid] = useState({ category: "android" ,content:''});
    const [loadingAndroid, setLoadingAndroid] = useState(false);
    const [successAndroid, setSuccessAndroid] = useState(false);
  const [ errorListUserAndroid, setErrorListUserAndroid ] = useState( [] );

       useEffect(() => {
         if (messageAndPaypal.length > 0) {
           const messageContent =
             messageAndPaypal.find((e) => e.category === "android")?.content ||
             "";
           setAndroid((prevState) => ({
             ...prevState,
             content: messageContent,
           }));
         }
       }, [messageAndPaypal]);

    function validationAddUserAndroid() {
      let schema = Joi.object({
        category: Joi.string().required(),
        content: Joi.string().required().messages({
          "string.empty": "    الرابط مطلوب",
          "any.required": "   الرابط مطلوب",
        }),
      });
      return schema.validate(android, { abortEarly: false });
    }

    async function handleSubmitAndroid(e) {
      setSuccessAndroid(false);
      e.preventDefault();
      let responseValidateUserAndroid = validationAddUserAndroid();
      if (responseValidateUserAndroid.error) {
        setErrorListUserAndroid([responseValidateUserAndroid.error.details]);
      } else {
        setErrorListUserAndroid("");
        setLoadingAndroid(true);
        await axios
          .post(
            `https://syrianrevolution1.com/messagePaypal/add/${localStorage.getItem(
              "idUserLogin"
            )}`,
            android,
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          )
          .then((result) => {
          
            if (result.data.success === "MessagePaypal added successfully") {
              setLoadingAndroid(false);
              setSuccessAndroid(true);
            }
          })
          .catch((error) => {
            setLoadingAndroid(false);
            console.log(error);
          });
      }
    }
  return (
    <div className={styles.AddSuperVisor}>
      <div className={styles.head}>
        <p>رسالة التوجية</p>
      </div>
  
      <form action="" className={styles.form}>
        {success && (
          <p className="alert alert-success alerthemself">
            تمت اضافة الرسالة بنجاح
          </p>
        )}
        {errorListUser &&
          errorListUser.map((error, index) => (
            <p key={index} className="alert alert-secondary alerthemself">
              {error[index].message}
            </p>
          ))}
        <div className={styles.headForm}>
          <div className={styles.input}>
            <div className={styles.inp1} style={{ width: "100%" }}>
              <label htmlFor=""> رسالة التوجية</label>
              <textarea
                onChange={(e) =>
                  setMessage((prevState) => ({
                    ...prevState,
                    content: e.target.value,
                  }))
                }
                placeholder="   رسالة التوجية"
                className="form-control"
                style={ { height: "30vh" } }
                value={message.content || ""}
                required
              ></textarea>
            </div>
          </div>
          <div className={styles.btnbottom} style={{ justifyContent: "start" }}>
            <button
              className={`add`}
              style={{ color: "white", backgroundColor: "green" }}
              onClick={handleSubmit}
            >
              {loading ? (
                <div className="spinner-border text-secondary" role="status">
                  <span className="sr-only"></span>
                </div>
              ) : (
                "ارسال"
              )}
            </button>
          </div>
        </div>
      </form>
 
      <form action="" className={styles.form}>
        <div className={styles.headForm}>
          <div className={styles.input}>
            <div className={styles.inp1}>
              {successDektop && (
                <p
                  className="alert alert-success alerthemself"
                  style={{ width: "100%", transform: "translatey(-1px)" }}
                >
                  تمت اضافة الرابط بنجاح
                </p>
              )}
              {errorListUserDesktop &&
                errorListUserDesktop.map((error, index) => (
                  <p
                    key={index}
                    className="alert alert-secondary alerthemself"
                    style={{ width: "100%", transform: "translatey(-1px)" }}
                  >
                    {error[index].message}
                  </p>
                ))}
              <label htmlFor=""> رابط تطبيق الايفون</label>
              <input
                onChange={(e) =>
                  setDesktop((prevState) => ({
                    ...prevState,
                    content: e.target.value,
                  }))
                }
                type="text"
                placeholder="   رابط التطبيق "
                className="form-control"
                value={desktop?.content|| ""}
                required
              />
            </div>
          </div>
          <div className={styles.btnbottom} style={{ justifyContent: "start" }}>
            <button
              className={`add`}
              style={{ color: "white", backgroundColor: "green" }}
              onClick={handleSubmitDesktop}
            >
              {loadingDesktop ? (
                <div className="spinner-border text-secondary" role="status">
                  <span className="sr-only"></span>
                </div>
              ) : (
                "ارسال"
              )}
            </button>
          </div>
        </div>
      </form>

      <form action="" className={styles.form}>
        <div className={styles.headForm}>
          <div className={styles.input}>
            <div className={styles.inp1}>
              {successAndroid && (
                <p
                  className="alert alert-success alerthemself"
                  style={{ width: "100%", transform: "translatey(-1px)" }}
                >
                  تمت اضافة الرابط للاندرويد بنجاح
                </p>
              )}
        
              {errorListUserAndroid &&
                errorListUserAndroid.map((error, index) => (
                  <p
                    key={index}
                    className="alert alert-secondary alerthemself"
                    style={{ width: "100%", transform: "translatey(-1px)" }}
                  >
                    {error[index].message}
                  </p>
                ))}
              <label htmlFor=""> رابط تطبيق الاندرويد</label>
              <input
                onChange={(e) =>
                  setAndroid((prevState) => ({
                    ...prevState,
                    content: e.target.value,
                  }))
                }
                type="text"
                placeholder="   رابط التطبيق "
                className="form-control"
                required
                value={android?.content || ""}
              />
            </div>
          </div>
          <div className={styles.btnbottom} style={{ justifyContent: "start" }}>
            <button
              className={`add`}
              style={{ color: "white", backgroundColor: "green" }}
              onClick={handleSubmitAndroid}
            >
              {loadingAndroid ? (
                <div className="spinner-border text-secondary" role="status">
                  <span className="sr-only"></span>
                </div>
              ) : (
                "ارسال"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
