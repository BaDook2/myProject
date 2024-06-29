import { useForm } from "react-hook-form";
import Input from "./Components/Input";
import { useState } from "react";
import fetchFinancialData from "./fetchFinancialData";
// import fetchCorpFS from "./fetchSingleCompanyFinancialStatements";

export interface IData {
  corpName: string;
  targetYear: string;
  targetQurter: string;
  targetFS: string;
}

export interface IFSData {
  account_nm: string
  bsns_yearAndQuarter: string[]
  amount: number[]
}

function App() {
  const { register, handleSubmit } = useForm<IData>();
  const needsArr = ["corpName", "targetYear", "targetQurter", "targetFS"];
  const [fsData, setFsData] = useState<IFSData[]>();
  const [err, setErr] = useState('');
  const [unit, setUnit] = useState(1);
  const onSubmit = async (data: IData) => {
    const CorpFs = await fetchFinancialData({
      corpName: data.corpName,
      targetYear: data.targetYear,
      targetQurter: data.targetQurter,
      targetFS: data.targetFS
    });
    if (typeof (CorpFs) === "string") {
      setErr(CorpFs);
    } else {
      setFsData(CorpFs);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {needsArr.map((item, index) => (
          <Input
            key={index}
            type="text"
            placeholder={item}
            register={register(item as keyof IData)}
          />
        ))}
        <button type="submit">검색</button>
      </form>
      <div>1분기보고서 : 11013 반기보고서 : 11012</div>
      <div>3분기보고서 : 11014 사업보고서 : 11011</div>
      <div>OFS: 재무제표 CFS: 연결재무제표</div>
      <button className="border-2 border-black rounded-lg" onClick={() => setUnit(1)}>일 원</button>
      <button className="border-2 border-black rounded-lg" onClick={() => setUnit(1000)}>천 원</button>
      <button className="border-2 border-black rounded-lg" onClick={() => setUnit(1000000)}>백 만원</button>
      <button className="border-2 border-black rounded-lg" onClick={() => setUnit(1000000000)}>십 억 원</button>
      {fsData && (
        <table>
          <thead>
            <tr>
              {fsData?.map((data) => <th>{data.bsns_yearAndQuarter}</th>)}
            </tr>
          </thead>
          <tbody>
            {fsData?.map((data) => <><td>{data.account_nm}</td>{data.amount.map((num) => <td>{num}</td>)}</>)}
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;