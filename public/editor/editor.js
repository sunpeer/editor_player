
var editPad = document.getElementById("edit-pad")
var selections=getSelection()
var picSelector=document.getElementById("pic-selector")

picSelector.addEventListener("change",insertPicture)

function elementSetStyle(selections, el, styleName) {
    var childs = el.children
    for (var i = 0; i < childs.length; i++) {
        if (selections.containsNode(childs[i])) {
            containedElementSetStyle(childs[i], styleName)
        } else {
            elementSetStyle(selections, childs[i],styleName)
        }
    }
}

function containedElementSetStyle(e, styleName) {
    if (e.classList.contains(styleName)) {
        e.classList.remove(styleName)
    } else {
        e.classList.add(styleName)
    }
    for (var i = 0; i < e.children.length; i++) {
        containedElementSetStyle(e.children[i], styleName)
    }
}

function setSelectionStyle(styleName) {
    anchorNode = selections.anchorNode
    //判断选的是不是编辑框里的内容
    if (editPad.contains(anchorNode)) {
        selections = getSelection()
        //改变所有被选中element的style
        elementSetStyle(selections,editPad,styleName)

        /*--------------待完成（交叉节点style修改）------------------*/

        /*
            思路：
            1.找到交叉节点的那个是editPad儿子的节点
            2.在那个节点之下，修改所有父节点selections.containsNode()==false的text节点
            3.修改selections.anchorNode和selection.focusNode
        */
        /*
        var root=searchRoot(selections.anchorNode)
        decorateText(root,styleName,selections)
        // //修饰第一个元素
        // anchorOffset = getSelection().anchorOffset
        // var decoStr = anchorNode.nodeValue.slice(anchorOffset)
        // //裁剪
        // anchorNode.nodeValue = anchorNode.nodeValue.slice(0, anchorOffset)
        // createNewStyle(decoStr, styleName, anchorNode)
        // //修饰第二个元素
        // elementSetStyle(selections, styleName)
        */
        //遍历所有的edit-pad里的元素判断是否
        //判断是否在可以编辑的区域内
        // if(editPad.contains())
        //如果有则跳过
        //先得到所有的元素
        // getSelection().getRangeAt(0);
    }
}

function insertPicture(){
    if(this.files.length)
    {
        if(selections.type=='Caret'&&editPad.contains(selections.anchorNode)&&editPad!=selections.anchorNode)
        {
            var img=$('<img/>')
            var selectedFile=this.files[0]
            const reader=new FileReader()
            reader.onload = function () {
                var anchorNode=selections.anchorNode
                var anchorText=anchorNode.nodeValue
                newTextNode=document.createTextNode(anchorText.substring(0,selections.anchorOffset))
                anchorNode.nodeValue=anchorText.substring(selections.anchorOffset)
                anchorNode.parentNode.insertBefore(newTextNode,anchorNode)
                img.insertAfter(newTextNode)
                img.attr('src', reader.result)
            }
            //加载图片
            reader.readAsDataURL(selectedFile)
        }
    }
}






/*--------------待完成（交叉节点style修改）------------------*/

/*
    思路：
    1.找到交叉节点的那个是editPad儿子的节点
    2.在那个节点之下，修改所有父节点selections.containsNode()==false的text节点
    3.修改selections.anchorNode和selection.focusNode
*/

/*
var btn = document.getElementById('bold')
document.getElementById("console")
function initEditBox() {
     
}

function createNewTextNode(parNode,selections, styleName) {
    //从起始文本节点出发，找到所有祖辈的分叉文本节点，对他们进行修饰
    var childNodes = parNode.childNodes
    for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i].nodeType == 3 && selections.containsNode(childNodes[i])&&!selections.containsNode(parNode)) {
            addStyleAfter(0, childNodes[i].nodeValue.length, childNodes, styleName)
        }

    }
}

function searchRoot(el)
{
    if(el.parentNode==editPad)
        return el
    else
        return searchRoot(el.parentNode)
}

//对所有文本子元素进行检查
function decorateText(el,styleName,selections)
{
    if(el==selections.anchorNode)
    {
        addStyleAfter(selections.anchorOffset,el.nodeValue.length,el,styleName)
        return
    }
    var childNodes = el.childNodes
    if(childNodes.length){
        for (var i = 0; i < childNodes.length; i++) {
            if (childNodes[i].nodeType == 3) {
                if(childNodes[i]==selections.anchorNode){
                    addStyleAfter(selections.anchorOffset,childNodes[i].nodeValue.length,childNodes[i],styleName)
                }
                //<p>xxxxx<span>xxxx</span>|xxxxxxxx|</p>
                else if(selections.containsNode(childNodes[i])&&!selections.containsNode(childNodes[i].parentNode)) {
                    addStyleAfter(0, childNodes[i].nodeValue.length, childNodes[i], styleName)
                }
            }else if(childNodes[i].nodeType==1){
                decorateText(childNodes[i],styleName,selections)
            }
        }
    }
}

function operPar(startNode,selections,styleName)
{ 
    var parNode=startNode.parentNode
    if(parentNode.classList.classList.contains(styleName))
        return
    createNewTextNode(parNode,selections,styleName)
    if(parNode!=editPad)
    {
        operPar(parNode,selections,styleName)
    }
}


function addStyleAfter(startIndex, endIndex, anchorNode, styleName) {
    var decorText = anchorNode.nodeValue.substring(startIndex, endIndex)
    $(`<span>${decorText}</span>`).insertAfter(anchorNode).addClass(styleName)
    anchorNode.nodeValue = anchorNode.nodeValue.substring(0,startIndex)
}

function createNewStyle(text, styleName, node) {
    // var element=document.createElement('span')
    // element.classList.add(styleName)
    // element.innerText=text;
    $(`<span ${styleName}>${text}</span>`).insertAfter(node).addClass(styleName)
}
*/