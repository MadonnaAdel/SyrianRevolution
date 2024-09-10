import React, { useContext } from "react";
import styles from "./History.module.css";
import { useNavigate } from "react-router-dom";
import { ContextUser} from "../../context/Context";
import axios from "axios";
import { useQuery } from "react-query";
import { getAllHistory } from "./MainHistory";
export default function AdminHistory() {

  ///////////////////////////////////
  const { page } = useContext(ContextUser);
  ////////////////////////////
  const { data, isLoading, refetch } = useQuery(
    ["historyData", page],
    () => getAllHistory(page),
    {
      keepPreviousData: true,
    }
  );
  const navigate = useNavigate();
  async function handleDelete(id) {
    await axios
      .delete(`https://syrianrevolution1.com/sgel/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((result) => {
        if (result?.data === "History Item Deleted Successfully") {
         refetch()
        }
      })
      .catch((error) => console.log(error));
  }
    if (isLoading)
      return (
        <div
          className="spinner-border"
          role="status"
          style={{ position: "absolute", left: "50%", top: "50%" }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      );
  return (
    <div className={styles.AllHistory}>
      {data?.data?.data.length > 0 &&
        data?.data?.data
        
          .filter((e) =>
            e?.upUser
              ? e.upUser?.role === "admin"
              : e?.user
              ? e?.user?.role === "admin"
              : e?.data?.role === "admin"
          )
          .map((e, i) => (
            <div className={styles.oneNotific} key={i}>
              <p>
                قام{" "}
                {e?.upUser
                  ? e?.upUser?.role === "user"
                    ? "المستخدم"
                    : e?.upUser?.role === "admin"
                    ? "الادمن"
                    : e?.upUser?.role === "supervisor"
                    ? "المشرف"
                    : e?.upUser?.role === "owner"
                    ? "المالك"
                    : ""
                  : e?.user
                  ? e?.user?.role === "user"
                    ? "المستخدم"
                    : e?.user?.role === "admin"
                    ? "الادمن"
                    : e?.user?.role === "supervisor"
                    ? "المشرف"
                    : e?.user?.role === "owner"
                    ? "المالك"
                    : ""
                  : e?.data?.role === "user"
                  ? "المستخدم"
                  : e?.data?.role === "admin"
                  ? "الادمن"
                  : e?.data?.role === "supervisor"
                  ? "المشرف"
                  : e?.data?.role === "owner"
                  ? "المالك"
                  : ""}{" "}
                <span style={{ color: "#2d2dc3", margin: "0 2px" }}>
                  {e?.upUser
                    ? e?.upUser?.username
                    : e?.user
                    ? e?.user.username
                    : e?.data?.name}
                </span>
                <span>
                  {e?.type === "register user success" ? (
                    "بانشاء حساب جديد"
                  ) : e?.type === "user login" ? (
                    "بستجيل دخول"
                  ) : e?.type === "delete user" ? (
                    <>
                      بحذف
                      {e?.data?.role === "user"
                        ? " المستخدم "
                        : e?.data?.role === "supervisor"
                        ? " المشرف "
                        : e?.data?.role === "admin"
                        ? " الادمن "
                        : ""}{" "}
                      <small style={{ color: "#2d2dc3" }}>
                        {e?.data?.username}
                      </small>
                    </>
                  ) : //////////////come back/////////////////
                  e?.type === "update user" ? (
                    "بتحديث بياناتة "
                  ) : ////////////come back/////////////
                  e?.type === "update user docImg" ? (
                    <>
                      برفع صورة وثيقة ل{" "}
                      <small style={{ color: "#2d2dc3" }}>
                        {e?.data?.username}
                      </small>
                    </>
                  ) : e?.type === "user update password" ? (
                    "بتغييؤ كلمة المرور الخاصة بة"
                  ) : e?.type === "accept user doc" ? (
                    <>
                      بقبول وثيقة{" "}
                      <small>
                        {e?.data?.role === "admin"
                          ? "الادمن"
                          : e?.data?.role === "supervisor"
                          ? "المشرف"
                          : e?.data?.role === "user"
                          ? " المستخدم "
                          : e?.data?.role === "owner"
                          ? " المالك "
                          : ""}
                      </small>
                      <small>{e?.data?.username}</small>
                    </>
                  ) : ////////////////////background/////////////////////////
                  e?.type === "add background image" ? (
                    "بتغيير صورة الغلاف"
                  ) : //////////////////paypal and message//////////////////

                  e?.type === "add message" ? (
                    " باضافة رسالة توجية "
                  ) : e?.type === "update message" ? (
                    "بتحديث رسالة التوجية"
                  ) : e?.type === "add paypal" ? (
                    " باضافة حساب بيبال "
                  ) : e?.type === "update paypal" ? (
                    " بتحديث حساب بيبال "
                  ) : e?.type === "delete" ? (
                    " بحذف حساب بيبال "
                  ) : e?.type === "add desktop" ? (
                    " باضافة رابط تحميل التطبيق للايفون "
                  ) : e?.type === "add android" ? (
                    " بأضافة رابط تحميل التطبيق للاندرويد "
                  ) : ////////////////masscers /////////////////////

                  e?.type === "add massacres data post" ? (
                    "برفع منشور"
                  ) : e.type === "update massacres data post" ? (
                    " بتعديل منشور "
                  ) : e?.type === "delete massacres data post" ? (
                    <>
                      {" "}
                      بحذف منشور{" "}
                      <small style={{ color: "#2d2dc3", fontSize: "14px" }}>
                        {e?.data?.title.slice(0, 40)}
                      </small>
                    </>
                  ) : /////////////////////////child////////////////////
                  e?.type === "add child data post" ? (
                    "برفع منشور"
                  ) : e.type === "update child data post" ? (
                    " بتعديل منشور "
                  ) : e?.type === "delete child data post" ? (
                    <>
                      {" "}
                      بحذف منشور{" "}
                      <small style={{ color: "#2d2dc3", fontSize: "14px" }}>
                        {e?.data?.name.slice(0, 40)}
                      </small>
                    </>
                  ) : e?.type === "accept child data post" ? (
                    <>
                      {" "}
                      بقبول منشور{" "}
                      <small style={{ color: "#2d2dc3", fontSize: "14px" }}>
                        {e?.data?.name.slice(0, 40)}
                      </small>
                    </>
                  ) : ////////////////list///////////////////////////////
                  e?.type === "add list data post" ? (
                    "برفع منشور"
                  ) : e.type === "updata list data post" ? (
                    " بتعديل منشور "
                  ) : e?.type === "delete list data post" ? (
                    <>
                      {" "}
                      بحذف منشور{" "}
                      <small style={{ color: "#2d2dc3", fontSize: "14px" }}>
                        {e?.data?.name.slice(0, 40)}
                      </small>
                    </>
                  ) : e?.type === "accept list data post" ? (
                    <>
                      {" "}
                      بقبول منشور{" "}
                      <small style={{ color: "#2d2dc3", fontSize: "14px" }}>
                        {e?.data?.name.slice(0, 40)}
                      </small>
                    </>
                  ) : ////////////////////////////
                  e?.type === "update user from dashboard" ? (
                    <>
                      بتحديث بيانات
                      <small style={{ color: "#2d2dc3", fontSize: "14px" }}>
                        {e?.data?.username}
                      </small>
                    </>
                  ) : (
                    ""
                  )}
                </span>
              </p>
              {/* /////////////////////user///////////////// */}
              {e?.type === "register user success" ||
              e?.type === "user login" ||
              e?.type === "update user" ||
              e?.type === "delete user" ||
              e?.type === "update user docImg" ||
              e?.type === "user update password" ||
              e?.type === "accept user doc" ||
              e?.type === "update user from dashboard" ? (
                <div>
                  <button
                    className={styles.display}
                    onClick={() =>
                      navigate(`/dashboard/singleUser/${e?.data?._id}`)
                    }
                  >
                    عرض المستخدم
                  </button>
                  <button
                    className={styles.display1}
                    onClick={() => handleDelete(e?._id)}
                  >
                    حذف
                  </button>
                </div>
              ) : (
                ""
              )}
              {/* //////////////message and paypal/////////////// */}
              {e?.type === "add message" ||
              e?.type === "update message" ||
              e?.type === "add paypal" ||
              e?.type === "update paypal" ||
              e?.type === "delete" ||
              e?.type === "add desktop" ||
              e?.type === "add android" ? (
                <div>
                  <button
                    className={styles.display}
                    onClick={() =>
                      navigate(
                        `/dashboard/singlemessageandpaypal/${e?.data?._id}`
                      )
                    }
                  >
                    عرض المنشور
                  </button>
                  <button
                    className={styles.display1}
                    onClick={() => handleDelete(e?._id)}
                  >
                    حذف
                  </button>
                </div>
              ) : (
                ""
              )}
              {/* //////////////////////masscers///////////////// */}
              {e?.type === "add massacres data post" ||
              e?.type === "update massacres data post" ||
              e?.type === "delete massacres data post" ? (
                <div>
                  <button
                    className={styles.display}
                    onClick={() =>
                      navigate(
                        `/dashboard/dataChildDisplaySitemascr/${e?.data?._id}`
                      )
                    }
                  >
                    عرض المنشور
                  </button>
                  <button
                    className={styles.display1}
                    onClick={() => handleDelete(e?._id)}
                  >
                    حذف
                  </button>
                </div>
              ) : (
                ""
              )}
              {/* /////////////////child//////////////////////// */}

              {e?.type === "add child data post" ||
              e?.type === "delete child data post" ||
              e?.type === "accept child data post" ||
              e?.type === "update child data post" ? (
                <div>
                  <button
                    className={styles.display}
                    onClick={() =>
                      navigate(
                        `/dashboard/dataChildDisplaySite/${e?.data?._id}`
                      )
                    }
                  >
                    عرض المنشور
                  </button>
                  <button
                    className={styles.display1}
                    onClick={() => handleDelete(e?._id)}
                  >
                    حذف
                  </button>
                </div>
              ) : (
                ""
              )}
              {/* /////////////////list////////////////// */}
              {e?.type === "add list data post" ||
              e?.type === "delete list data post" ||
              e?.type === "accept list data post" ||
              e?.type === "updata list data post" ? (
                <div>
                  <button
                    className={styles.display}
                    onClick={() =>
                      navigate(`/dashboard/dataDisplaySite/${e?.data?._id}`)
                    }
                  >
                    عرض المنشور
                  </button>
                  <button
                    className={styles.display1}
                    onClick={() => handleDelete(e?._id)}
                  >
                    حذف
                  </button>
                </div>
              ) : (
                ""
              )}

              {e?.type === "add background image" ? (
                <div>
                  <button
                    className={styles.display1}
                    onClick={() => handleDelete(e?._id)}
                  >
                    حذف
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
    </div>
  );
}
