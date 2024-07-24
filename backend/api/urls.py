from django.urls import path
from . import views

urlpatterns = [
    # path("demo/", views.DemoListCreate.as_view(), name = "demo-list"),
    path("pets/", views.PetListCreate.as_view(), name = "pets"),
    path("pets-update/<int:pk>/", views.PetUpdate.as_view(), name = "edit-pet"),
    path("pets/<int:pk>/",views.PetIndivisual.as_view(), name = "pet-list" ),
    path("pets-delete/<int:pk>/",views.PetDelete.as_view(), name = 'pet-delete'),
    # path("pets/delete/<int:pk>/",views.PetListCreate.as_view(), name = "pet-delete" ),
    path("appointments/", views.AppoinmentListCreate.as_view(), name= "appointment-user-view"),
    path("appointments/<int:pk>", views.AppointmentIndivisualView.as_view(), name= "appointment-view"),
    path("services/", views.ServiceView.as_view(), name="service-list"),
    path("services/<int:pk>", views.ServiceIndivisualView.as_view()),
    path("time/",views.ShiftView.as_view(), name = "time-list"),
    # path("profiles/",views.CreateProfileView.as_view(), name = "profile-create"),
    path("profiles/",views.ProfileView.as_view(), name = "profile"),
    path("profile-update/<int:pk>/",views.ProfileUpdate.as_view(), name = "profile-update"),
    path("results/",views.ResultView.as_view(), name = "result-view"),
    path("results/<int:pk>",views.ResultIndivisualView.as_view(), name = "result-retrieve"),
    path("updatePassword/",views.UpdatePasswordView.as_view(), name= "update-password")
    # path("Employees/", views.EmployeeListCreate.as_view(), name= "employee-list")
    
    
]