"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 4.1.2.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

import os

from pathlib import Path
import environ

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "2Q8Td6DOmUDUSe1SvJDh7hQteFbc7N5v2DyDU0DSTvMIK62SIFVVYBqTFJtON8LqRpI"
env = environ.Env()
environ.Env.read_env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/


# SECURITY WARNING: don't run with debug turned on in production!
# settings.py

DEBUG = True


ALLOWED_HOSTS = [
    "seacolehealthsystems.co.uk",
    "www.seacolehealthsystems.co.uk",
    "localhost",
]


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "management",
    "rest_framework",
    "corsheaders",
    "drf_yasg",
    "rest_framework.authtoken",
    "django_rest_passwordreset",
    "storages",
]

CORS_ORIGIN_ALLOW_ALL = True

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"
AUTH_USER_MODEL = "management.User"
LOGIN_REDIRECT_URL = "management:mainmenu"

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

if os.environ.get("DEBUG", "debug") == "debug":

    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": "seacole_staging",
            "USER": "doadmin",
            "PASSWORD": "AVNS_P2v-z3kK_178BxBTvfO",
            "HOST": "seacole-do-user-14823812-0.c.db.ondigitalocean.com",
            "PORT": "25060",
        }
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": os.environ.get("POSTGRES_DB"),
            "USER": os.environ.get("POSTGRES_USER"),
            "PASSWORD": os.environ.get("POSTGRES_PASSWORD"),
            "HOST": os.environ.get("POSTGRES_HOST"),
            "PORT": os.environ.get("POSTGRES_PORT"),
            "OPTIONS": {"sslmode": "require"},
        }
    }

# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/


STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static/")


MEDIA_URL = "/mediafiles/"
MEDIA_ROOT = BASE_DIR / "mediafiles"

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.TokenAuthentication",
    ),
}


CORS_ALLOWED_ORIGINS = [
    "https://seacolehealthsystems.co.uk",
    "http://localhost:3000",
    "https://www.seacolehealthsystems.co.uk",
]

CORS_ORIGIN_WHITELIST = [
    "http://localhost:3000",
    "https://seacolehealthsystems.co.uk",
    "https://www.seacolehealthsystems.co.uk",
]

CRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "https://seacolehealthsystems.co.uk",
    "https://www.seacolehealthsystems.co.uk",
]


SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

USE_SPACES = os.getenv("USE_SPACES") == "true"
if USE_SPACES:
    # settings
    AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
    AWS_STORAGE_BUCKET_NAME = os.getenv("AWS_STORAGE_BUCKET_NAME")
    AWS_DEFAULT_ACL = "public-read"
    AWS_S3_ENDPOINT_URL = "https://seacolesoftwaresolutions.ams3.digitaloceanspaces.com"
    AWS_S3_OBJECT_PARAMETERS = {"CacheControl": "max-age=86400"}
    # static settings
    AWS_LOCATION = "static"
    STATIC_URL = f"{AWS_S3_ENDPOINT_URL}/{AWS_LOCATION}/"
    STATICFILES_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
    AWS_QUERYSTRING_AUTH = False
    PUBLIC_MEDIA_LOCATION = "media"
    MEDIA_URL = f"{AWS_S3_ENDPOINT_URL}/{PUBLIC_MEDIA_LOCATION}/"
    DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
else:
    STATIC_URL = "/static/"
    STATIC_ROOT = BASE_DIR / "/root/Production/Seacole-Software/backend/static/"

if DEBUG == True:
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
else:
    EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"

EMAIL_HOST = os.environ.get("EMAIL_HOST", default="mail.privateemail.com")
EMAIL_PORT = 465
EMAIL_USE_SSL = True
EMAIL_HOST_USER = "nigeltino98@gmail.com"
EMAIL_HOST_PASSWORD = "opsalygeebnzkffb"
SERVER_EMAIL = EMAIL_HOST_USER
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER


FRONTEND_HOST = os.environ.get("FRONTEND_HOST", default="http://localhost:3000")
BACKEND_HOST = os.environ.get("BACKEND_HOST", default="http://localhost:8000")

# LOGGING = {
#     'version': 1,
#     'disable_existing_loggers': False,
#     'handlers': {
#         'file': {
#             'level': 'INFO',
#             'class': 'logging.FileHandler',
#             'filename': '../logs.log',
#         },
#     },
#     'loggers': {
#         'django': {
#             'handlers': ['file'],
#             'level': 'INFO',
#             'propagate': True,
#         },
#     },
# }

# HOST_SCHEME = "http://"
# SECURE_PROXY_SSL_HEADER = None
# SECURE_SSL_REDIRECT = False
# SESSION_COOKIE_SECURE = False
# CSRF_COOKIE_SECURE = False
# SECURE_HSTS_SECONDS = None
# SECURE_HSTS_INCLUDE_SUBDOMAINS = False
# SECURE_FRAME_DENY = False
