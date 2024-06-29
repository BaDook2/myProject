// FSM = Financial Statements
// dart

import { API_KEY, FS_KIND, REPORT_CODE, dartURL } from "../client/src/Constants";

interface ICorpFs {
  corpCode: string;
  targetYear: string;
  targetReport: REPORT_CODE;
  targetFS: FS_KIND;
}

const fetchCorpAllFS = async ({
  corpCode,
  targetYear,
  targetReport,
  targetFS,
}: ICorpFs) => {
  const URL = `${dartURL}/api/fnlttSinglAcntAll.json?crtfc_key=${API_KEY}&corp_code=${corpCode}&bsns_year=${targetYear}&reprt_code=${targetReport}&fs_div=${targetFS}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export default fetchCorpAllFS;
