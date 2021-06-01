const fs = require("fs");
const path = require("path");

const packageStatus = require(path.join(__dirname, "../../../package-status.json"));

fs.mkdirSync(path.join(__dirname, "out"));

Object.keys(packageStatus.packages).forEach((package) => {
  /** @type {import('../../../package-status.json')['packages']['polyglot']} */
  const packageInfo = packageStatus.packages[package];
  const message = generateMessage(packageInfo);

  // Data Population
  const badgeData = {
    schemaVersion: 1,
    label: "Status",
    message,
  };

  fs.writeFileSync(path.join(__dirname, "out", `${package}.json`), JSON.stringify(badgeData));
});

/** @param {import('../../../package-status.json')['packages']['polyglot']} packageInfo */
function generateMessage(packageInfo) {
  if (packageInfo.maintained) return "Maintained | " + packageInfo.maintainers.join(", ");
  if (packageInfo.deprecated) return "Deprecated";
  return "Not Maintained | Adopt Me!";
}
