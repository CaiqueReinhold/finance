from tortoise import fields, models


class Transaction(models.Model):
    id = fields.IntField(pk=True)
    account = fields.ForeignKeyField("account.Account", on_delete=fields.CASCADE)
    date = fields.DateField()
    created_at = fields.DatetimeField(auto_now_add=True)
    amount = fields.DecimalField(max_digits=10, decimal_places=2)
    description = fields.CharField(max_length=255)
    type = fields.CharField(max_length=255)
    category = fields.ForeignKeyField("category.Category", on_delete=fields.CASCADE)

    class Meta:
        table = "transaction"
