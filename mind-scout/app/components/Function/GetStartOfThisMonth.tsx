function GetStartOfThiSMonth() {
  const today = new Date();
  const startOfThisMonth = new Date(today);
  startOfThisMonth.setDate(startOfThisMonth.getDate() - today.getDate() + 1);
  startOfThisMonth.setHours(0, 0, 0, 0);
  return startOfThisMonth;
}

export default GetStartOfThiSMonth;
