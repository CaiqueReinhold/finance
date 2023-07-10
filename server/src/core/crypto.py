import os
from typing import Tuple

from cryptography.hazmat.primitives import hashes, padding
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes


def encrypt(data: bytes, key: str) -> Tuple[bytes, bytes]:
    iv = os.urandom(16)
    sha256 = hashes.Hash(hashes.SHA256())
    sha256.update(key.encode("utf-8"))
    keyhash = sha256.finalize()

    padder = padding.PKCS7(128).padder()
    data = padder.update(data) + padder.finalize()

    cipher = Cipher(algorithms.AES(keyhash), modes.CBC(iv))
    encryptor = cipher.encryptor()
    message = encryptor.update(data) + encryptor.finalize()

    return message, iv


def decrypt(data: bytes, key: str, iv: bytes) -> bytes:
    sha256 = hashes.Hash(hashes.SHA256())
    sha256.update(key.encode("utf-8"))
    keyhash = sha256.finalize()

    cipher = Cipher(algorithms.AES(keyhash), modes.CBC(iv))
    decryptor = cipher.decryptor()
    message = decryptor.update(data) + decryptor.finalize()

    unpadder = padding.PKCS7(128).unpadder()
    message = unpadder.update(message) + unpadder.finalize()

    return message
