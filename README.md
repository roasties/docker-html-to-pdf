
# Description

https://www.npmjs.com/package/phantom-html-to-pdf in a container. 

Will run on standard port 8447



## To run under apache

Requires proxy and proxy_http modules

	ProxyRequests off
	ProxyPreserveHost On
	ProxyVia Full

  	<Proxy *>
    	Order deny,allow
    	Allow from all
  	</Proxy>

  	<Location /pdf>
	ProxyPass http://localhost:8447
    	ProxyPassReverse http://localhost:8447
  	</Location>


## Example systemd unit file

    [Unit]
    Description=PDF Report Printer
    After=docker.service
    Requires=docker.service

    [Service]
    User=root
    Environment=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/opt/bin
    ExecStartPre=-/usr/bin/docker kill pdf_gen
    ExecStartPre=-/usr/bin/docker rm pdf_gen
    ExecStartPre=/usr/bin/docker pull rbcs/pdf_gen:<version>
    ExecStart=/usr/bin/docker run \
    --name pdf_gen \
    -p 8447:8447 \
    -e NODE_ENV=production \
    rbcs/pdf_gen:<version>
    ExecStop=/usr/bin/docker stop pdf_gen
    TimeoutStartSec=15m
    Restart=on-failure
    RestartSec=10s

    [Install]
    WantedBy=multi-user.target