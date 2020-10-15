import re

from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _


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
            _('%(value)s should be a institute email address (.iitr.ac.in)'),
            params={'value': value}
        )
