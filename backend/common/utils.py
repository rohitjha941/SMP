import re
import requests

from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from backend.settings import RECAPTCHA_SECRET_KEY


def get_client_ip(request):
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[0]
    else:
        ip = request.META.get("REMOTE_ADDR")
    return ip


def validate_enroll(value):
    if len(str(value)) != 8:
        raise ValidationError(
            _('%(value)s is not a valid enrollment number'),
            params={'value': value}
        )


def validate_mobile(value):
    if len(str(value)) != 10:
        raise ValidationError(
            _('%(value)s is not a valid mobile number'),
            params={'value': value}
        )

# To validate email as IITR mail


def validate_iitr_email(value):
    org = value.split('@')
    match = None
    if len(org) > 1:
        match = re.findall('iitr.ac.in', org[1])
    if match is None or len(match) < 1:
        raise ValidationError(
            _('%(value)s is not an iitr email'),
            params={'value': value}
        )


def verify_recaptcha(value):
    r = requests.post(
        'https://www.google.com/recaptcha/api/siteverify',
        data={
            'secret': RECAPTCHA_SECRET_KEY,
            'response': value.data['g-recaptcha-response'],
            'remoteip': get_client_ip(value),
        }
    )
    if r.json()['success']:
        return True
    return False
