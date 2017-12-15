// var snippets = document.querySelectorAll('pre');
// for (var i = 0; i < snippets.length; i++) {
//     //snippets[i].insertAdjacentHTML('beforebegin', '<a class="copy-code-button" href="#"><i class="fa fa-clipboard"></i></a>');
//     //snippets[i].insertAdjacentHTML('beforebegin', '<a class="copy-code-button" href="#">copy</a>');
// }

var snippets = document.querySelectorAll('.copy-to-clipboard');
for (var i = 0; i < snippets.length; i++) {
    let code = [];
    snippets[i].addEventListener('click', function (e) {
        e.preventDefault();
        let content = this.parentNode.previousSibling.previousSibling.firstChild.childNodes;//.innerText;
        for (var i = 0; i < content.length; i++) {
            code.push(content[i].innerText);
        }            
        let allLines = code.join('\n');
        
        alert(allLines);
        code = [];            
    });
}
