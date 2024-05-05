import express from "express";
import swagger from 'swagger-ui-express';
import apiDocs from "./swagger.json" assert {type: 'json'};
import loggerMiddleware from "./middleware/logger.middleware.js";
import jwtAuthoriser from "./middleware/jwt.middleware.js";
import { userRouter } from "./features/user/user.route.js";
import { postRouter } from "./features/post/post.route.js";
import { commentRouter } from "./features/comment/comment.route.js";
import { likeRouter } from "./features/like/like.route.js";
import ApplicationError from "./errorHandler/application.error.js";
const app = express();


//THIS IS THE BODY PARSER MIDDLEWARE
app.use(express.json());

//THIS MIDDLEWARE LOGS EVERY REQUEST URL AND REQUEST BODY IN [log.txt] FILE
app.use(loggerMiddleware);

//THIS MIDDLEWARE IS FOR API DOCUMENTATION
app.use("/api/docs", swagger.serve, swagger.setup(apiDocs));

//THIS MIDDLEWARE REDIRECTS EVERY REQUEST TO THE [postRouter] WHICH CORRESPONDS TO POSTS
app.use("/api/posts", jwtAuthoriser, postRouter);

//THIS MIDDLEWARE REDIRECTS EVERY REQUEST TO THE [userRouter] WHICH CORRESPONDS TO USER
app.use("/api/user", userRouter);

//THIS MIDDLEWARE REDIRECTS EVERY REQUEST TO THE [commentRouter] WHICH CORRESPONDS TO COMMENTS
app.use("/api/comments", jwtAuthoriser, commentRouter);

//THIS MIDDLEWARE REDIRECTS EVERY REQUEST TO THE [likeRouter] WHICH CORRESPONDS TO LIKES
app.use("/api/likes", jwtAuthoriser, likeRouter);

//TESTING ROUTE
app.get("/", (req, res) => {
    return res.send("The app is working.");
});

//HANDLING WRONG APIs 
app.use((req, res) => {
    return res.status(404).send("API NOT FOUND, Please Check The API And Try Again.");
});

//HANDLING APPLICATION LEVEL ERRORS LIKE SYNTAX ERROR AND OTHERS.
app.use((err, req, res, next) => {
    if (err instanceof ApplicationError) {
        return res.status(err.statusCode).send(err.message);
    }
    //IF ERROR IS NOT DEFINED THE USER WILL GET THIS RESPONSE.
    return res.status(500).send("Something Went Wrong Please Try Again Later.");
})

app.listen(3200, () => {
    console.log("The app is listening on port number 3200.");
});