const fs = require("fs");
const path = require("path");

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function prettifyFilename(filename) {
  let name = path.basename(filename, path.extname(filename));
  // Strip date prefix: YYYY-MM-DD-
  name = name.replace(/^\d{4}-\d{2}-\d{2}-/, "");
  // Strip date suffix: -YYYYMMDD or _YYYYMM
  name = name.replace(/-\d{8}$/, "");
  name = name.replace(/[_-]\d{6}$/, "");
  // Strip date appearing mid-name: -YYYYMMDD-
  name = name.replace(/-\d{8}-/g, "-");
  return name.replace(/[-_]/g, " ").trim();
}

module.exports = function () {
  const meetingsDir = path.join(__dirname, "../../meetings");
  const dirs = fs
    .readdirSync(meetingsDir)
    .filter((d) => fs.statSync(path.join(meetingsDir, d)).isDirectory())
    .sort()
    .reverse();

  return dirs.map((dir) => {
    const [year, month] = dir.split("-").map(Number);
    const files = fs
      .readdirSync(path.join(meetingsDir, dir))
      .filter((f) => [".pdf"].includes(path.extname(f).toLowerCase()))
      .map((f) => ({
        name: f,
        label: prettifyFilename(f),
        path: `meetings/${dir}/${f}`,
        ext: path.extname(f).toLowerCase().slice(1),
      }));

    return {
      id: dir,
      monthName: `${MONTHS[month - 1]} ${year}`,
      files,
    };
  });
};
