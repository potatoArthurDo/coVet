from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import update_session_auth_hash
from rest_framework import generics
from.serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from .models import *
from rest_framework.response import Response
from rest_framework import  status
# Create your views here.


# class DemoListCreate(generics.ListCreateAPIView):
#     serializer_class = DemoSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         return Demo.objects.filter(owner = user)
    
#     def perform_create(self, serializer):
#         if serializer.is_valid():
#             serializer.save(owner=self.request.user)
#         else:
#             print(serializer.errors)
            
class PetListCreate(generics.ListCreateAPIView):
    serializer_class = PetSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        user = self.request.user
        return Pet.objects.filter(owner = user)
    
    def perform_create(self, request):
        
        serializer = PetSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class PetIndivisual(generics.RetrieveAPIView):
    serializer_class = PetUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Pet.objects.filter(owner = user)

class PetUpdate (generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]

    def update(self, request, pk):
        pet = Pet.objects.get(id = pk)
        serializer = PetSerializer(instance = pet, data = request.data)
        if serializer.is_valid():
            serializer.save(owner = self.request.user)
            return Response(serializer.data)
        
class PetDelete(generics.DestroyAPIView):
    serializer_class = PetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Pet.objects.filter(owner = user)
# class AppoinmentListCreate(generics.ListCreateAPIView):
#     serializer_class = AppointmentSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         return Appointment.objects.filter(owner = user)
    
#     def perform_create(self, serializer):
#         if serializer.is_valid():
#             serializer.save(owner=self.request.user)
#         else:
#             print(serializer.errors)

class AppoinmentListCreate(generics.ListCreateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Appointment.objects.filter(owner = user)
    
    def perform_create(self,serializer):
        pet_id = Pet.objects.get(id = self.request.POST['pet_id'])
        service = Service.objects.get(id = self.request.POST['service'])
        time = Shift.objects.get(id = self.request.POST["time"])
        if serializer.is_valid():
            serializer.save(owner=self.request.user, pet_id = pet_id, service = service, time = time)
        else:
            print(serializer.errors)
class AppointmentIndivisualView(generics.RetrieveAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Appointment.objects.filter(owner = user)

class ResultView(generics.ListAPIView):
    serializer_class = ResultSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Result.objects.filter(owner = user)
    
class ResultIndivisualView(generics.RetrieveAPIView):
    serializer_class = ResultSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Result.objects.filter(owner = user)


class AnonymousAppointment(generics.CreateAPIView):
    queryset = Anonymous.objects.all()
    serializer_class = Anonymous
    permission_classes = [AllowAny]

class ServiceIndivisualView(generics.RetrieveAPIView):
    serializer_class = ServiceSerializer
    def get_queryset(self):
        return Service.objects.all()


# class AnonymousCreate(generics.CreateAPIView):
#     queryset = Anonymous.objects.all()
#     serializer_class = AnonymousSerializer
#     permission_classes = [AllowAny]
    
class ServiceView(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = {AllowAny}

class ShiftView(generics.ListAPIView):
    queryset = Shift.objects.all()
    serializer_class = ShiftSerializer
    permission_classes = [AllowAny]







class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class UpdatePasswordView(generics.UpdateAPIView):
    # queryset = User.objects.all()
    # serializer_class = UserUpdatePasswordSerializer
    permission_classes = [IsAuthenticated]
    
    #in process
    def update(self, request):
        serializer = UserUpdatePasswordSerializer( data = request.data)
        if serializer.is_valid():
            serializer.save(self.request.user)
            update_session_auth_hash(request, serializer.data)
            return Response(serializer.data)
        
class CreateProfileView(generics.CreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]
    def perform_create(self, serializer):
        if serializer.is_valid():
            return serializer.save(user = self.request.user)
        
class ProfileView(generics.ListAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Profile.objects.filter(user = user)
    
class ProfileUpdate (generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]

    def update(self, request, pk):
        profile = Profile.objects.get(id = pk)
        serializer = ProfileUpdateSerializer(instance = profile, data = request.data)
        if serializer.is_valid():
            serializer.save(user = self.request.user)
            return Response(serializer.data)
# class EmployeeListCreate( generics.ListAPIView):
#     queryset = Employee.objects.all()
#     serializer_class = EmployeeSerializer
#     permission_classes = [IsAuthenticated]

    
