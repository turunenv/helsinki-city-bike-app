FROM alpine:latest

RUN apk update && apk add --no-cache python3 py3-pip

COPY ./dataset /dataset
COPY populate_db.py /

RUN apk add --no-cache unzip

WORKDIR "/dataset/journeys"
RUN unzip -o "*.zip"

WORKDIR "/dataset/stations"
RUN unzip -o "*.zip"

WORKDIR /

RUN touch .env \
  && echo "DB_USER=root" >> .env \
  && echo "DB_PASSWORD=secret_pw" >> .env \
  && echo "HOST=mysql" >> .env


COPY requirements.txt .
RUN pip install -r requirements.txt

CMD ["python3", "populate_db.py"]



