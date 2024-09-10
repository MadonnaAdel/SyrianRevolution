import SearchExcel from "./SearchExcel";
export default function AllExcelDash() {
  
  return (
    <>
      <div className={`headDashboard`} style={{ display: "flex", gap: "10px" }}>
        <p>المطلوبين للنظام</p>
      </div>
      <SearchExcel />
    </>
  

  );
}
