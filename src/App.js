import React, { Component } from "react";
import "./pil.css";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Grow from "@material-ui/core/Grow";
import axios from "axios";

import Header from "./component/header";

import JOKOWI from "./img/jokomin.png";
import PRABOWO from "./img/sawo.png";

class App extends Component {
  state = {
    myip: "",
    jokowiVote: 0,
    prabowoVote: 0
  };

  componentWillMount() {
    axios
      .get(
        "https://mmc5869y4a.execute-api.us-east-2.amazonaws.com/pilpres/2019/myip"
      )
      .then(res => this.setState({ myip: res.data }));

    this.getJokowi();
    this.getPrabowo();
  }

  getJokowi() {
    axios
      .get(
        "https://mmc5869y4a.execute-api.us-east-2.amazonaws.com/pilpres/2019/vote/jokowi"
      )
      .then(res => this.setState({ jokowiVote: res.data }));
  }

  getPrabowo() {
    axios
      .get(
        "https://mmc5869y4a.execute-api.us-east-2.amazonaws.com/pilpres/2019/vote/prabowo"
      )
      .then(res => this.setState({ prabowoVote: res.data }));
  }

  createVote(capres) {
    axios
      .post(
        "https://mmc5869y4a.execute-api.us-east-2.amazonaws.com/pilpres/2019/create/vote",
        { capres: capres }
      )
      .then(respon => {
        alert(JSON.stringify(respon.data));
      })
      .catch(err => alert("maaf kamu tidak boleh voting lebih dari 1 kali"));
  }
  render() {
    console.log(this.state.myip);
    const totalSuara =
      this.state.jokowiVote.total_vote + this.state.prabowoVote.total_vote;
    const selisih = Math.ceil(
      this.state.jokowiVote.total_vote / this.state.prabowoVote.total_vote
    );
    return (
      <div>
        <Header />
        <font
          style={{
            fontSize: 20,
            fontWeoght: "bold",
            display: "flex",
            flexDirection: "row",
            paddingBottom: 10,
            paddingTop: 10,
            justifyContent: "center"
          }}
        >
          KESELURUHAN TOTAL SUARA : {totalSuara}
        </font>
        <font
          style={{
            fontSize: 20,
            fontWeoght: "bold",
            display: "flex",
            flexDirection: "row",
            paddingBottom: 10,
            paddingTop: 10,
            justifyContent: "center"
          }}
        >
          SELISIH SUARA : {selisih}
        </font>
        <Grid container space={30}>
          <Grid item xl={6} lg={6} sm={12} xs={12}>
            <div className="cent-bod">
              <Grow
                in={true}
                style={{ transformOrigin: "0 0 0" }}
                {...(true ? { timeout: 1000 } : {})}
              >
                <div className="img-with-btn">
                  <img src={JOKOWI} className="imageCapres" />
                  <font
                    style={{
                      fontSize: 20,
                      fontWeoght: "bold",
                      display: "flex",
                      flexDirection: "row",
                      paddingBottom: 10,
                      justifyContent: "center"
                    }}
                  >
                    TOTAL SUARA : {this.state.jokowiVote.total_vote}
                  </font>
                  {/* <Button
                    onClick={() => this.createVote("jokowi")}
                    variant="contained"
                    color="secondary"
                    className="btn "
                  >
                    VOTE
                  </Button> */}
                  {this.state.myip != "terdaftar" ? (
                    <Button
                      onClick={() => this.createVote("jokowi")}
                      variant="contained"
                      color="secondary"
                      className="btn "
                    >
                      VOTE
                    </Button>
                  ) : (
                    <Button
                      onClick={() => this.createVote("jokowi")}
                      variant="contained"
                      color="secondary"
                      className="btn "
                      disabled
                    >
                      VOTE
                    </Button>
                  )}
                </div>
              </Grow>
            </div>
          </Grid>
          <Grid item xl={6} lg={6} sm={12} xs={12}>
            <div className="cent-bod">
              <Grow
                in={true}
                style={{ transformOrigin: "0 0 0" }}
                {...(true ? { timeout: 1500 } : {})}
              >
                <div className="img-with-btn">
                  <img src={PRABOWO} className="imageCapres" />
                  <font
                    style={{
                      fontSize: 20,
                      fontWeoght: "bold",
                      display: "flex",
                      flexDirection: "row",
                      paddingBottom: 10,
                      justifyContent: "center"
                    }}
                  >
                    TOTAL SUARA : {this.state.prabowoVote.total_vote}
                  </font>
                  {/* <Button
                    onClick={() => this.createVote("prabowo")}
                    variant="contained"
                    color="primary"
                    className="btn"
                  >
                    VOTE
                  </Button> */}
                  {this.state.myip != "terdaftar" ? (
                    <Button
                      onClick={() => this.createVote("prabowo")}
                      variant="contained"
                      color="primary"
                      className="btn"
                    >
                      VOTE
                    </Button>
                  ) : (
                    <Button
                      onClick={() => this.createVote("prabowo")}
                      variant="contained"
                      color="primary"
                      className="btn"
                      disabled
                    >
                      VOTE
                    </Button>
                  )}
                </div>
              </Grow>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
