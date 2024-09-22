FROM python:3.11-slim

ENV PYTHONUNBUFFERED 1
ENV DJANGO_ENV dev

# install dependencies
RUN apt-get update --fix-missing
RUN apt-get -y upgrade 

COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

# Setup directory structure
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add entrypoint.sh
COPY ./entrypoint.sh /usr/src/app/entrypoint.sh
ENTRYPOINT ["sh", "/usr/src/app/entrypoint.sh"]

COPY . /usr/src/app

# run server
CMD ["/usr/src/app/entrypoint.sh"]