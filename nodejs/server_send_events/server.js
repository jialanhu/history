const express = require("express") ;
const app = express();
app.listen(8090);
const router = express.Router();
router.get('/sse', ((req, res) => {
    setInterval(function () {
        res.write(`data: ${Date.now()}\n\n`);
    }, 1000)
    res.set({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
    });
    res.write("retry: 10000\n\n");
}));
app.use(router);

/*
浏览器客户端连接
const source = new EventSource("http://localhost:8090/sse");
source.addEventListener("message", event => console.log(event.data),false);
*/

