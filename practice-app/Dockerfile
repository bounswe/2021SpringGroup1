FROM python:3.8.5

RUN mkdir cmpeApp

WORKDIR cmpeApp

COPY . .
RUN pip install -r requirements.txt 

EXPOSE 8080

RUN python manage.py makemigrations
RUN python manage.py migrate


CMD ["python","manage.py","runserver","0.0.0.0:8080"]
