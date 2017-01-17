# Release Notes Bookmarklet

> Convert your Github milestone to markdown release notes

Some projects take advantage of GitHub milestones and releases to track the development progress.
To generate **pretty release pages**, using the issues in some milestone, you can use this utility 
bookmarklet that creates a markdown list with all the issues listed in a GitHub page (ex: milestones) 
organized by label (using the format `type:...`).


## Install

[Create a bookmarklet](https://www.google.pt/search?q=how%20to%20create%20bookmarklet) with the following:

```
javascript:(function()%7B%2F*%20To%20use%20this%20script%20as%20a%20bookmarklet%20paste%20this%20code%20in%3Ahttp%3A%2F%2Fmrcoles.com%2Fbookmarklet%2F%20*%2F(function%20(filterPrefix)%20%7Bfunction%20copyToClipboard(text)%20%7Bconst%20input%20%3D%20document.createElement('textarea')%3Binput.style.position%20%3D%20'fixed'%3Binput.style.opacity%20%3D%200%3Binput.value%20%3D%20text%3Bdocument.body.appendChild(input)%3Binput.select()%3Bdocument.execCommand('Copy')%3Bdocument.body.removeChild(input)%3B%7D%3Bfunction%20createRelease()%20%7Bvar%20issues%20%3D%20Array.prototype.slice.call(document.querySelectorAll('li.js-issue-row')).map(e%20%3D%3E%20(%7Bid%3A%20e.id.substr('issue_'.length)%2Ctext%3A%20e.querySelector('.link-gray-dark').innerText%2Chref%3A%20e.querySelector('.link-gray-dark').href%2Ctype%3A%20Array.prototype.slice.call(e.querySelectorAll('.labels%20a')).filter(l%20%3D%3E%20l.innerText.indexOf(filterPrefix)%20%3D%3D%3D%200).map(l%20%3D%3E%20l.innerText.substr(filterPrefix.length))%5B0%5D%7D))%3Bvar%20dic%20%3D%20%7B%7D%3Bfor%20(var%20issue%20of%20issues)%20%7Bdic%5Bissue.type%5D%20%3D%20dic%5Bissue.type%5D%20%3F%20(dic%5Bissue.type%5D.push(issue)%2C%20dic%5Bissue.type%5D)%20%3A%20%5Bissue%5D%3B%7Dvar%20githubRepository%20%3D%20document.location.pathname.substr(0%2C%20document.location.pathname.indexOf('%2Fissues'))%3Bvar%20text%20%3D%20%60As%20part%20of%20this%20release%20we%20had%20%5B%24%7B%20issues.length%20%7D%20issues%5D(%24%7B%20document.location%20%7D)%20being%20closed.%5Cn%5Cn%60%3Bfor%20(var%20key%20in%20dic)%20%7Btext%20%2B%3D%20%60%23%23%20%24%7B%20key.charAt(0).toUpperCase()%20%7D%24%7B%20key.substr(1)%20%7D%20%5Cn%60%3Btext%20%2B%3D%20'%5Cn'%3Btext%20%2B%3D%20dic%5Bkey%5D.map(entry%20%3D%3E%20%60*%20%5B%23%24%7B%20entry.id%20%7D%5D(%24%7B%20entry.href%20%7D)%20-%20%24%7B%20entry.text%20%7D%60).join('%5Cn')%3Btext%20%2B%3D%20'%5Cn'%3Btext%20%2B%3D%20'%5Cn'%3B%7Dreturn%20text%3B%7Dtry%20%7Bvar%20releaseText%20%3D%20createRelease()%3Bconsole.log(releaseText)%3BcopyToClipboard(releaseText)%3Balert('Release%20created%20with%20success.%5Cn%5CnThe%20following%20content%20was%20written%20to%20console%20and%20copied%20to%20your%20clipboard.%5Cn%5Cn---------------------------------------%5Cn%5Cn'%20%2B%20releaseText)%7D%20catch%20(err)%20%7Bconsole.error(err)%3Balert(%22Error%20creating%20release%3A%20%22%2C%20err)%3B%7D%7D)('type%3A')%7D)()
```

## Use

0. Navigate to some GitHub issue list (ex: milestone page)
0. Press the bookmarklet (content was copied to clipboard)
0. Create/edit a GitHub release and paste there


## Source

The source code for the bookmarklet is available [here](release-notes-bookmarklet.js).


## Contribute

Please feel free to open pull requests with bugfixes or improvements for this tool.
