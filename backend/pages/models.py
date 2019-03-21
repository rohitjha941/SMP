from django.db import models

class Home(models.Model):

    smp_description = models.TextField(
        max_length=1000, 
        default = ""
    )


class HomeVision(models.Model):
    title = models.CharField(
        max_length=1000, 
        default = ""
    )

    description = models.TextField(
        max_length=1000, 
        default = ""
    )
    image = models.ImageField( 
        upload_to="home/",
        blank=True, 
        null=True
    )


class faq(models.Model):

    question = models.CharField(
         max_length=300,
         default = "",
    )

    answer  = models.CharField(
        max_length=1000,
        default= "",
    )

    def __str__(self):
        return self.question


class StudentTeam(models.Model):

    #Field Containing name. 
    name = models.CharField(
        default = "",
        max_length = 100,
    )
    
 

    #Field Containing Images of members 
    photo = models.ImageField(
         upload_to="members/", 
         max_length=200
         )


    #Field Containing Facebook URL
    facebook = models.URLField(
         max_length=1000, 
        db_index=True, 
       
        blank=True
    ) 

    #Field Containing Linkden URL

    linkden = models.URLField(
         max_length=1000, 
        db_index=True, 
        
        blank=True
    ) 

    branch = models.CharField(
        default = "",
        max_length = 100,
    )

    year = models.CharField(
        default = "",
        max_length = 100,
    )

    is_coordinator = models.BooleanField(
        
    )


class branch(models.Model):
    branch_name = models.CharField(
        max_length = 100,
        default = ""
    )
    def __str__(self):
        return self.branch_name




class Mentor(models.Model):
    branch = models.ForeignKey(
        branch,
        related_name = "mentors",
        on_delete = models.CASCADE
    )
    name = models.CharField(
        max_length=1000,
        blank=True, 
        null=True
    )
    photo = models.ImageField(
         upload_to="mentors/", 
         max_length=200
    )

    facebook = models.URLField(
        max_length=1000, 
        db_index=True,        
        blank=True
    ) 
    linkden = models.URLField(
        max_length=1000, 
        db_index=True, 
        blank=True
    ) 

    

     


class ContactDetails(models.Model):
    name = models.CharField(
        default = "",
        max_length = 100,
    )
    photo = models.ImageField(
         upload_to="members/", 
         max_length=200
         )
 
    facebook = models.URLField(
         max_length=1000, 
        db_index=True, 
       
        blank=True
    ) 
    linkden = models.URLField(
         max_length=1000, 
        db_index=True, 
        
        blank=True
    ) 
    branch = models.CharField(
        default = "",
        max_length = 100,
    )

    year = models.CharField(
        default = "",
        max_length = 100,
    )

    mobile = models.CharField(
        default = "",
        max_length = 100,
    )

    email = models.CharField(
        default = "",
        max_length = 100,
    )
   
 