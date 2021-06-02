const fs = require("fs");
const path = require("path");

const packageStatus = require(path.join(__dirname, "../../../package-status.json"));

/** 
 * @typedef  {object}           PackageData - A set of data outlining the maintainance status of a package
 * @property {string}           manifest    - The canonical location of the manifest file for the package - should be valid for installation
 * @property {string}           repo        - The URL of the package repository, usually looks like "https://github.com/username/repo-name"
 * @property {boolean}         [maintained] - Whether or not the package is currently being maintained
 * @property {string|boolean}  [deprecated] - Set to the last compatible version number if the package should no longer be maintained due to being too outdated/unneeded
 * @property {string[]}         maintainers - An array of user names of people actively maintaining the project.
 */

/** 
 * @typedef  {object}   ShieldsEndpointData - Data schema for a JSON enpoint for the Shilds.io API {@link https://shields.io/endpoint}
 * @property {number}   schemaVersion       - Always the number 1.
 * @property {string}   label               - The left text, or the empty string to omit the left side of the badge. This can be overridden by the query string.
 * @property {string}   message             - Can't be empty. The right text.
 * @property {string}  [color]              - The right color. Supports the eight named colors above, as well as hex, rgb, rgba, hsl, hsla and css named colors. This can be overridden by the query string.
 * @property {string}  [labelColor]         - The left color. This can be overridden by the query string.
 * @property {string}  [logoSvg]            - An SVG string containing a custom logo.
 * @property {boolean} [isError]
 * @property {string}  [namedLogo]
 * @property {string}  [logoColor]
 * @property {string}  [style]
 */

fs.mkdirSync(path.join(__dirname, "out"));

Object.keys(packageStatus.packages).forEach((package) => {
  /** @type {PackageData} */
  const packageInfo = packageStatus.packages[package];

  /** @type {ShieldsEndpointData} */
  const badgeData = getBadge(packageInfo);

  fs.writeFileSync(path.join(__dirname, "out", `${package}.json`), JSON.stringify(badgeData));
});


/**
 * Get the data for a Shields.io badge for this package
 *
 * @param {PackageData} packageInfo
 * @return {ShieldsEndpointData}
 */
function getBadge(packageInfo) {
  /** @type {ShieldsEndpointData} */
  const data = { schemaVersion: 1 };

  // Deprecated
  if (packageInfo.deprecated)
    return getDeprecated(packageInfo, data);

  // MAintained. Don't accept it as maintained if it has no maintainers!
  if (packageInfo.maintained && packageInfo.maintainers.length)
    return getMaintained(packageInfo, data);

  // Explicitly not maintainted
  if (!packageInfo.maintained)
    return getNotMaintained(data);

  // Not valid data
  data.label   = "Error";
  data.message = "Status data error"
  data.color   = "red";

  return data;
}

/**
 * Get the data for a deprecated package.
 *
 * @param {PackageData} packageInfo
 * @param {ShieldsEndpointData} data
 * @return {ShieldsEndpointData}
 */
function getDeprecated(packageInfo, data) {
  data.label   = "Deprecated";
  data.message = packageInfo.deprecated.length ? // If it's a string, display that, otherwise a static message
                 `After Foundry version ${packageInfo.deprecated}` : 
                 "After compatible core version";

  data.color   = "red";

  return data;
}

/**
 * Get the data for a maintained package.
 *
 * @param {PackageData} packageInfo
 * @param {ShieldsEndpointData} data
 * @return {ShieldsEndpointData}
 */
function getMaintained(packageInfo, data) {
  data.label   = packageInfo.maintainers.length > 1 ? "Maintainers" : "Maintainer";
  data.message = packageInfo.maintainers.join(", ");
  data.color   = "blueviolet";

  return data;
}

/**
 * Get the data for a not maintained package.
 *
 * @param {ShieldsEndpointData} data
 * @return {ShieldsEndpointData}
 */
function getNotMaintained(data) {
  data.label      = "Not Maintained";
  data.message    = "Adopt Me!";
  data.color      = "blue";
  data.labelColor = "orange";

  return data;
}