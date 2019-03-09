var mysql = require("mysql");

var config = require("./config/config");

var pool = mysql.createPool(config.configDb);

const publicIp = require("public-ip");

exports.createVote = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  (async () => {
    const myIp = await publicIp.v4();

    const post = {
      name: event.capres
    };

    const createPol = () =>
      new Promise((resolve, reject) => {
        pool.query(
          `select * from poll where ip = '${myIp}'`,
          (err, res, field) => {
            if (err) {
              reject(err);
            }

            if (res[0] != null || res[0] != undefined) {
              const response = {
                status: "failed",
                message: "you can't vote more than one time"
              };

              resolve(response);
            } else {
              pool.query(
                `INSERT INTO poll SET name = ?, time = CURRENT_TIME(), ip = ?`,
                [post.name, myIp],
                (err, res, field) => {
                  if (err) {
                    reject(err);
                  }
                  const response = {
                    status: "ok",
                    data: {
                      message: "vote success"
                    }
                  };
                  resolve(response);
                }
              );
            }
          }
        );
      });

    createPol()
      .then(res => {
        callback(null, res);
      })
      .catch(err => {
        callback(null, err);
      });
    // }
  })();
};
