const sql = require("./db.js");

module.exports.socialShare = (callback) => {
  sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

  });
}

module.exports.checkMetamaskAddr = (metamaskaddr,callback) => {
  sql.query("Select * from tokensale where metamask = ?", metamaskaddr, (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
      return;
    } else if(res.length==0) {
      let referral_code = "1234qwer";
      sql.query("INSERT INTO tokensale (metamask, referral_code, share_count) VALUES (?, ?, 0)",metamaskaddr,referral_code, (err, res)=>{
        if
      })
    }

    console.log(res);
    callback(null, res);
  });
}

module.exports.addReferralCode = (metamaskaddr,callback) => {  
  let referral_code = "1234qwer";
  sql.query("INSERT INTO tokensale (metamask, referral_code, share_count) VALUES (?, ?, 0)",metamaskaddr,referral_code, (err, res)=>{
    console.log(err, res);
  });
  console.log(res);
  callback(null, res);
}
