import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv"; // dotenv 모듈 불러오기

dotenv.config(); // dotenv 초기화

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

app.post("/api/financial-data", async (req, res) => {
  const { corpCode, corpName, financialData }: FinancialDataRequest = req.body;

  try {
    const company = await prisma.company.upsert({
      where: { corpCode: corpCode },
      update: {},
      create: {
        corpCode,
        corpName,
      },
    });

    const financialEntries = financialData.map((data: FinancialDataEntry) => {
      return {
        companyId: company.id,
        year: data.year,
        quarter: data.quarter,
        data: data.data,
      };
    });

    await prisma.financialData.createMany({
      data: financialEntries,
      skipDuplicates: true,
    });

    res.status(200).json({ message: "Financial data saved successfully" });
  } catch (error) {
    console.error("Failed to save financial data", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
