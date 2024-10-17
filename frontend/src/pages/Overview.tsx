import React from "react"
import classnames from "classnames"
import { Link } from "react-router-dom"

import Icon from "@/components/Icon"
import potIcon from "@/assets/images/icon-pot.svg"

import { formatCurrency } from "@/utils"

import data from "@/data.json"

type SectionProps = {
  title: string,
  detailsPageLink: {
    text: string,
    to: string,
  },
  children: React.ReactNode,
}

const Section = (props: SectionProps) => {
  return (
    <div className="px-20 py-24 bg-white rounded-12 md:p-32">
      <div className="flex justify-between items-center">
        <h2 className="text-20 font-bold">{props.title}</h2>
        <Link to={props.detailsPageLink.to} className="flex items-center">
          <span className="text-14 text-grey-500">{props.detailsPageLink.text}</span>
          <Icon name="caretLeft" className="ml-12 rotate-180 fill-grey-500" />
        </Link>
      </div>
      {props.children}
    </div>
  )
}

const Overview = () => {

  const totalSaved = data.pots.reduce((total, pot) => {
    return total + pot.total
  }, 0)

  return (
    <div>
      <h1 className="text-32 font-bold">Overview</h1>
      <div className="mt-32 md:flex md:gap-x-24">
        {[
          {
            title: "Current Balance",
            amount: data.balance.current,
            color: "dark",
          },
          {
            title: "Income",
            amount: data.balance.income,
            color: "light",
          },
          {
            title: "Expenses",
            amount: data.balance.expenses,
            color: "light",
          },
        ].map((balance, index) => (
          <div
            className={classnames("mt-12 first:mt-0 p-20 rounded-12 md:w-1/3 md:mt-0 md:p-24", {
              "bg-grey-900 text-white": balance.color === "dark",
              "bg-white": balance.color === "light",
            })}
            key={index}
          >
            <p className="text-14">{balance.title}</p>
            <p className="mt-12 text-32 font-bold">{formatCurrency(balance.amount)}</p>
          </div>
        ))}
      </div>
      <div className="lg:flex">
        <div className="mt-32 lg:w-3/5">
          <Section
            title="Pots"
            detailsPageLink={{
              text: "See Details",
              to: "/pots",
            }}
          >
            <div className="mt-20 md:flex">
              <div className="p-16 flex items-center bg-beige-100 rounded-12 md:w-2/5">
                <div className="w-40 h-40 flex justify-center items-center">
                  <img src={potIcon} alt="" />
                </div>
                <div className="ml-16">
                  <p className="text-14 text-grey-500">Total saved</p>
                  <p className="mt-12 text-32 leading-38 font-bold">{formatCurrency(totalSaved, { showDecimals: false })}</p>
                </div>
              </div>
              <div className="mt-20 flex flex-wrap gap-y-16 md:w-3/5 md:mt-0 md:ml-20">
                {data.pots.slice(0, 4).map((pot, index) => (
                  <div className="flex w-1/2" key={index}>
                    <div
                      className="w-4 h-full rounded-full"
                      style={{
                        backgroundColor: pot.theme,
                      }}
                    ></div>
                    <div className="ml-16">
                      <p className="text-12 text-grey-500">{pot.name}</p>
                      <p className="mt-4 text-14 font-bold">{formatCurrency(pot.total, { showDecimals: false })}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>
          <div className="mt-16 lg:mt-24">
            <Section
              title="Transactions"
              detailsPageLink={{
                text: "View All",
                to: "/transactions",
              }}
            >
              <div className="mt-32">
                {data.transactions.slice(0, 5).map((transaction, index) => {
                  const date = new Date(transaction.date)
                  const transactionDate = date.toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                  const sign = transaction.amount > 0 ? "+" : ""

                  return (
                    <div key={index} className="py-20 first:pt-0 last:pb-0 flex justify-between border-t first:border-t-0 border-grey-100">
                      <div className="flex items-center">
                        <img src={transaction.avatar} alt="" className="w-32 aspect-square rounded-full md:w-40" />
                        <p className="ml-16 text-14 font-bold">{transaction.name}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p
                          className={classnames("text-14 font-bold", {
                            "text-green": transaction.amount > 0,
                          })}
                        >
                          {sign}{formatCurrency(transaction.amount)}
                        </p>
                        <p className="mt-8 text-12 text-grey-500">{transactionDate}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Section>
          </div>
        </div>
        <div className="mt-24 lg:w-2/5 lg:ml-24 lg:mt-32">
          <div>
            <Section
              title="Budgets"
              detailsPageLink={{
                text: "See Details",
                to: "/budgets",
              }}
            >
              <div className="mt-20 md:py-24 md:flex">
                <div className="w-full flex items-center md:grow">
                  <div className="max-w-240 w-full aspect-square mx-auto bg-beige-500 rounded-full lg:mx-0"></div>
                </div>
                <div className="shrink mt-16 flex flex-wrap gap-y-16 md:mt-0 md:flex-col md:justify-between lg:ml-16">
                  {data.budgets.slice(0, 5).map((budget, index) => (
                    <div className="flex shrink w-1/2 md:w-full" key={index}>
                      <div
                        className="w-4 h-full rounded-full"
                        style={{
                          backgroundColor: budget.theme,
                        }}
                      ></div>
                      <div className="ml-16">
                        <p className="text-12 text-grey-500">{budget.category}</p>
                        <p className="mt-4 text-14 font-bold">{formatCurrency(budget.maximum, { showDecimals: false })}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Section>
          </div>
          <div className="mt-16 lg:mt-24">
            <Section
              title="Recurring Bills"
              detailsPageLink={{
                text: "See Details",
                to: "/recurring-bills",
              }}
            >
              <div className="mt-32">
                {[
                  {
                    title: "Paid Bills",
                    amount: 190.00,
                    border: "border-green",
                  },
                  {
                    title: "Total Upcoming",
                    amount: 194.98,
                    border: "border-yellow",
                  },
                  {
                    title: "Due Soon",
                    amount: 59.98,
                    border: "border-cyan",
                  },
                ].map((bill, index) => (
                  <div
                    className={`mt-12 first:mt-0 px-16 py-20 flex justify-between border-l-4 ${bill.border} bg-beige-100 rounded-8`}
                    key={index}
                  >
                    <p className="text-14 text-grey-500">{bill.title}</p>
                    <p className="text-14 font-bold">{formatCurrency(bill.amount)}</p>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview