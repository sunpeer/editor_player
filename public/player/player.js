
const fileSelector = document.getElementById('inputfile')
fileSelector.addEventListener('change', handleFileChange)


function handleFileChange() {
    if (this.files.length) //如果有文件
    {
        var selectedFile = this.files[0]
        //判断一下视频文件的格式
        // selectedFile.type
        const reader = new FileReader()
        //读取视频成功触发onload事件
        reader.onload = function () {
            // //绑定资源地址
            player.src = reader.result
        }
        //读取视频
        reader.readAsDataURL(selectedFile)
    }
}





/*-------------待完成（截屏）--------------*/
/*
function snippt()
{
    const canvas = document.getElementById('my-house');
    const ctx = canvas.getContext('2d');
    ctx.drawWindow(window, 0, 0, 100, 200, "rgb(255,255,255)")
}
*/