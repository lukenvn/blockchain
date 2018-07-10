import web3 from "./web3";

import PollFactory from "./build/PollFactory.json";
const instance = new web3.eth.Contract(
  JSON.parse(PollFactory.interface),
  "0x994682C19E62002DFAF105110ac39289B6902467"
);

export default instance;