var mysql = require("mysql");

var config = require("./config/config");

var pool = mysql.createPool(config.configDb);

const publicIp = require("public-ip");

exports.jokowiLength = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  (async () => {
    const myIp = await publicIp.v4();

    const jokowi = () =>
      new Promise((resolve, reject) => {
        pool.query(
          `select * from poll where name = 'jokowi'`,
          (err, res, field) => {
            if (err) {
              reject(err);
            }

            const lengthJK = res.map(re => {
              return re;
            });

            const total = {
              total_vote: lengthJK.length
            };

            resolve(total);
          }
        );
      });

    jokowi()
      .then(res => {
        callback(null, res);
      })
      .catch(err => {
        callback(null, err);
      });
    // }
  })();
};
