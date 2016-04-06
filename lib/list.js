module.exports = [
  {
    description: "Is the website only served over https?",
    tests: [
      {
        command: "curl -s -I http://%s | grep '^HTTP'",
        expect: "HTTP/1.1 301 Moved Permanently",
        handler: "HTTP/1.1 301 Moved Permanently"
      },
      {
        command: "curl -s -I https://%s | grep '^HTTP'",
        expect: "HTTP/1.1 200 OK",
        handler: "HTTP/1.1 200 OK"
      }
    ]
  },
  {
    description: "Is the HSTS http-header set?",
    tests: [
      {
        command: "curl -s -I https://%s | grep '^Strict'",
        expect: "Strict-Transport-Security: max-age=63072000; includeSubdomains;",
        handler: /Strict-Transport-Security: max-age=([0-9]+)/i
      }
    ]
  },
  {
    description: "Is the server certificate at least 4096 bits?",
    tests: [
      {
        command: "openssl s_client -showcerts -connect %s:443 |& grep '^Server public key'",
        expect: "Server public key is 4096 bit",
        handler: function (output) {
          var size = parseInt(/Server public key is ([0-9]+) bit/i.exec(output)[1]);
          return size >= 4096;
        }
      }
    ]
  }
];