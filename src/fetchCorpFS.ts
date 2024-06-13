// FSM = Financial Statements
// dart

import { API_KEY, FS_KIND, REPORT_CODE } from "./Constants";

interface ICorpFs {
  CORP_CODE: string;
  targetYear: number;
  targetReport: REPORT_CODE;
  targetFS: FS_KIND;
}

const fetchCorpFS = async ({
  CORP_CODE,
  targetYear,
  targetReport,
  targetFS,
}: ICorpFs) => {
  const URL = `api/fnlttSinglAcntAll.json?crtfc_key=${API_KEY}&corp_code=${CORP_CODE}&bsns_year${targetYear}&reprt_code=${targetReport}&fs_div=${targetFS}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export default fetchCorpFS;
