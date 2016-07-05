/* To use this script as a bookmarklet paste this code in:
   http://mrcoles.com/bookmarklet/ */
(function (filterPrefix) {
  function copyToClipboard(text) {
    const input = document.createElement('textarea');
    input.style.position = 'fixed';
    input.style.opacity = 0;
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');
    document.body.removeChild(input);
  };

  function createRelease() {
    var issues = Array.prototype.slice.call(document.querySelectorAll('li.js-issue-row')).map(e => ({
      id: e.id.substr('issue_'.length),
      text: e.querySelector('.Box-row-link').innerText,
      href: e.querySelector('.Box-row-link').href,
      type: Array.prototype.slice.call(e.querySelectorAll('.labels a')).filter(l => l.innerText.indexOf(filterPrefix) === 0).map(l => l.innerText.substr(filterPrefix.length))[0]
    }));

    var dic = {};

    for (var issue of issues) {
      dic[issue.type] = dic[issue.type] ? (dic[issue.type].push(issue), dic[issue.type]) : [issue];
    }

    var githubRepository = document.location.pathname.substr(0, document.location.pathname.indexOf('/issues'));
    var text = `As part of this release we had [${ issues.length } issues](${ document.location }) being closed.\n\n`;
    for (var key in dic) {
      text += `## ${ key.charAt(0).toUpperCase() }${ key.substr(1) } \n`;
      text += '\n';
      text += dic[key].map(entry => `* [#${ entry.id }](${ entry.href }) - ${ entry.text }`).join('\n');
      text += '\n';
      text += '\n';
    }

    return text;
  }

  try {
    var releaseText = createRelease();
    console.log(releaseText);
    copyToClipboard(releaseText);
    alert('Release created with success.\n\nThe following content was written to console and copied to your clipboard.\n\n---------------------------------------\n\n' + releaseText)
  } catch (err) {
    alert("Error creating release: ", err);
  }
})('type:');
