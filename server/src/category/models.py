from tortoise import fields, models


class Category(models.Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=255)
    color = fields.CharField(max_length=7)
    account = fields.ForeignKeyField("account.Account", on_delete=fields.CASCADE)

    class Meta:
        table = "category"
