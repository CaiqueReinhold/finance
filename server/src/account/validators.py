import re

EMAIL_REGEX = re.compile(r"^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$")


def validate_name(name: str) -> str:
    assert len(name) >= 3, "Name must be at least 3 character long"
    return name.strip().capitalize()


def validate_email(email: str) -> str:
    assert EMAIL_REGEX.fullmatch(email.strip()) is not None, "Invalid email"
    return email.strip()


def validate_password(password: str) -> str:
    assert len(password) >= 8, "Password must be at least 8 characters long"
    assert len(password) <= 32, "Password must be at most 32 characters long"
    assert any(
        char.isdigit() for char in password
    ), "Password must contain at least one digit"
    assert any(
        char.isupper() for char in password
    ), "Password must contain at least one uppercase letter"
    assert any(
        char.islower() for char in password
    ), "Password must contain at least one lowercase letter"
    assert not password.isdigit(), "Password must not be all digits"
    return password.strip()


def validate_cpf(cpf: str) -> str:
    assert len(cpf) == 11, "CPF must be 11 characters long"
    return cpf.strip()
