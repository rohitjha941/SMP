# Student Mentorship Program

Official Portal of SMP IIT Roorkee

## Boiler Plate for Django - React app

- Clone this Repository
- Install yarn [<https://linuxize.com/post/how-to-install-yarn-on-ubuntu-18-04/]>
- Install python
- Install pip [<https://linuxize.com/post/how-to-install-pip-on-ubuntu-18.04/]>
- Install virtualenvironment

```sh
- sudo pip3 install virtualenv
```

- Setup Postgres [<https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04>]

## Setup Backend

- Create a virtual environment

```sh
- cd backend/
- virtualenv env
- source env/bin/activate
```

- Install requirements

```sh
- pip3 install -r r.txt
```

- Apply Migrations

```sh
- ./manage.py migrate
```

- Generate Admin Credentials

```sh
- ./manage.py createsuperuser
```

- Create config.yml file similar to config.sample and fill it accordingly

```sh
- cp config.sample config.yml
```

- Run the backend server

```sh
- ./manage.py runserver
```

- Import all the sample databases ( from /backend/SampleDatabase )
  into your local database [localhost:8000/backend/admin]

## Setup Frontend

- In a new shell run the following commands

```sh
- cd frontend/
- yarn install
```

- Make a .env file as .env.example

```sh
- cp .env.example .env
```

- run frontend server

```sh
- yarn start
```

## Google Sigin Setup

- follow the instructions to setup OAuth Credentials [https://developers.google.com/identity/sign-in/web/sign-in]
- Set the Authorized URI as https://smp.iitr.ac.in (for prod) or http://localhost:3000 (for dev)
- Use the client id generated here for GAPI in react and django environment files.

## Recaptcha Setup

- Fill this form to generate credentials for recaptcha [https://www.google.com/recaptcha/admin/create]
- Select version recaptcha V2
- Now add these site and secret keys in react and django environment files respectively.

## Additional development instructions

### Install pre-commit

```sh
pip install pre-commit
pre-commit install
```

Now git hooks will be activated.
Every commit will be validated for code style and linting errors.
