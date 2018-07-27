FROM ubuntu:16.04


RUN apt-get update && \
    apt-get install -y libfontconfig curl sudo openssl bzip2 && \
    curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
    apt-get install -y --no-install-recommends libfontconfig nodejs && \
    apt-get clean -y && \
    rm -rf \
   /var/cache/debconf/* \
   /var/lib/apt/lists/* \
   /var/log/* \
   /tmp/* \
   /var/tmp/*

RUN groupadd -g 1002 pdf_gen && \
		useradd -u 1002 -g pdf_gen -m -d /home/pdf_gen pdf_gen

USER pdf_gen


COPY --chown=pdf_gen:pdf_gen  app_files/* /home/pdf_gen/

RUN cd /home/pdf_gen && \
    /usr/bin/npm install


WORKDIR /home/pdf_gen

CMD nodejs ./server.js
