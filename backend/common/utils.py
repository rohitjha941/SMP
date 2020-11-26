import requests
import re

from backend.settings import RECAPTCHA_SECRET_KEY


def get_client_ip(request):
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[0]
    else:
        ip = request.META.get("REMOTE_ADDR")
    return ip


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


def is_iitr_email(email):
    org = email.split('@')
    match = None
    if len(org) > 1:
        domain = org[1]
        match = re.findall('iitr.ac.in', domain)
    if match is None or len(match) < 1:
        return False
    return True
