import Redis from "ioredis";
const REDIS_KEY = "TEST_STREAM";

function getRedis() {
  return new Redis({ host: "localhost", port: 6379, password: "123456", db: 0 });
}

(async function () {
  const redis = getRedis();
  const sub = getRedis();
  const pub = getRedis();

  /**
   * 将指定流流条目放入指定key的流中，如果key不存在则自动创建
   * 条目是一组由键值对组成的，基本上就是字典，按用户给定的顺序存储，读取时按添加顺序返回
   * 命令： XADD KEY ID field string [field string]
   *   ID：“*”表示为由redis生成
   */
  setInterval(() => {
    pub.xadd(REDIS_KEY, "*", "time", new Date().toDateString(), "timestamp", Date.now());
  }, 1000);

  const blockRead = async (lastId = "$") => {
    /**
     * 阻塞并读取数据
     * 特殊的ID $ : 它代表只接收从阻塞那一刻之后的数据，对历史数据不感兴趣，只因该在第一次调用时使用
     */
    const results = await sub.xread("BLOCK", 0, "STREAMS", REDIS_KEY, lastId);
    /**
     * results的结构
     * [
     *   [
     *     "TEST_STREAM",
     *     [
     *       ["1664457271217-0",["time","Thu Sep 29 2022","timestamp","1664457271216"]]
     *     ]
     *   ]
     * ]
     */
    const messages = results.map((result) => result[1][0]);
    messages.forEach((message) => {
      console.log(JSON.stringify(message));
    });
    /**
     * ！！！！！！！！ 如果是group的消费者需要进行ack，不然PEL（待处理条目列表）不会释放内存！！！！！！！！！！！！
     */
    return blockRead(messages[messages.length - 1][0]);
  };

  await blockRead();

  await redis.disconnect();
})();
