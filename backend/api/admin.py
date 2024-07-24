from django.contrib import admin
from django.contrib.auth.models import User
from .models import *
# Register your models here.


# admin.site.register(Appointment)

# admin.site.register(Status)

# admin.site.register(Result)
# admin.site.register(Doctor)
admin.site.register(Veterinary)

admin.site.unregister(User)

class ProfileInline(admin.StackedInline):
    model = Profile
class PetInline(admin.StackedInline):
    model = Pet
    
class UserAdmin(admin.ModelAdmin):
    model = User
    fields = ["username", "password", "groups", "is_staff"]
    list_display = ["username", "is_staff"]
    list_filter = ["groups", "is_staff"]
    inlines = [ProfileInline, PetInline]
admin.site.register(User,UserAdmin)
class ShiftAdmin(admin.ModelAdmin):
    model = Shift
    fields = ["shift_name", "time"]
    list_display = ["shift_name", "time"]
    list_filter = ["time", ]
admin.site.register(Shift, ShiftAdmin)

class ServiceAdmin(admin.ModelAdmin):
    model = Service
    fields = ["service_name", "price"]
    list_display = ["service_name", "price"]
    search_fields = ("service_name",)
admin.site.register(Service, ServiceAdmin)

class PetAdmin(admin.ModelAdmin):
    model = Pet
    fields = ["pet_name", "animal_type", "breed", "gender", "date_of_birth", "fixed", "owner", "verified"]
    list_display = ["pet_name", "animal_type", "owner", "fixed", "created_at"]
    list_filter = ("gender", "fixed", "verified")
    search_fields = ('pet_name',)
    list_display_links = ("owner","pet_name")
admin.site.register(Pet, PetAdmin)


class ProfileAdmin(admin.ModelAdmin):
    model = Profile
    fields = ["user", "name", "email", "phone"]
    list_display = ["user", "name", "email", "phone"]
    search_fields=('name',)
    # inlines = [PetInline]
admin.site.register(Profile, ProfileAdmin)

class ResultInLine(admin.StackedInline):
    model = Result

class AppointmentResult(admin.ModelAdmin):
    model = Appointment
    fields = ["title","pet_id", "date","time", "service", "status", "phone", "estimated_price", "note"]
    inlines = [ResultInLine]
    list_display = ("title","pet_id", "date", "time", "note", "service", "owner", "status", "date_created", "phone")
    list_filter = ("date_created", "time", "service", "status")
    search_fields = ("title","phone", "pet_id")
    list_display_links = ("owner","pet_id","title")
admin.site.register(Appointment, AppointmentResult)

class ResultAdmin(admin.ModelAdmin):
    model = Result
    fields = ["title", "owner", "appointment", "doctor_note", "addition_fee"]
    list_display = ["title", "owner", "appointment"]
    search_fields = ("title","appointment",)
admin.site.register(Result, ResultAdmin)