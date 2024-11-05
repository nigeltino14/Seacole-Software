FROM python:3.11-slim
ENV PYTHONUNBUFFERED 1
ENV DJANGO_ENV dev
RUN apt-get update --fix-missing
RUN apt-get -y upgrade 
WORKDIR /srv/backend
COPY ./backend /srv/backend
RUN pip install -r /srv/backend/requirements.txt

ENTRYPOINT ["/usr/bin/supervisord", "-c", "/srv/backend/supervisor.conf"]
