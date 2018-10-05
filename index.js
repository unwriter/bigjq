const spawn = require('child_process').spawn;
var run = function(filter, data) {
  const child = spawn('node_modules/node-jq/bin/jq', [filter]);
  return new Promise(function(resolve, reject) {
    let chunks = [];
    child.stdout.on('data', (chunk) => {
      chunks.push(chunk)
    });
    child.stdout.on('end', () => {
      let str = chunks.join("");
      try {
        let parsed = JSON.parse(str);
        resolve(parsed)
      } catch (e) {
        reject(e)
      }
    })
    child.stdout.on('error', (err) => {
      reject(err)
    })

    child.stdin.setEncoding('utf-8');
    child.stdin.write(JSON.stringify(data));
    child.stdin.end()
  })
}
module.exports = { run: run }
