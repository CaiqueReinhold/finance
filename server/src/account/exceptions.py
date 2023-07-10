from core.exceptions import ValidationError


class InvalidCredentials(ValidationError):
    pass


class AuthRequiredError(Exception):
    pass
