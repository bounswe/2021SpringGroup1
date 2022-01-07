# System manual for deploying Protopost API #
 
## System Requirements ##
    
   - git (You can download it from https://git-scm.com/)
   - Docker (Installation explained below)
   - docker-compose (Installation explained below)

### Note ### 

This manual is written and tested for deployment on a AWS Linux instance. (Ubuntu 20.04)

## Prerequisites ##
To install Docker, run:
- ```curl -fsSL https://get.docker.com -o get-docker.sh```
- ```sudo sh get-docker.sh```

To correctly setup permissions for Docker, run:
- ```sudo groupadd docker```
- ```sudo usermod -aG docker $(whoami)```
- ```sudo service docker start```

To install and setup docker-compose, run:
- ```sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose```
- ```sudo chmod +x /usr/local/bin/docker-compose```

## Installation and deployment instructions ##
First, clone our repository with the command:
- ```git clone https://github.com/bounswe/2021SpringGroup1```

Now enter to our Backend folder:
- ```cd 2021SpringGroup1/cmpe451```

To setup images and containers first copy the template Docker files:
- ```cp -a DeploymentFiles/. .```

Now, edit the docker-compose.yml (sudo nano docker-compose.yml) and:
- Change ```MYSQL_DATABASE: 'testdb'```
- Change ```MYSQL_USER: 'cmpe451user'```
- Change ```MYSQL_PASSWORD: 'bounswe2021'```
- Change ```MYSQL_ROOT_PASSWORD: 'bounswe2021'```

Enter to the project configuration folder "cmpe451" (not to be confused with the base folder "cmpe451"), with:
- ```cd cmpe451```
Now, create the .env file with:
- ```sudo nano .env```
And enter:
```
MYSQL_DATABASE="testdb"
MYSQL_USER="cmpe451user"
MYSQL_PASSWORD="bounswe2021"
MYSQL_ROOT_PASSWORD="bounswe2021"
MYSQL_HOST="db"
```

Also, add your instance IP to the ALLOWED_HOSTS variable in settings.py, so:
- ```sudo nano settings.py```
- Edit the necessary line to ```ALLOWED_HOSTS= [<some_ips> ... ,  <your-instance-ip>]```

Now return to the parent folder with "cd .." and run:
- ```sudo docker-compose up -d```
Sometimes, database initialization could not catch up to the app, so server may crash during the start phase. If server does not work, then run:
- ```sudo docker-compose up```
If you see the server running, exit with Ctrl+Z. If not, try again the same thing.

After server is running, run the commands below to setup the database:
- ```sudo docker-compose run backend python manage.py makemigrations protopost```
- ```sudo docker-compose run backend python manage.py makemigrations ActivityStream```
- ```sudo docker-compose run backend python manage.py migrate```
- ```sudo docker-compose run backend python manage.py loaddata demo_db.json```

After these, enter to [http://<your-instance-ip>:8000/api/schema/swagger-ui/#/]() and check if your server is running correctly.

If you can see the Swagger page of the API, congratulations, you successfully deployed the API!

