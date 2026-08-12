// import fs from 'fs'

// fs.writeFileSync("index.html","hello Node js");
// fs.writeFileSync("index.html","nonino") //content of the file gets overwritten

// let data=fs.readFileSync("index.html");
// console.log(data.toString());

// let fs1= require("fs");
//  fs1.writeFileSync("index.txt","hello world");
// fs1.appendFile("id.txt","hello");

import fs from "fs"

let val=10;

fs.writeFileSync("id.txt",`hello Binayak val is ${val}` )
fs.appendFileSync("id.txt","hello all")
// fs.unlinkSync("index.html")


// fs.mkdirSync("folder");
// fs.writeFileSync("./folder/ind.html","helo folder creation")
// fs.unlinkSync("./folder/ind.html");
fs.rmdirSync("folder");



