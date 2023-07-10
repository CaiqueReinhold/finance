import os
import smtplib
import time
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formatdate, make_msgid
from typing import Any

import jinja2

import config


async def send_transactional_email(
    *, template_name: str, to: str, subject: str, args: Any, sender: str
) -> None:
    message = MIMEMultipart("mixed")
    message.set_charset("utf-8")
    message["Date"] = formatdate(time.time(), localtime=True)
    message["Message-ID"] = make_msgid()
    message["To"] = to
    message["From"] = sender
    message["Subject"] = subject

    template_path = os.path.join(
        os.path.dirname(os.path.dirname(__file__)), "templates", f"{template_name}.html"
    )
    with open(template_path, "r") as f:
        text = f.read()

    text = jinja2.Template(text).render(**args)

    message.attach(MIMEText(text, _subtype="html", _charset="utf-8"))

    # TODO: implement async version
    with smtplib.SMTP(config.SMTP_HOST, config.SMTP_PORT) as smtp:
        smtp.send_message(message)
