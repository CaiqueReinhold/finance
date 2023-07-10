class ValidationError(Exception):
    def __init__(self, *, error_code: str | None = None, detail: str):
        super().__init__()
        self.error_code = error_code
        self.detail = detail
