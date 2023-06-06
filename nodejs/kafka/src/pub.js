const kafkaUtils = require("./utils/kafka.js");

const topic = "test";

let pubCount = 0;
let subCount = 0;
(async () => {
    await kafkaUtils.createTopic(topic);
    await kafkaUtils.producerConnect();
    setInterval(() => {
        console.log(`pubCount:${pubCount}, subCount:${subCount}`);
        pubCount = 0;
        subCount = 0;
    }, 1000);
    const promiseSet = new Set();
    for (let i = 0; i < 1_000_000_000; i++) {
        if (promiseSet.size > 1000) {
            await sleep(10);
        }
        promiseSet.add(i);
        kafkaUtils.send(topic, { key: `${new Date()}`, value: `${new Date()}` }).then(() => {
            promiseSet.delete(i);
            pubCount++;
        });
    }
})();

async function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}
