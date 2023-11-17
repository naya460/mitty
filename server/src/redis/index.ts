import addMessage from "database/message/add";
import { Redis } from "ioredis";

const redis = new Redis();

redis.subscribe('send_message_ws', (err, count) => {
  if (err) {
    console.log('Failed to subscribe : $s', err.message);
  } else {
    console.log(`Subscribed succesfully! This client is currently subscribed to ${count} channels.`);
  }
});

redis.on('message', (channel, message) => {
  const json_message  = JSON.parse(message);

  (async function() {
    // メッセージを追加
    await addMessage(
      json_message.author_name,
      json_message.group_id,
      json_message.message_text
    );
  })();  
});
