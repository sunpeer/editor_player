const express=require("express")

const editorPort=3000
const playerPort=3001
const ipAddr="192.168.1.103"

const editorApp=express()
const playerApp=express()

editorApp.use(express.static('public/editor'))
playerApp.use(express.static('public/player'))

editorApp.listen(editorPort,ipAddr,function(){
    const addr=this.address();
    var url= `http://${addr.address}:${addr.port}`
    console.log(`editor running at ${url}`)
})

playerApp.listen(playerPort,ipAddr,function(){
    const addr=this.address();
    var url= `http://${addr.address}:${addr.port}`
    console.log(`player runing at ${url}`)
})