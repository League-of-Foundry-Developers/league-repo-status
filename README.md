# League Repo Statuses
This repository is used to track the status of various packages in this organization. The League does not maintain the packages in this organization directly, instead the League provides a place to "park" pacakges that are no longer being maintained by their original author, so that a new maintainer can easily be granted access after the author has gone.

The `package-status.json` file contains a list of packages in this organization, and their current status. This data is used to feed badges on each package readme so that each repo has a status indication which is maintained in a central location.

**We welcome Pull Requests** when a package status needs updated.

## Package Status Schema
The `package-status.json` follows the following schema:

```js
{
	"schemaVersion": 1, // The current version of this schema
	"packages": {       // A mapping of all packages in the org to their canonical name (from their manifest)
		"name": {
			// The canonical location of the manifest file for the package - should be valid for installation
			"manifest": "module.json",

			// The URL of the package repository, usually looks like "https://github.com/username/repo-name"
			"repo": "https://host.com/user/repo-name",

			// Whether or not the package is currently being maintained
			"maintained": boolean,

			// Set to true if the package should no longer be maintained due to being too outdated/unneeded                  
			"deprecated": boolean,
			
			// An array of user names of people actively maintaining the project.             
			"maintainers": ["username"]
		}
	}
}
```

## Example Badges
View this files's source to see how these badges are made.
### Polyglot:
![](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FLeague-of-Foundry-Developers%2Fleague-repo-status%2Fshields-endpoint%2Fpolyglot.json)

![](https://img.shields.io/badge/dynamic/json?label=Maintained&query=packages.polyglot.maintained&url=https%3A%2F%2Fraw.githubusercontent.com%2FLeague-of-Foundry-Developers%2Fleague-repo-status%2Fmain%2Fpackage-status.json)
![](https://img.shields.io/badge/dynamic/json?label=Maintainer&query=packages.polyglot.maintainer&url=https%3A%2F%2Fraw.githubusercontent.com%2FLeague-of-Foundry-Developers%2Fleague-repo-status%2Fmain%2Fpackage-status.json)
![](https://img.shields.io/badge/dynamic/json?label=Deprecated&query=packages.polyglot.deprecated&url=https%3A%2F%2Fraw.githubusercontent.com%2FLeague-of-Foundry-Developers%2Fleague-repo-status%2Fmain%2Fpackage-status.json)

### Roofs
![](https://img.shields.io/badge/dynamic/json?label=Maintained&query=packages.roofs.maintained&url=https%3A%2F%2Fraw.githubusercontent.com%2FLeague-of-Foundry-Developers%2Fleague-repo-status%2Fmain%2Fpackage-status.json)
![](https://img.shields.io/badge/dynamic/json?label=Maintainer&query=packages.roofs.maintainer&url=https%3A%2F%2Fraw.githubusercontent.com%2FLeague-of-Foundry-Developers%2Fleague-repo-status%2Fmain%2Fpackage-status.json)
![](https://img.shields.io/badge/dynamic/json?label=Deprecated&query=packages.roofs.deprecated&url=https%3A%2F%2Fraw.githubusercontent.com%2FLeague-of-Foundry-Developers%2Fleague-repo-status%2Fmain%2Fpackage-status.json)
