import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xA63266CbbCEdCe4bF5Ce39cB286059f9FD6E5619'
);

export default instance;