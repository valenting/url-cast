let args = process.argv.slice(2);
if (args < 2) {
  console.log("Bad number of arguments!");
  console.log("Usage: node cast.js <IP> <URL>");
  process.exit(1);
}

run();
async function run() {
  const util = require('util');
  const nodecastor = require('nodecastor');

  let d = new nodecastor.CastDevice({
    friendlyName: 'My secret Chromecast',
    address: args[0],
    port: 8009
  });
  d.on('status', status => {
    console.log('Chromecast status updated', util.inspect(status));
  });

  await new Promise(resolve => {
    d.on("connect", resolve);
  });

  await new Promise(resolve => {
    d.status((err, s) => {
      if (!err) {
        console.log('Chromecast status', util.inspect(s));
        resolve();
      }
    });
  });

  let a = await new Promise((resolve, reject) => {
    d.application("5CB45E5A", (err, a) => {
      if (err) {
        reject(err);
      }
      console.log('Loaded application', util.inspect(a));
      resolve(a);
    });
  });

  let s = await new Promise((resolve, reject) => {
    a.run('urn:x-cast:com.url.cast', (err, s) => {
      if (err) {
        reject(err);
      }
      console.log('Got a session', util.inspect(s));
      resolve(s);
    });
  });

  var msg = {
      "type": "loc",
      "url": args[1]
  }


  s.send(msg, (err, data) => {
    if (!err) {
      console.log('Got an answer!', util.inspect(data));
    }
  });
  s.on('message', data => {
    if (data == 'ok') {
      process.exit(0);
    }

    console.log('Got an unexpected message', util.inspect(data));
    process.exit(1);
  });
}
