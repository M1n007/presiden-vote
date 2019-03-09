var mysql = require("mysql");

var config = require("./config/config");

var pool = mysql.createPool(config.configDb);

const publicIp = require("public-ip");

exports.cekIp = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  (async () => {
    const myIp = await publicIp.v4();

    const ceking = () =>
      new Promise((resolve, reject) => {
        pool.query(
          `select * from poll where ip = '${myIp}'`,
          (err, res, field) => {
            if (err) {
              reject(err);
            }

            if (res[0] == null || res[0] == undefined) {
              resolve(myIp);
            } else {
              resolve(myIp);
            }
          }
        );
      });

    ceking()
      .then(res => {
        callback(null, res);
      })
      .catch(err => {
        callback(null, err);
      });
    // }
  })();
};
