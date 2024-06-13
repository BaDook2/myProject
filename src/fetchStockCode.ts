// 공공 데이터 포탈

const API_KEY =
  "Q%2FB%2BKq5auPwhsK%2Bp8R%2FQ553uH0UTzGrprf8YiJ4fGMO%2Be7cJVDmAgZmiEXuRR46UbVEGCXXIVnNrrFSNgwXauA%3D%3D";
const RESULT_TYPE = "json";

export default async function fetchStockCode(name: string) {
  const today = new Date();
  const basDt =
    today.getFullYear().toString() +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    (today.getDate() - 1).toString().padStart(2, "0");

  const URL = `https://apis.data.go.kr/1160100/service/GetKrxListedInfoService/getItemInfo?serviceKey=${API_KEY}&resultType=${RESULT_TYPE}&basDt=${basDt}&likeItmsNm=${name}`;

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Response is error");
    }
    const data = await response.json();
    // return data.response.body.items.item[0].itmsNm;
    const result = data.response.body.items.item[0];
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
