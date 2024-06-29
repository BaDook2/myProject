import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv"; // dotenv 모듈 불러오기
import fetchCorpKeyFS from "./fetchCorpKeyFS";
import fetchCorpCode from "./fetchCorpCode";
import {REPORT_CODE} from "../client/src/Constants";
dotenv.config(); // dotenv 초기화

interface IData {
  corpName: string;
  targetYear: string;
  targetQuarter: REPORT_CODE;
  targetFS: string;
}

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

interface FinancialDataEntry {
  year: number;
  quarter: string;
  data: object; // JSON 데이터 타입, 구체적인 구조가 필요한 경우 더 상세하게 정의할 수 있습니다.
}

interface FinancialDataRequest {
  corpCode: string;
  corpName: string;
  financialData: FinancialDataEntry[];
}

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.get("/api/financial-data", async (req, res) => {
  const { corpName, targetYear, targetQuarter, targetFS }: IData = req.body;
  const corpCode = await fetchCorpCode(corpName);
  // const { corpCode, corpName, financialData }: FinancialDataRequest = req.body;
  
  try{
    
    if(corpCode){
    const financialData = await prisma.financialData.findFirst({
      where: {
        corpCode: corpCode,
        year: targetYear,
        quarter: targetQuarter,
        FS: targetFS  
      }
    })
    if(financialData) {
      res.json(financialData);
    } else {
      try{
      const res = fetchCorpKeyFS({ corpCode, targetYear, targetQuarter });
      const newFinancialData = await prisma.financialData.create({

      })
      }
    }
  } else {
    return "no Data exists"
  }}catch(){

  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
