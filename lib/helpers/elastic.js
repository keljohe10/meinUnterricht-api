require("dotenv").config();
const { Client } = require("@elastic/elasticsearch");                  
const elasticUrl = process.env.ELASTIC_URL || "http://elasticsearch:9200";
const esclient   = new Client({ node: elasticUrl });

const checkConnection = async () =>  {
    let isConnected = false;
      try {
        await esclient.cluster.health({});
        isConnected = true;
      } catch (e) {
        console.error(e);
      }
      return isConnected;
}

const createIndex = async (index) => { 
  try {
    await esclient.indices.create({ index });
  } catch (err) {
    console.error(err);
  }
}

const mappingIndex = async (index) => {
  try {
    await esclient.indices.putMapping({ 
      index, 
      body: { 
        properties: {
          search: {
            type: 'keyword'
          }
        } 
      } 
    })
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  esclient,
  checkConnection,
  createIndex,
  mappingIndex
};