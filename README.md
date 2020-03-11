# Student Mentorship  Program 
Official Portal of SMP IIT Roorkee


# Boiler Plate for Django - React app
- Clone the Repository
- Install yarn [https://linuxize.com/post/how-to-install-yarn-on-ubuntu-18-04/]
- Install python
- Install pip [https://linuxize.com/post/how-to-install-pip-on-ubuntu-18.04/]
- Install virtualenvironment
```sh
- sudo pip3 install virtualenv 
```

# Backend

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

- Import all the sample databases ( from /backend/SampleDatabase ) into your local database [localhost:8000/backend/admin]
- Configure your username and password for sending mail in backend/bankend/settings.py
- Run the backend server
```sh
- python manage.py runserver
```
# Frontend
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


