function parseFile(file) {
  const data = $.csv.toObjects(file);
  let buildings = [];
  let faculties = [];
  let facultysections = [];
  let rooms = [];
  let sections = [];
  let sectiontimes = [];
  let semesters = [];

  for (let i = 0; i < data.length; i++) {
    delete data[i]["Synonym"];
    delete data[i]["UG/GR"];
    delete data[i]["Section Number"];
    delete data[i]["Crs Level"];
    delete data[i]["Section Title"];
    delete data[i]["Course Type"];
    delete data[i]["Reg Restrictions"];
    delete data[i]["Faculty Name (LFM)"];
    delete data[i]["Faculty Name 2 (LFM)"];
    delete data[i]["Sec Start Date"];
    delete data[i]["Meeting Start Date"];
    delete data[i]["Sec End Date"];
    delete data[i]["Meeting End Date"];
    delete data[i]["Academic Year"];
    delete data[i]["Sec Num Of"];
    delete data[i]["Min Cred"];
    delete data[i]["Max Cred"];
    delete data[i]["Enr Count"];
    delete data[i]["Wait"];
    delete data[i]["Depts"];
    delete data[i]["Divisions"];
    delete data[i]["College"];
    delete data[i]["Instr Method"];
    delete data[i]["Sun"];
    delete data[i]["Mon"];
    delete data[i]["Tue"];
    delete data[i]["Wed"];
    delete data[i]["Thu"];
    delete data[i]["Fri"];
    delete data[i]["Sat"];
    delete data[i]["SEC.XLIST"];
    delete data[i]["SEC.FEE"];
    delete data[i]["SEC.COMMENTS"];
    delete data[i]["SEC.PRINTED.COMMENTS"];
    delete data[i]["Primary Section"];
    delete data[i]["Term Sort No"];
    delete data[i]["Only Pass/NoPass"];
    delete data[i]["Allow Pass/NoPass"];
    delete data[i]["Start Time 24hr"];
    delete data[i]["End Time 24hr"];
  }

  for (let i = 0; i < data.length; i++) {
    if (!buildings.includes(data[i]["Bldg"])) {
      buildings.push(data[i]["Bldg"]);
    }
    if (
      !faculties.includes(data[i]["Faculty First"] + data[i]["Faculty Last"])
    ) {
      faculties.push(data[i]["Faculty First"] + data[i]["Faculty Last"]);
    }
    if (!semesters.includes(data[i]["Term"])) {
      semesters.push(data[i]["Term"]);
    }
    // check for the start and end time for the semester
  }
}
