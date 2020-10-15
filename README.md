# Student Mentorship Program

Official Portal of SMP IIT Roorkee

## Boiler Plate for Django - React app

- Clone the Repository
- Install yarn [<https://linuxize.com/post/how-to-install-yarn-on-ubuntu-18-04/]>
- Install python
- Install pip [<https://linuxize.com/post/how-to-install-pip-on-ubuntu-18.04/]>
- Install virtualenvironment
- Setup Postgres [<https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04>]

```sh
- sudo pip3 install virtualenv
```

## Backend

- Setup Backend

```sh
- cd backend/
- virtualenv myenv
- source myenv/bin/activate
```

- Install requirements

```sh
- pip3 install -r r.txt
```

- Create Admin

```sh
- python manage.py createsuperuser
```

- Create Config File named config.yml file and populate it as config.sample

- Import all the sample databases ( from /backend/SampleDatabase )
  into your local database [localhost:8000/backend/admin]
- Configure your username and password for sending mail in backend/backend/settings.py
- Run the backend server

```sh
- python manage.py runserver
```

## Frontend

- Setup Frontend
- In a new shell

```sh
- cd frontend/
- yarn install
```

- Make a .env file as .env.sample
- run frontend server

```sh
- yarn start
```

## Additional development instructions

### Install pre-commit

```sh
pip install pre-commit
pre-commit install
```

Now git hooks will be activated.
Every commit will be validated for code style and linting errors.
