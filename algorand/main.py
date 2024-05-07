from algokit_utils.beta.algorand_client import (
    AlgorandClient,
    AssetCreateParams,
    AssetOptInParams,
    AssetTransferParams,
    PayParams,
)

algorand = AlgorandClient.default_local_net()

dispenser = algorand.account.dispenser()
# print(dispenser.address)

creator = algorand.account.random()
# print(creator.address)

algorand.send.payment(
    PayParams(
        sender=dispenser.address,
        receiver=creator.address,
        amount=10_000_000
    )
)
# print(algorand.account.get_information(creator.address))

sent_txn = algorand.send.asset_create(
    AssetCreateParams(
        sender=creator.address,
        total=333,
        asset_name="BUILDH3R",
        unit_name="HER"
    )
)

asset_id = sent_txn["confirmation"]["asset-index"]
# print(asset_id)

receiver_accts = [algorand.account.random() for _ in range(3)]

for acct in receiver_accts:
    algorand.send.payment(
        PayParams(
            sender=dispenser.address,
            receiver=acct.address,
            amount=10_000_000
        )
    )

    algorand.send.asset_opt_in(
        AssetOptInParams(
            sender=acct.address,
            asset_id=asset_id
        )
    )

    asset_transfer = algorand.send.asset_transfer(
        AssetTransferParams(
            sender=creator.address,
            receiver=acct.address,
            asset_id=asset_id,
            amount=111,
            last_valid_round=100 
        )
    )

    print(algorand.account.get_information(acct.address))
   