# Release Notes Bookmarklet

> Convert your Github milestone to markdown release notes

Some projects take advantage of GitHub milestones and releases to track the development progress.
To generate **pretty release pages**, using the issues in some milestone, you can use this utility 
bookmarklet that creates a markdown list with all the issues listed in a GitHub page (ex: milestones) 
organized by label (using the format `type:...`).


## Install

[Create a bookmarklet](https://www.google.pt/search?q=how%20to%20create%20bookmarklet) with the following:

```
javascript:(function()%7B%2F* To use this script as a bookmarklet paste this code in%3Ahttp%3A%2F%2Fmrcoles.com%2Fbookmarklet%2F *%2F(function (filterPrefix) %7Bfunction copyToClipboard(text) %7Bconst input %3D document.createElement('textarea')%3Binput.style.position %3D 'fixed'%3Binput.style.opacity %3D 0%3Binput.value %3D text%3Bdocument.body.appendChild(input)%3Binput.select()%3Bdocument.execCommand('Copy')%3Bdocument.body.removeChild(input)%3B%7D%3Bfunction createRelease() %7Bvar issues %3D Array.prototype.slice.call(document.querySelectorAll('li.js-issue-row')).map(e %3D> (%7Bid%3A e.id.substr('issue_'.length)%2Ctext%3A e.querySelector('.Box-row-link').innerText%2Chref%3A e.querySelector('.Box-row-link').href%2Ctype%3A Array.prototype.slice.call(e.querySelectorAll('.labels a')).filter(l %3D> l.innerText.indexOf(filterPrefix) %3D%3D%3D 0).map(l %3D> l.innerText.substr(filterPrefix.length))%5B0%5D%7D))%3Bvar dic %3D %7B%7D%3Bfor (var issue of issues) %7Bdic%5Bissue.type%5D %3D dic%5Bissue.type%5D %3F (dic%5Bissue.type%5D.push(issue)%2C dic%5Bissue.type%5D) %3A %5Bissue%5D%3B%7Dvar githubRepository %3D document.location.pathname.substr(0%2C document.location.pathname.indexOf('%2Fissues'))%3Bvar text %3D %60As part of this release we had %5B%24%7B issues.length %7D issues%5D(%24%7B document.location %7D) being closed.%5Cn%5Cn%60%3Bfor (var key in dic) %7Btext %2B%3D %60%23%23 %24%7B key.charAt(0).toUpperCase() %7D%24%7B key.substr(1) %7D %5Cn%60%3Btext %2B%3D '%5Cn'%3Btext %2B%3D dic%5Bkey%5D.map(entry %3D> %60* %5B%23%24%7B entry.id %7D%5D(%24%7B entry.href %7D) - %24%7B entry.text %7D%60).join('%5Cn')%3Btext %2B%3D '%5Cn'%3Btext %2B%3D '%5Cn'%3B%7Dreturn text%3B%7Dtry %7Bvar releaseText %3D createRelease()%3Bconsole.log(releaseText)%3BcopyToClipboard(releaseText)%3Balert('Release created with success.%5Cn%5CnThe following content was written to console and copied to your clipboard.%5Cn%5Cn---------------------------------------%5Cn%5Cn' %2B releaseText)%7D catch (err) %7Balert("Error creating release%3A "%2C err)%3B%7D%7D)('type%3A')%7D)()
```

## Use

0. Navigate to some GitHub issue list (ex: milestone page)
0. Press the bookmarklet (content was copied to clipboard)
0. Create/edit a GitHub release and paste there


## Source

The source code for the bookmarklet is available [here](release-notes-bookmarklet.js).


## Contribute

The source code for this bookmarklet can be found [here](release-notes-bookmarklet.js).
Please feel free to open pull requests with bugfixes or improvements for this tool.
