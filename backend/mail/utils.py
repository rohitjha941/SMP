from django.template import loader

from backend.settings import DEFAULT_FROM_EMAIL, SEND_EMAIL_TO, EMAIL_HOST_PASSWORD, RECEIVER_NAME

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


def mail_raised_query(data):
    query_id = data['id']
    query_content = data['query']
    query_name = data['name']
    query_email = data['email']
    subject = subject = '#{} Query raised from smp.iitr.ac.in'.format(query_id)
    message = Mail(
        from_email=DEFAULT_FROM_EMAIL,
        to_emails=SEND_EMAIL_TO,
        subject=subject,
        html_content=loader.render_to_string(
            'mail_template/raise_query.html',
            {
                'receiver_name': RECEIVER_NAME,
                'query_name': query_name,
                'query_content': query_content,
                'query_email': query_email,
                'query_id': query_id
            }
        )
    )
    try:
        sg = SendGridAPIClient(EMAIL_HOST_PASSWORD)
        sg.send(message)
    except Exception as e:
        print(e.message)
