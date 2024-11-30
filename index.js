import express from "express";
import { WebPubSubServiceClient } from "@azure/web-pubsub";
import { WebPubSubEventHandler } from "@azure/web-pubsub-express";
import cors from "cors";
import { azPubsubConnectionString } from "./keys.js";

const app = express();
const hubName = "chat_beta";

const serviceClient = new WebPubSubServiceClient(
    azPubsubConnectionString,
    hubName
);

const handler = new WebPubSubEventHandler(hubName, {
    path: "/eventhandler",
    handleConnect: (req) => {
        console.log(JSON.stringify(req));
        return {};
    },
    onConnected: (req) => {
        console.log(JSON.stringify(req));
    },
    handleUserEvent: (req, res) => {
        console.log(JSON.stringify(req));
        res.success("Hey " + req.data, req.dataType);
    },
});

app.use(handler.getMiddleware());
// [Extremely Important]: we need to set up the pubsub express middleware
// before we use cors() as it blocks the OPTIONS request
app.use(cors());

app.get("/", (_, res) => {
    res.send("Hello World!");
});

app.get("/negotiate/:user", async (req, res) => {
    let userId = req.params.user;
    if (!userId || userId.length === 0) {
        res.status(400).send("missing user id");
        return;
    }
    let token = await serviceClient.getClientAccessToken({
        userId,
    });
    res.json(token);
});

app.get("/sendToAll/:message", async (req, res) => {
    const message = req.params.message;
    await serviceClient.sendToAll(message);

    res.send("sent");
});

app.listen(9080, () => console.log("server started"));
