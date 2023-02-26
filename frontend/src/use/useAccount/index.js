import { reactive, computed } from "vue"

import app from "@/feathers-client"

const accountState = reactive({
    accountListReady: false,
    accounts: {},
 })

function changeByAmount(IdAccount, amount) {
    app.service('account').find({query: {id: IdAccount, $select: ['account_balance']}}).then(list => {
        const balance = list[0].account_balance
        let newBalance = parseFloat(balance) + parseFloat(amount)
        console.log(newBalance)

        app.service('account').patch(IdAccount, {account_balance: newBalance})
    })
}

 const accountExist = async (mail, password) => {
    const query = { query: { mail, password }}
    const list = await app.service('account').find(query)
    let account = {id: -1}
    list.forEach(item => { account = item })
    console.log(account)
    return account
 }

 const accountList = computed((mail, password) => {
    if (!accountState.accountListReady) {
     app.service('account').find({ query: { mail, password }}).then(list => {
          list.forEach(item => { accountState.accounts[item.id] = item })
          accountState.accountListReady = true
       })
       return []
    }
    return Object.values(accountState.accounts)
 })


const addAccount = (data) => {
    app.service('account').create(data).then((account) => {
        app.service('command').create({id_account: account.id})
    })
}

export function useAccount() {
    return {
        addAccount, accountList, accountExist, changeByAmount
    }
}
