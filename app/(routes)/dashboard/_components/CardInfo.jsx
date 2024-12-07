import formatNumber from "@/utils";
import getFinancialAdvice from "@/utils/getFinancialAdvice";
import {
  PiggyBank,
  ReceiptText,
  Wallet,
  Sparkles,
  CircleDollarSign,
} from "lucide-react";
import React, { useEffect, useState } from "react";

function CardInfo({ budgetList, incomeList }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [financialAdvice, setFinancialAdvice] = useState("");

  useEffect(() => {
    if (budgetList.length > 0 || incomeList.length > 0) {
      CalculateCardInfo();
    }
  }, [budgetList, incomeList]);

  useEffect(() => {
    if (totalBudget > 0 || totalIncome > 0 || totalSpend > 0) {
      const fetchFinancialAdvice = async () => {
        const advice = await getFinancialAdvice(
          totalBudget,
          totalIncome,
          totalSpend
        );
        setFinancialAdvice(advice);
      };

      fetchFinancialAdvice();
    }
  }, [totalBudget, totalIncome, totalSpend]);

  const CalculateCardInfo = () => {
    console.log(budgetList);
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    let totalIncome_ = 0;

    budgetList.forEach((element) => {
      totalBudget_ = totalBudget_ + Number(element.amount);
      totalSpend_ = totalSpend_ + element.totalSpend;
    });

    incomeList.forEach((element) => {
      totalIncome_ = totalIncome_ + element.totalAmount;
    });

    setTotalIncome(totalIncome_);
    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  };

  return (
    <div>
     {budgetList?.length > 0 ? (
        <div className="bg-[#222224]">
          <div className="p-7 border mt-4 -mb-1 rounded-2xl flex items-center justify-between">
            <div className="">
              <div className="flex mb-2 flex-row space-x-1 items-center ">
                <h2 className="text-md text-white ">FinEasy Smart AI</h2>
                <Sparkles
                  className="rounded-full text-white w-10 h-10 p-2
    bg-gradient-to-r
    from-pink-500
    via-red-500
    to-yellow-500
    background-animate"
                />
              </div>
              <h2 className="font-light text-white text-md">
                {financialAdvice || "Loading financial advice..."}
              </h2>
            </div>
          </div>

          <div className="mt-7 bg-[#222224] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-7 bg-[#222224] border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm text-white ">Total Budget</h2>
                <h2 className="font-bold text-2xl text-white ">
                  {formatNumber(totalBudget)}
                </h2>
              </div>
              <PiggyBank className="text-[#222224] p-3 h-12 w-12 rounded-full bg-[#0ef07b] " />
            </div>
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm text-white">Total Spend</h2>
                <h2 className="font-bold text-2xl text-white">
                  {formatNumber(totalSpend)}
                </h2>
              </div>
              <ReceiptText className="text-[#222224] p-3 h-12 w-12 rounded-full bg-[#0ef07b]" />
            </div>
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm text-white">No. Of Budget</h2>
                <h2 className="font-bold text-2xl text-white">{budgetList?.length}</h2>
              </div>
              <Wallet className="text-[#222224] p-3 h-12 w-12 rounded-full bg-[#0ef07b]" />
            </div>
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm text-white">Sum of Income Streams</h2>
                <h2 className="font-bold text-2xl text-white">
                  {formatNumber(totalIncome)}
                </h2>
              </div>
              <CircleDollarSign className="text-[#222224] p-3 h-12 w-12 rounded-full bg-[#0ef07b]" />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((item, index) => (
            <div
              className="h-[110px] w-full bg-slate-200 animate-pulse rounded-lg"
              key={index}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardInfo;
