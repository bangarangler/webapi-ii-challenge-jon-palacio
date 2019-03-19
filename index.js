//const express = require("express");

const postsRouter = require("./postsRouter.js");
//const db = require("./data/db.js");

const server = require("./postsRouter.js");

server.use("/api/posts/", postsRouter);

server.listen(4000, () => {
  console.log("Server is running on port 4000... go catch it");
});
