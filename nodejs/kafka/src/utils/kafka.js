const { Kafka } = require("kafkajs");

class KafkaUtils {
    #producer;
    #consumer;
    #admin;
    constructor() {
        const kafka = new Kafka({
            clientId: "my-app",
            brokers: ["172.28.52.120:9192", "172.28.52.120:9292", "172.28.52.120:9392"],
        });
        this.#producer = kafka.producer();
        this.#consumer = kafka.consumer({ groupId: "my-group" });
        this.#admin = kafka.admin();
    }

    async producerConnect() {
        await this.#producer.connect();
    }

    async eachMessage(topic, callback) {
        await this.#consumer.subscribe({ topics: [topic] });
        await this.#consumer.run({ eachMessage: callback });
    }

    async send(topic, message) {
        await this.#producer.send({ topic, messages: [message] });
    }

    async createTopic(topic) {
        await this.#admin.connect();
        await this.#admin.createTopics({
            topics: [{ topic }],
        });
        await this.#admin.disconnect();
    }
}

module.exports = new KafkaUtils();
