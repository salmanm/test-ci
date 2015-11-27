var Frisby = require('frisby');
var token;

Frisby.create('Login')
  .post('https://dwmkerr.auth0.com/oauth/ro', {
    username: 'salman.mitha@nearform.com',
    password: 'qqqq1111',
    connection: 'MyTelkomsel-POC',
    client_id: 'vx6lppDXN4lfuagE33AC88uZz4Uzsl3u',
    grant_type: "password",
    scope: "openid"
  })
  .expectStatus(200)
  .afterJSON(function (response) {
    token = response.id_token;
    Frisby.create('Get balance for 81286517815')
      .addHeader('Authorization', 'Bearer ' + token)
      .addHeader('X-MSISDN', 6281316300815)
      .get('https://tdwst.telkomsel.com/api/subscriber/profile')
      .expectStatus(200)
      .afterJSON(function (response) {
        expect(response.profiles.balance).toEqual('30750');
      })
      .toss();
  })
  .toss();
