from django.db import models
from django.contrib.auth.models import User
from datetime import date
from django.db.models.signals import post_save
from django.dispatch import receiver


# class Demo(models.Model):
#     title = models.CharField(max_length=50)
#     content = models.TextField()
#     owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name= "demos")

#     def __str__(self):
#         return self.title

class Profile (models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200, blank=True, null=True)
    phone = models.CharField(max_length=15 )
    date_joined = models.DateTimeField(auto_now_add= True)

    def __str__(self):
        return self.user.username
    
    
    
@receiver(post_save, sender= User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user = instance)
    
class Service (models.Model):
    service_name = models.CharField(max_length=500)
    price = models.FloatField()
    

    def __str__(self):
        return self.service_name
    

    
class Veterinary (models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    doctor_name = models.CharField(max_length=200)
    speciality = models.CharField(max_length=200)
    phone = models.CharField(max_length=15)
    doctor_image = models.ImageField(default="uploads/pet_images/default.png", upload_to="uploads/doctors/")
    experience = models.TextField()
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.doctor_name
    
@receiver(post_save, sender= User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Veterinary.objects.create(user = instance)

class Shift (models.Model):
    time = models.TimeField(default=1)
    shift_name = models.CharField(max_length=50)
    

    def __str__(self):
        return self.shift_name
class Pet(models.Model):
    options = (
        ('unverified', "Unverified"),
        ('verified', "Verified")
    )
    pet_name = models.CharField(max_length= 100)
    animal_type = models.CharField(max_length= 500)
    breed = models.CharField(max_length= 500, null= True)
    # age = models.IntegerField( null= True)
    gender = models.CharField(max_length=10, default= "Unindentified")
    # weight = models.FloatField(null= True)
    # length = models.FloatField(null= True)
    date_of_birth = models.CharField(null= True, blank=True, max_length=50)
    fixed = models.CharField(max_length=10, default="No")
    file = models.ImageField(default="uploads/pet_images/default.png", upload_to="uploads/pet_images/", blank=True)
    created_at = models.DateTimeField(auto_now_add= True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name= "pets")
    verified = models.CharField(choices= options, default= "unverified", max_length=50)

    def __str__(self):
        return self.pet_name
    @property
    def user_name(self):
        return self.owner.username

class Appointment (models.Model):

    options = (
        ("pending", "Pending"),
        ("inprocess","In-Process"),
        ("canceled", "Canceled"),
        ("complete", "Completed")
    )
    title = models.CharField(max_length=50)
    date = models.CharField(max_length=100, default="Today")
    time = models.ForeignKey(Shift, on_delete=models.CASCADE, default = 1)
    note = models.TextField(null=True, blank = True)
    service = models.ForeignKey(Service, on_delete= models.CASCADE, default=1)
    pet_id = models.ForeignKey(Pet, on_delete= models.CASCADE, default=1)
    status = models.CharField(choices=options, default="pending", max_length=50)
    date_created = models.DateTimeField(auto_now_add= True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    phone = models.CharField(max_length=15, default="0")
    estimated_price = models.FloatField(default="0")

    def __str__(self):
        return self.title
    
    class Meta:
        unique_together = (('date', 'time'))
    

class Result(models.Model):
    title = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete= models.CASCADE, default=1)
    appointment = models.OneToOneField(Appointment, on_delete=models.CASCADE, related_name="appointment_result")
    doctor_note = models.TextField(null=True, blank=True)
    addition_fee = models.FloatField(default="0", blank=True)

    def __str__(self):
        return self.title
    
@receiver(post_save, sender= Appointment)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Result.objects.create(appointment = instance)


class Anonymous (models.Model):
    options = (
        ("pending", "Pending"),
        ("inprocess","In-Process"),
        ("canceled", "Canceled"),
        ("complete", "Completed")
    )
    title = models.CharField(max_length=50)
    date_created = models.DateTimeField(auto_now_add = True)
    date = models.CharField(max_length=100, default="Today")
    time = models.CharField(max_length=50, default="7:00:00")
    status = models.CharField( choices= options, default="pending", max_length=50)
    note = models.TextField(null=True, blank= True)
    service = models.ForeignKey(Service, on_delete=models.CASCADE, default=1)
    phone = models.CharField(max_length=15)
    email = models.EmailField(null=True, blank=True)

    def __str__(self):
        return self.title

class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField(default=1)
    Category = models.ForeignKey(Category, on_delete=models.CASCADE, default=1)
    description = models.CharField(max_length=250, default="", blank=True, null= True)
    image = models.ImageField(upload_to='uploads/products/')

    def __str__(self):
        return self.name
    
class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE) 
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    address = models.CharField(max_length=100, default='', blank=True, null=True)
    phone = models.CharField(max_length=15)
    date = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=False)

    def __str__(self):
        return self.product