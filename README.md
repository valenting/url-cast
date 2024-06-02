This tool uses the [nodecastor library](https://github.com/vincentbernat/nodecastor) and the [URL cast receiver](https://github.com/demille/url-cast-receiver) to provide a simple to use script that makes your chromecast load a webpage.
Just pass it the chromecast's IP and a URL.

`node cast.js <IP> <URL>`

Remember to run `npm install` to download the dependencies.

If you encounter this build error:
```
npm ERR! In file included from ../src/dns_sd.cpp:1:
npm ERR! ../src/mdns.hpp:32:10: fatal error: dns_sd.h: No such file or directory
npm ERR!    32 | #include <dns_sd.h>
```

Then you should make sure to install the following deps:
```
# Debian
sudo apt-get install libavahi-compat-libdnssd-dev
# Fedora
sudo dnf install avahi-compat-libdns_sd-devel
# MacOS
xcode-select --install
```
