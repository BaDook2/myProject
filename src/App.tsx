import fetchCorpCode from "./fetchCorpCode";
import { useForm } from "react-hook-form";
import Input from "./Components/Input";
import { REPORT_CODE } from "./Constants";
import fetchCorpKeyFS from "./fetchSingleCompanyKeyAccounts";
import { useState } from "react";

interface IData {
  corpName: string;
  targetYear: string;
  targetReport: string;
  targetFS: string;
}

interface IFSData {
  account_nm: string;
  bfefrmtrm_amount: string;
  bfefrmtrm_dt: string;
  bfefrmtrm_nm: string;
  bsns_year: string;
  corp_code: string;
  currency: string;
  frmtrm_amount: string;
  frmtrm_dt: string;
  frmtrm_nm: string;
  fs_div: string;
  fs_nm: string;
  ord: string;
  rcept_no: string;
  reprt_code: string;
  sj_div: string;
  sj_nm: string;
  stock_code: string;
  thstrm_amount: string;
  thstrm_dt: string;
  thstrm_nm: string;
}

function App() {
  const { register, handleSubmit } = useForm<IData>();
  const needsArr = ["corpName", "targetYear", "targetReport", "targetFS"];
  const [fsData, setFsData] = useState<IFSData[]>();
  const [unit, setUnit] = useState(1);
  const onSubmit = async (data: IData) => {
    const corpCode = await fetchCorpCode(data.corpName);
    if (corpCode) {
      const CorpFs = await fetchCorpKeyFS({
        corpCode,
        targetYear: data.targetYear,
        targetReport: data.targetReport as REPORT_CODE,
        // targetFS: data.targetFS as FS_KIND,
      });
      console.log(CorpFs);
      setFsData(CorpFs.list);
      return corpCode;
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
      <button onClick={() => setUnit(1)}>일 원</button>
      <button onClick={() => setUnit(1000)}>천 원</button>
      <button onClick={() => setUnit(1000000)}>백 만원</button>
      <button onClick={() => setUnit(1000000000)}>십 억 원</button>
      {fsData && (
        <table>
          <thead>
            <tr>
              <th>항목</th>
              <th>{fsData[0].bfefrmtrm_dt}</th>
              <th>{fsData[0].frmtrm_dt}</th>
              <th>{fsData[0].thstrm_dt}</th>
            </tr>
          </thead>
          <tbody>
            {fsData?.map((item, index) => {
              const bfefrmtrm_amount = Number(
                item.bfefrmtrm_amount.replace(/,/g, "")
              );
              const frmtrm_amount = Number(
                item.frmtrm_amount.replace(/,/g, "")
              );
              const thstrm_amount = Number(
                item.thstrm_amount.replace(/,/g, "")
              );
              return (
                <tr key={index}>
                  <td>{item.account_nm}</td>
                  <td>{Math.floor(bfefrmtrm_amount / unit).toLocaleString()}</td>
                  <td>{Math.floor(frmtrm_amount / unit).toLocaleString()}</td>
                  <td>{Math.floor(thstrm_amount / unit).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;
