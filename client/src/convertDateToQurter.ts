const convertDateToQurter = (date: string): string => {
  if (date.includes("12.31 현재")) {
    date.replace("12.31 현재", " 4Q")
  }
  return date;
};

export default convertDateToQurter;
