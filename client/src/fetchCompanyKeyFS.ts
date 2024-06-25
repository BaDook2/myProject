// FSM = Financial Statements
// dart

import { API_KEY, REPORT_CODE } from "./Constants";

interface ICorpFs {
  corpCode: string;
  targetYear: string;
  targetReport: REPORT_CODE;
}

const fetchCorpKeyFS = async ({
  corpCode,
  targetYear,
  targetReport,
}: ICorpFs) => {
  const URL = `api/fnlttSinglAcnt.json?crtfc_key=${API_KEY}&corp_code=${corpCode}&bsns_year=${targetYear}&reprt_code=${targetReport}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export default fetchCorpKeyFS;
