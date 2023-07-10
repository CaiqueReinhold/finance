from core.email import send_transactional_email
from worker import app

from .models import EmailValidationCode


@app.task
async def send_email_validation_code(email_code_id: int):
    evc = (
        await EmailValidationCode.filter(id=email_code_id)
        .values("request_code", "account__email")
        .first()
    )
    await send_transactional_email(
        to=evc["account__email"],
        template_id="email_activation",
        template_data={"code": evc["request_code"], "email": evc["account__email"]},
        subject="Activate your account",
        sender="noreply@mypenny.info",
    )
