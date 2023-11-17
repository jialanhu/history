const ZooKeeper = require("zookeeper");

(async () => {
  const zkClient = new ZooKeeper({
    connect: "localhost:2181,localhost:2182,localhost:2183",
    timeout: 30 * 1000,
    host_order_deterministic: false,
  });
  zkClient.init();

  try {
    if (!(await zkClient.pathExists("/resource"))) {
      await zkClient.create(
        "/resource",
        "",
        ZooKeeper.constants.ZOO_PERSISTENT
      );
    }
    await zkClient.create(
      "/resource/lock",
      "",
      ZooKeeper.constants.ZOO_EPHEMERAL
    );
    // do something
    await sleep();
    await zkClient.delete_("/resource/lock");
    zkClient.close();
  } catch (error) {
    console.error(error);
  }
})();

async function sleep() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}
