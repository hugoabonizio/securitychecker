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
  },
  {
    description: "Is TLS1.2 the only supported protocol?",
    tests: [
      {
        command: "curl --sslv3 -Ss https://%s",
        expect: "curl: (35) Server aborted the SSL handshake",
        handler: /curl: \(35\)/i
      },
      {
        command: "curl --tlsv1.0 -Ss https://%s",
        expect: "curl: (35) Server aborted the SSL handshake",
        handler: /curl: \(35\)/i
      },
      {
        command: "curl --tlsv1.1 -Ss https://%s",
        expect: "curl: (35) Server aborted the SSL handshake",
        handler: /curl: \(35\)/i
      },
      {
        command: "curl --tlsv1.2 -s -I https://%s | grep 'HTTP'",
        expect: "HTTP/1.1 200 OK",
        handler: "HTTP/1.1 200 OK"
      }
    ]
  },
  {
    description: "Have you ensured that your content cannot be embedded in a frame on another website?",
    tests: [
      {
        command: "curl -s -I https://%s | grep '^X-Frame-Options'",
        expect: "X-Frame-Options: SAMEORIGIN",
        handler: /X-Frame-Options: (SAMEORIGIN|DENY)/i
      }
    ]
  },
  {
    description: "Have you ensured that the Internet Explorer content sniffer is disabled?",
    tests: [
      {
        command: "curl -s -I https://%s | grep '^X-Content'",
        expect: "X-Content-Type-Options: nosniff",
        handler: "X-Content-Type-Options: nosniff"
      }
    ]
  },
  {
    description: "Do all assets delivered via a content delivery network include subresource integrity hashes?",
    tests: [
      {
        command: "curl https://%s",
        expect: '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css" integrity="sha384-y3tfxAZXuh4HwSYylfB+J125MxIs6mR5FOHamPBG064zB+AFeWH94NdvaCBm8qnd" crossorigin="anonymous">',
        handler: function (output) {
          var result = true;
          var assets = output.match(/(<link(.*)>)|(<script(.*)>)/i);
          assets.forEach(function (asset) {
            if (/href="(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?"/i.test(asset))
              if (!/integrity=(.*)/i.test(asset))
                result = false;
          });
          return result;
        }
      }
    ]
  },
  {
    description: "Do session cookies have the 'Secure' and 'HttpOnly' flag set?",
    tests: [
      {
        command: "curl -s -I %s | grep '^Set-Cookie'",
        expect: "Set-Cookie: ****;Path=/;Expires=Fri, 16-Mar-2018 19:18:51 GMT;Secure;HttpOnly;Priority=HIGH",
        handler: function (output) {
          if (output.length)
            return /(;\s*secure)|(;\s*httponly)/i.test(output)
          else
            return false;
        }
      }
    ]
  }
];