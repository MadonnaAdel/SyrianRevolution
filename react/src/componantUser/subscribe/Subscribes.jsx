import React, { useContext, useState} from "react";
import { ContextUser } from "../../context/Context";
import CopyToClipboard from "react-copy-to-clipboard";
export default function Subscribes() {
  const { setOpenSubscrips } = useContext( ContextUser );

  const [copied,setCopied] = useState(false)
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        backgroundColor: "#00011C80",
        top: 0,
        left: 0,
      }}
    >
      <div
        className="gh"
        style={{
          padding: "30px 10px",
          width: "40%",
          height: "38%",
          transform: "translateY(150px)",
          backgroundColor: "#F7F7F7",
          borderRadius: "5px",
          margin: "auto",
        }}
      >
        <p
          style={{
            textAlign: "center",
            fontSize: "15px",
          }}
        >
          شارك المحتوي الان
        </p>

        <input
          type="text"
          className="form-control"
          value={window.location.href}
        />
        { copied &&
          <p className="alert alert-success alerthemself" style={ { width: '100%', transform: 'translatey(2px)' ,fontSize:'12px'} }>تم نسخ الرابط بنجاح</p> }
        <div
          style={{
            position: "absolute",
            bottom: "4%",
            left: "50%",
            transform: "translatex(-50%)",
            display: "flex",
            gap: "5px",
          }}
        >
          <button
            className="btn btn-danger"
            onClick={() => setOpenSubscrips(false)}
          >
            رجوع
          </button>
          <CopyToClipboard
            text={window.location.href}
            onCopy={() => setCopied(true)}
          >
            <button className="btn btn-primary">
              نسخ رابط المنشور
            </button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}