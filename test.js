const axios = require('axios');

async function getIphoneData(modelCode) {
    const url = `https://www.apple.com/ru/shop/fulfillment-messages?parts.0=${modelCode}`;
    const res = await axios.get(url);
    const data = res.data;

    // пример парсинга цены
    const price = data.bodyContent?.some((b) => b.parts?.length) ? data.bodyContent[0].parts[0].price : 'не указана';

    return {
        model: modelCode,
        price
    };
}

getIphoneData('MLPF3RU/A').then(console.log);
