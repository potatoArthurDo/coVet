from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *
# class DemoSerializer(serializers.ModelSerializer):
#         class Meta:
#             model = Demo
#             fields = ["id","title", "content", "owner"]
#             extra_kwargs = {"owner" : {"read_only" : True}}

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username", "password"]
        # fields = ["id", 'email', "password", "first_name","last_name", "is_staff", "last_login", "date_joined"]
        extra_kwargs = {"password":{"write_only":True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
class UserUpdatePasswordSerializer(serializers.ModelSerializer):
     class Meta:
          model = User
          fields = ["password"]
          extra_kwargs = {"password":{"write_only":True}}
    
class PetSerializer(serializers.ModelSerializer):
     # image = serializers.SerializerMethodField()
     class Meta:
        model = Pet
        fields = ["id", "pet_name", "animal_type","breed","gender","date_of_birth","fixed","file","created_at", "owner", "verified"]
        # fields = ["id","pet_name","animal_type", "breed", "age", "weight", "length", "date_of_birth", "fixed","image", "created_at", "owner"]
        extra_kwargs = {"owner" : {"read_only" : True}}
class PetUpdateSerializer(serializers.ModelSerializer):
     class Meta:
          model = Pet
          fields = ["pet_name", "animal_type", "breed", "gender", "date_of_birth", "fixed", "file", "owner", "created_at"]
          extra_kwargs = {"owner" : {"read_only" : True}}
     # def get_photo_url(self, Pet):
     #    request = self.context.get('request')
     #    photo_url = Pet.photo.url
     #    return request.build_absolute_uri(photo_url)

# class AppointmentSerializer(serializers.ModelSerializer):
#      class Meta:
#           model = Appointment
#           # fields = ["id","title", "date", "time", "note", "service", "pet_id","status","date_created", "owner"]
#           fields = ["id", "title", "owner"]
#           extra_kwargs = {"owner" : {"read_only" : True}}

class AppointmentSerializer(serializers.ModelSerializer):
     # service_name = serializers.RelatedField(source='service', read_only=True)
     class Meta:
          model = Appointment
          # fields = ["id","title", "date", "time", "note", "service", "pet_id","status","date_created", "owner"]
          fields = ["id", "title","date","time","note","service","pet_id", "status", "date_created", "owner","phone"]
          extra_kwargs = {"owner" : {"read_only" : True}, "service" : {"read_only" : True}, "pet_id" : {"read_only" : True}}
class AnonymousSerializer(serializers.ModelSerializer):
     class Meta:
          model = Anonymous
          fields = ["id","title", "date_created", "date", "time", "status", "note", "service", "phone", "email"]

class ResultSerializer(serializers.ModelSerializer):
     class Meta:
          model = Result
          fields = ["id", "title","owner", "appointment", "doctor_note", "addition_fee"]
          extra_kwargs = {"owner" : {"read_only" : True}}
class ServiceSerializer(serializers.ModelSerializer):
     class Meta:
          model = Service
          fields = ["id", "service_name", "price"]

class ShiftSerializer(serializers.ModelSerializer):
     class Meta:
          model = Shift
          fields = ["id", "time", "shift_name"]
          extra_kwargs = {"time" : {"read_only" : True}}
class ProfileSerializer(serializers.ModelSerializer):
     class Meta:
          model = Profile
          fields = ["id", "user", "name", "email", "phone", "date_joined"]
          extra_kwargs = {"user" : {"read_only" : True}}
class ProfileUpdateSerializer(serializers.ModelSerializer):
     class Meta:
          model = Profile
          fields = [ "name", "email", "phone", "date_joined"]
          extra_kwargs = {"user" : {"read_only" : True}}
class ResultSerializer(serializers.ModelSerializer):
     class Meta:
          model = Result
          fields = ["id","title", "owner", "appointment", "doctor_note", "addition_fee"]
          extra_kwargs = {"owner" : {"read_only" : True}}

# class EmployeeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Employee
#         fields = "__all__"

# class ServiceSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Service
#         fields = "__all__"

# class ScheduleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Schedule
#         fields = "__all__"

# class AppointmentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Appointment
#         fields = "__all__"

# class service_booked_Serializer(serializers.ModelSerializer):
#     class Meta:
#         model = service_booked
#         fields = "__all__"

# class service_provided_Serializer(serializers.ModelSerializer):
#     class Meta:
#         model = service_provided
#         fields = "__all__"