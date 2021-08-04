# League Repo Statuses
This repository is used to track the status of various packages in this organization. The League does not maintain the packages in this organization directly, instead the League provides a place to "park" packages that are no longer being maintained by their original author, so that a new maintainer can easily be granted access after the author has gone.

The `package-status.json` file contains a list of packages in this organization, and their current status. This data is used to feed badges on each package readme so that each repo has a status indication which is maintained in a central location.

**We welcome Pull Requests** when a package status needs updated.

## For Package Maintainers
All packages in this organization should have their status recorded in the `package-status.json` and a status badge displayed at the top of their readme.

### Badges
Repository maintainers in this organization should add the status badge to the top of their readme. The code for a badge looks like this:

```md
![Package Title](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FLeague-of-Foundry-Developers%2Fleague-repo-status%2Fshields-endpoint%2Fpackage-name.json)
```

Note that you need to replace `packag-name` at the end with the canonical name attribute from the module manifest. The `%2F` in front of the name is important, as this is a URL encoded string, the `%2F` represents a `/` character. Just replace everything between `%2F` and `.json`. Also replace the `Package Title` as appropriate.

#### Example Badges
![Multiple](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FLeague-of-Foundry-Developers%2Fleague-repo-status%2Fshields-endpoint%2Fexample-maintained-multiple.json)
![Maintained](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FLeague-of-Foundry-Developers%2Fleague-repo-status%2Fshields-endpoint%2Fexample-maintained.json)
![Deprecated](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FLeague-of-Foundry-Developers%2Fleague-repo-status%2Fshields-endpoint%2Fexample-not-maintained.json)
![Not Maintained](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FLeague-of-Foundry-Developers%2Fleague-repo-status%2Fshields-endpoint%2Fexample-deprecated.json)

### Package Status Schema
The `package-status.json` follows the following schema:

```js
{
    "schemaVersion": 1, // The current version of this schema
    "packages": {       // A mapping of all packages in the org to their canonical name (from their manifest)
        "name": {
            // The canonical location of the manifest file for the package
            // Should be valid for installation (usually identical to the `manifest` field in your manifest)
            "manifest": "https://raw.githubusercontent.com/user/repo/main/manifest.json",

            // The URL of the package repository, usually looks like "https://github.com/username/repo-name"
            "repo": "https://host.com/user/repo-name",

            // Whether or not the package is currently being maintained
            "maintained": boolean,

            // Either false, or set to the last compatible version number if the package should no longer be maintained due to being too outdated/unneeded                  
            "deprecated": boolean | "0.7.10",
            
            // An array of user names of people actively maintaining the project.             
            "maintainers": ["username"]
        }
    }
}
```

Try to keep this data up to date by submitting a Pull Request with modifications.
