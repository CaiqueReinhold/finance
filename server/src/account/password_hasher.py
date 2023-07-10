import base64
import hashlib
import math
import secrets

RANDOM_STRING_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"


def get_random_string(length, allowed_chars=RANDOM_STRING_CHARS) -> str:
    return "".join(secrets.choice(allowed_chars) for i in range(length))


class PBKDF2Hasher:
    algorithm = "pbkdf2_sha256"
    iterations = 480000
    digest = hashlib.sha256
    salt_entropy = 128

    def _salt(self) -> str:
        char_count = math.ceil(self.salt_entropy / math.log2(len(RANDOM_STRING_CHARS)))
        return get_random_string(char_count)

    def _pbkdf2(self, password: str, salt: str, iterations: int) -> bytes:
        return hashlib.pbkdf2_hmac(
            self.digest().name,
            password.encode("utf-8"),
            salt.encode("utf-8"),
            iterations,
        )

    def _hash(self, password: str, salt: str, iterations: int) -> str:
        return base64.b64encode(self._pbkdf2(password, salt, iterations)).decode(
            "ascii"
        )

    def hash_password(self, password: str) -> str:
        salt = self._salt()
        password_hash = self._hash(password, salt, self.iterations)
        return f"{self.algorithm}:{salt}:{self.iterations}:{password_hash}"

    def verify(self, password: str, hashed: str) -> bool:
        _, salt, iterations, password_hash = hashed.split(":")
        return secrets.compare_digest(
            self._hash(password, salt, int(iterations)).encode("ascii"),
            password_hash.encode("ascii"),
        )
