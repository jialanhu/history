const kafkaUtils = require("./utils/kafka.js");

const topic = "test";

let pubCount = 0;
let subCount = 0;
(async () => {
    await kafkaUtils.eachMessage(topic, ({ topic, partition, message, heartbeat, pause }) => {
        // console.log({
        //     key: message.key.toString(),
        //     value: message.value.toString(),
        //     headers: message.headers,
        // });
        subCount++;
    });
    setInterval(() => {
        console.log(`pubCount:${pubCount}, subCount:${subCount}`);
        pubCount = 0;
        subCount = 0;
    }, 1000);
})();
