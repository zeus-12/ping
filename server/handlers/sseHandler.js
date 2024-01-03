import { v4 as uuidv4 } from "uuid";

var client = {};
const pings = [];

export const eventsHandler = (request, response, next) => {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  response.writeHead(200, headers);

  //const data = `data: ${JSON.stringify(pings)}\n\n`;

  // response.write(data);

  const clientId = uuidv4();

  client = {
    id: clientId,
    response,
  };

  request.on("close", () => {
    console.log(`${clientId} Connection closed`);
    client = {};
  });
};

export const sendPing = (pingObject) => {
  pings.push(pingObject);
  client.response.write(`data: ${JSON.stringify(pingObject)}\n\n`);
};

export const removePing = (pingObject) => {
  pings = pings.filter((ping) => ping !== pingObject);
};
