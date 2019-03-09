var mysql = require("mysql");

var config = require("./config/config");

var pool = mysql.createPool(config.configDb);

const publicIp = require("public-ip");

exports.prabowoLength = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  (async () => {
    const myIp = await publicIp.v4();

    const prabowo = () =>
      new Promise((resolve, reject) => {
        pool.query(
          `select * from poll where name = 'prabowo'`,
          (err, res, field) => {
            if (err) {
              reject(err);
            }

            const lengthPB = res.map(re => {
              return re;
            });

            const total = {
              total_vote: lengthPB.length
            };

            resolve(total);
          }
        );
      });

    prabowo()
      .then(res => {
        callback(null, res);
      })
      .catch(err => {
        callback(null, err);
      });
    // }
  })();
};
