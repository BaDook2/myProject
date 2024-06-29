// FSM = Financial Statements
// dart

import { API_KEY, REPORT_CODE, dartURL } from "../client/src/Constants";

interface ICorpFs {
  corpCode: string;
  targetYear: string;
  targetQuarter: REPORT_CODE;
}

const fetchCorpKeyFS = async ({
  corpCode,
  targetYear,
  targetQuarter,
}: ICorpFs) => {
  const URL = `${dartURL}/api/fnlttSinglAcnt.json?crtfc_key=${API_KEY}&corp_code=${corpCode}&bsns_year=${targetYear}&reprt_code=${targetQuarter}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export default fetchCorpKeyFS;
