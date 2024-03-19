import prisma from "@/prisma/client";
import GetStartOfThiSMonth from "./GetStartOfThisMonth";
async function GetCommitCount(userid: string) {
  const commitRecord = await prisma.commitCount.findMany({
    where: {
      userId: userid,
    },
    take: 5,
    orderBy: {
      monthStartDate: "asc",
    },
  });

  const data = commitRecord.map((commit) => {
    const monthN = commit.monthStartDate.getMonth() + 1;
    const month = monthMap[monthN];
    return { month: month, commit: commit.commitCount, monthN: monthN };
  });

  if (data.length === 0) {
    const monthN = GetStartOfThiSMonth().getMonth() + 1;
    const month = monthMap[monthN];

    data.unshift({ month: month, commit: 0, monthN: monthN });
  }

  while (data.length < 5) {
    const previousMonthIndex = data[0]?.monthN;

    let newMonthIndex = previousMonthIndex - 1;
    if (newMonthIndex === 0) {
      newMonthIndex = 12;
    }
    const newMonth = monthMap[newMonthIndex];
    data.unshift({ month: newMonth, commit: 0, monthN: newMonthIndex });
  }

  return data;
}
const monthMap: Record<number, string> = {
  1: "Jaunary",
  2: "Feburary",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "Novermber",
  12: "December",
};

export default GetCommitCount;
