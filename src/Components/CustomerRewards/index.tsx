import { useContext } from "react"
import { TransactionsContext } from "../../Contexts/Transactions"
import { CellValue, Column, CustomerRewardsMap } from "../../Types"
import PointsCalculator from "../../Utils/PointsCalculator"
import Table from "../Table"

export default function CustomerRewards() {
    const {getTransactions} = useContext(TransactionsContext)

    const getRewards = () => {
        const rewards: CustomerRewardsMap = {}
        getTransactions().forEach(t => {
            if (!rewards[t.customer]) {
                rewards[t.customer] = {
                    customer: t.customer,
                    transactions: 0,
                    rewards: 0,
                    expenditure: 0
                }
            }

            rewards[t.customer].transactions += 1
            rewards[t.customer].expenditure += t.value
            rewards[t.customer].rewards += PointsCalculator.calculate(t.value)
        })

        return rewards
    }

    const getRows = () => {
        const rewards: CustomerRewardsMap = getRewards()
        return Object.keys(rewards).map((r): Array<CellValue> => {
            const row = rewards[r]
            return [{
                column: 'customer',
                value: row.customer
            },
            {
                column: 'transactions',
                value: row.transactions
            }, {
                column: 'expenditure',
                value: row.expenditure
            }, {
                column: 'rewards',
                value: row.rewards
            }]
        })
    }

    const getColumns = (): Array<Column> => {
        return [
            {
                id: 'customer',
                title: 'Customer',
             },
             {
                 id: 'transaction',
                 title: 'Transaction'
             },
             {
                 id: 'expenditure',
                 title: 'Expenditure'
             },
             {
                 id: 'rewards',
                 title: 'Rewards'
             }
        ]
    }

    return (
        <div className="CustomerRewards">
            <Table columns={getColumns()} rows={getRows()} />
        </div>
    )
}
