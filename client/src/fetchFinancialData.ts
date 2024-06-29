import axios from "axios";
import { IData, IFSData } from "./App";

const fetchFinancialData = async ({
  corpName,
  targetYear,
  targetQurter,
  targetFS,
}: IData): Promise<IFSData[]|string> => {
  const dataToJSON = JSON.stringify({
    corpName,
    targetYear,
    targetQurter,
    targetFS,
  });
  const URL = "";
  try {
    const response = axios.post(URL, dataToJSON);
    return (await response).data as IFSData[];
  } catch (err) {
    return "fetchFinancialData Error";
  }
};
export default fetchFinancialData;
