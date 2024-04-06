FROM ubuntu:20.00

RUN apt-get update 
RUN apt-get -y upgrade
RUN apt-get install -y \
    curl \
    wget \
    git \
    vim \
    emacs \
    locales \
    build-essential \
    python3.10 \
    python3.10-dev \
    python3-pip \
    tidy

# Set the locale
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

# MongoDB
RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | apt-key add -
RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" > /etc/apt/sources.list.d/mongodb-org-4.2.list
RUN mkdir -p /data/db
RUN apt-get update

RUN apt-get install -y mongodb-org

ADD init.d-mongod /etc/init.d/mongod
RUN chmod u+x /etc/init.d/mongod

# Python
# Instalar paquetes de Python
# Instalar paquetes de Python
RUN apt-get install -y \
    build-essential \
    zlib1g-dev \
    libncurses5-dev \
    libgdbm-dev \
    libnss3-dev \
    libssl-dev \
    libreadline-dev \
    libffi-dev \
    libsqlite3-dev

# Installing Python Packets
RUN pip3 install \
    pycodestyle==2.5 \
    mypy \
    flask \
    flask_babel \
    flask-cors \
    pytz \
    requests \
    beautifulsoup4 \
    parameterized \
    bs4 \
    fastapi \
    pandas \
    pydantic \
    uvicorn

# W3C validator
RUN curl -o "/usr/bin/w3c_validator.py" "https://raw.githubusercontent.com/holbertonschool/W3C-Validator/master/w3c_validator.py"
RUN chmod u+x "/usr/bin/w3c_validator.py"
RUN apt-get install -y tidy

# Node JS
RUN curl -sl https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh

RUN apt-get update && apt-get install -y nodejs

RUN mkdir /tmp/node_packages
COPY package.json /tmp/node_packages/package.json
RUN cd /tmp/node_packages && npm install

# Create test user
RUN useradd -M correction_tester

# Keep the container running indef 
CMD ["tail", "-f", "/dev/null"]