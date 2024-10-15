import React, { ReactPropTypes, useState } from "react"
import classnames from "classnames"

import logoLarge from "./assets/images/logo-large.svg"
import logoSmall from "./assets/images/logo-small.svg"
import minimizeIcon from "./assets/images/icon-minimize-menu.svg"
import potIcon from "./assets/images/icon-pot.svg"

import data from "./data.json"

const icons = {
  home: (className:string) => <svg className={className} fill="none" height="19" viewBox="0 0 18 19" width="18" xmlns="http://www.w3.org/2000/svg"><path d="m18 8.59282v8.66718c0 .3978-.158.7794-.4393 1.0607s-.6629.4393-1.0607.4393h-3.75c-.3978 0-.7794-.158-1.0607-.4393s-.4393-.6629-.4393-1.0607v-3.75c0-.1989-.079-.3897-.2197-.5303-.1406-.1407-.3314-.2197-.5303-.2197h-3c-.19891 0-.38968.079-.53033.2197-.14065.1406-.21967.3314-.21967.5303v3.75c0 .3978-.15804.7794-.43934 1.0607s-.66284.4393-1.06066.4393h-3.75c-.39782 0-.779356-.158-1.06066-.4393-.281305-.2813-.43933998-.6629-.43933998-1.0607v-8.66718c-.00003156-.20761.04303048-.41295.12646098-.60305.08343-.1901.205412-.36081.358226-.50133l7.500003-7.07625.01031-.010313c.27613-.251125.63597-.3902803 1.00922-.3902803s.73308.1391553 1.00918.3902803c.0032.003669.0067.007114.0103.010313l7.5 7.07625c.1513.14126.2717.3123.3537.50237.082.19006.1237.39503.1226.60201z" /></svg>,
  transactions: (className:string) => <svg className={className} fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="m8.19292 12.9731c.05684.1371.07178.2879.04291.4334s-.10025.2792-.2051.3841l-3 3c-.06966.0698-.15237.1251-.24342.1628-.09105.0378-.18865.0572-.28721.0572s-.19615-.0194-.2872-.0572c-.09105-.0377-.17377-.093-.24342-.1628l-3.000003-3c-.105008-.1048-.176534-.2385-.205522-.3841-.028987-.1456-.014134-.2965.04268-.4336.056815-.1371.153035-.2543.276485-.3367.12344-.0824.26856-.1263.41698-.1262h2.25v-11.24998c0-.19891.07902-.389678.21967-.53033.14066-.140652.33142-.21967.53033-.21967.19892 0 .38968.079018.53033.21967s.21967.33142.21967.53033v11.24998h2.25c.14834 0 .29333.0441.41665.1265s.21943.1996.27617.3366zm8.83778-9.24371-3-2.999995c-.0696-.069732-.1523-.125051-.2434-.162795-.091-.037743-.1886-.05717-.2872-.05717s-.1962.019427-.2872.05717c-.091.037744-.1738.093063-.2434.162795l-3.00002 2.999995c-.10501.1049-.17654.23859-.20552.38415-.02899.14556-.01414.29646.04268.43357.05681.13712.15303.2543.27646.3367.1235.0824.2686.12633.417.12621h2.25v11.24998c0 .1989.079.3897.2197.5303.1406.1407.3314.2197.5303.2197s.3897-.079.5303-.2197c.1407-.1406.2197-.3314.2197-.5303v-11.24998h2.25c.1484.00012.2935-.04381.417-.12621.1234-.0824.2197-.19958.2765-.3367.0568-.13711.0716-.28801.0426-.43357-.0289-.14556-.1005-.27925-.2055-.38415z" /></svg>,
  budgets: (className:string) => <svg className={className} fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m.32038 8.59187c.221475-1.85713.98107-3.60899 2.18531-5.04.13325-.16068.29856-.29177.48537-.38491.18681-.09313.391-.14625.59951-.15595.20851-.00971.41675.02421.61141.09958.19465.07538.37143.19055.51902.33816l2.59407 2.64937c.24982.24925.40292.57919.43194.93089.02902.35171-.06792.70228-.27351.98911-.15572.22092-.273.46656-.34687.72656-.02347.07671-.07091.14388-.13537.19164-.06446.04775-.14253.07357-.22276.07368h-6.074995c-.052937.00008-.105292-.01104-.153622-.03264s-.091539-.05319-.126785-.09268c-.035246-.0395-.06173-.08601-.077711-.13648s-.021095-.10374-.015007-.15633zm10.56002-8.57625c-.2072-.01806747-.4159.0071461-.6128.0740394-.1969.0668936-.37778.1740046-.53109.3145316-.15331.140528-.27573.3114-.35947.501766-.08374.190363-.12698.396063-.12697.604033v3.81282c-.00259.35379.12106.69691.34874.96772.22768.27082.54449.45156.89349.50978.6571.10841 1.2595.43241 1.7121.92093.4527.48852.73 1.11379.7881 1.77727.0581.66349-.1062 1.32739-.4671 1.88719-.3608.5598-.8977.9836-1.526 1.2046-.0731.0269-.1362.0755-.1808.1394s-.0685.1399-.0685.2178v6.1153c-.0004.0531.0105.1057.032.1542.0215.0486.0531.092.0926.1275.0395.0354.0861.0621.1367.0782s.104.0212.1568.0151c2.3399-.2889 4.4967-1.4131 6.0735-3.1658s2.4676-4.016 2.5084-6.37326c.0703-5.08968-3.826-9.431245-8.8697-9.88312zm-1.88815 12.57188c-.41923-.1495-.79993-.3905-1.1145-.7054-.31458-.3149-.55514-.6958-.70425-1.1152-.02556-.0744-.07354-.139-.13733-.185-.0638-.046-.14027-.0711-.21892-.0719h-6.124683c-.053006-.0003-.105481.0106-.153964.032s-.091873.0529-.127308.0923c-.035436.0394-.062111.0859-.078267.1364s-.021425.1038-.015461.1565c.262606 2.1669 1.244093 4.1833 2.787573 5.7268s3.55984 2.525 5.7268 2.7876c.05267.0059.10601.0007.15649-.0155.05049-.0162.09697-.0428.1364-.0783.03942-.0354.07088-.0788.0923-.1273.02143-.0485.03233-.1009.032-.1539v-6.1191c.00015-.0793-.02454-.1567-.07061-.2213-.04608-.0645-.11121-.113-.18627-.1387z" /></svg>,
  pots: (className:string) => <svg className={className} fill="none" height="22" viewBox="0 0 18 22" width="18" xmlns="http://www.w3.org/2000/svg"><path d="m14.25 3.33595v-1.57594c0-.39782-.158-.779356-.4393-1.06066-.2813-.281305-.6629-.43934-1.0607-.43934h-7.5c-.39782 0-.77936.158035-1.06066.43934-.2813.281304-.43934.66284-.43934 1.06066v1.57594c-.84646.17368-1.60711.634-2.15363 1.30332-.54652.66931-.84545 1.50664-.84637 2.37074v10.49999c0 .9946.39509 1.9484 1.09835 2.6517.70326.7032 1.65709 1.0983 2.65165 1.0983h9c.9946 0 1.9484-.3951 2.6517-1.0983.7032-.7033 1.0983-1.6571 1.0983-2.6517v-10.49999c-.0009-.8641-.2999-1.70143-.8464-2.37074-.5465-.66932-1.3071-1.12964-2.1536-1.30332zm-6-1.57594h1.5v1.5h-1.5zm-3 0h1.5v1.5h-1.5zm4.5 14.24999v.75c0 .1989-.07902.3897-.21967.5303-.14065.1407-.33142.2197-.53033.2197s-.38968-.079-.53033-.2197c-.14065-.1406-.21967-.3314-.21967-.5303v-.75h-.75c-.19891 0-.38968-.079-.53033-.2197-.14065-.1406-.21967-.3314-.21967-.5303s.07902-.3897.21967-.5303c.14065-.1407.33142-.2197.53033-.2197h2.25c.19891 0 .3897-.079.5303-.2197.1407-.1406.2197-.3314.2197-.5303s-.079-.3897-.2197-.5303c-.1406-.1407-.33139-.2197-.5303-.2197h-1.5c-.59674 0-1.16903-.237-1.59099-.659s-.65901-.9943-.65901-1.591.23705-1.16902.65901-1.59098.99425-.65901 1.59099-.65901v-.75c0-.19891.07902-.38968.21967-.53033s.33142-.21967.53033-.21967.38968.07902.53033.21967.21967.33142.21967.53033v.75h.75c.1989 0 .3897.07902.5303.21967.1407.14065.2197.33142.2197.53033s-.079.38968-.2197.53033c-.1406.14065-.3314.21966-.5303.21966h-2.25c-.19891 0-.38968.079-.53033.2197-.14065.1406-.21967.3314-.21967.5303s.07902.3897.21967.5303c.14065.1407.33142.2197.53033.2197h1.5c.5967 0 1.169.2371 1.591.659.4219.422.659.9943.659 1.591s-.2371 1.169-.659 1.591c-.422.422-.9943.659-1.591.659zm3-12.74999h-1.5v-1.5h1.5z" /></svg>,
  recurringBills: (className:string) => <svg className={className} fill="none" height="17" viewBox="0 0 20 17" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m18.25.51001h-16.5c-.39782 0-.779356.158035-1.06066.43934-.281305.2813-.43934.66284-.43934 1.06066v14.24999c.000068.1278.032807.2535.095109.3651.062302.1117.152099.2055.260865.2727.108766.0671.232893.1054.360595.1111.127701.0057.254741-.0214.369061-.0786l2.66437-1.3322 2.66437 1.3322c.1042.0522.21911.0793.33563.0793s.23143-.0271.33563-.0793l2.66437-1.3322 2.6644 1.3322c.1042.0522.2191.0793.3356.0793s.2314-.0271.3356-.0793l2.6644-1.3322 2.6644 1.3322c.1143.0572.2413.0843.369.0786s.2519-.044.3606-.1111c.1088-.0672.1986-.161.2609-.2727.0623-.1116.095-.2373.0951-.3651v-14.24999c0-.39782-.158-.77936-.4393-1.06066-.2813-.281305-.6629-.43934-1.0607-.43934zm-3.75 9.74999h-9c-.19891 0-.38968-.079-.53033-.2197-.14065-.14061-.21967-.33138-.21967-.53029s.07902-.38968.21967-.53033.33142-.21967.53033-.21967h9c.1989 0 .3897.07902.5303.21967.1407.14065.2197.33142.2197.53033s-.079.38968-.2197.53029c-.1406.1407-.3314.2197-.5303.2197zm0-2.99999h-9c-.19891 0-.38968-.07902-.53033-.21967s-.21967-.33142-.21967-.53033.07902-.38968.21967-.53033.33142-.21967.53033-.21967h9c.1989 0 .3897.07902.5303.21967.1407.14065.2197.33142.2197.53033s-.079.38968-.2197.53033c-.1406.14065-.3314.21967-.5303.21967z" /></svg>,
  caretLeft: (className:string) => <svg className={className} fill="none" height="11" viewBox="0 0 6 11" width="6" xmlns="http://www.w3.org/2000/svg"><path d="m5.14656 10.8535-5.000005-4.99997c-.046488-.04643-.0833676-.10158-.1085298-.16228-.0251623-.06069-.03811269-.12576-.0381127-.19147 0-.0657.0129504-.13077.0381126-.19147.0251623-.06069.0620419-.11584.1085299-.16228l4.999995-4.999997c.06993-.0700052.15906-.117689.2561-.13701419.09704-.01932521.19764-.0094229.28905.02845329.09141.0378763.16953.1020229.22447.1843199.05493.082297.08421.179044.08414.277991v10.000017c.00007.0989-.02921.1957-.08414.278-.05494.0823-.13306.1464-.22447.1843s-.19201.0478-.28905.0284c-.09704-.0193-.18617-.067-.25609-.137z" /></svg>
}

type IconName = keyof typeof icons

const Icon = ({
  name,
  className = "",
} : {
  name: IconName,
  className?: string,
}) => {
  return icons[name](className)
}

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
        <a href={props.detailsPageLink.to} className="flex items-center">
          <span className="text-14 text-grey-500">{props.detailsPageLink.text}</span>
          <Icon name="caretLeft" className="ml-12 rotate-180 fill-grey-500" />
        </a>
      </div>
      {props.children}
    </div>
  )
}

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems:Array<{
    name: string,
    icon: IconName,
  }> = [
    { name: "Overview", icon: "home", },
    { name: "Transactions", icon: "transactions", },
    { name: "Budgets", icon: "budgets", },
    { name: "Pots", icon: "pots", },
    { name: "Recurring Bills", icon: "recurringBills", },
  ]

  const formatCurrency = (
    amount:number, 
    options?: { showDecimals: boolean },
  ) => {
    const showDecimals = options?.showDecimals ?? true
    const maximumFractionDigits = showDecimals ? 2 : 0
    return new Intl.NumberFormat(
      'en-US', 
      {
        style: "currency", 
        currency: "USD",
        maximumFractionDigits,
      }
    ).format(amount)
  }

  const totalSaved = data.pots.reduce((total, pot) => {
    return total + pot.total
  }, 0)

  return (
    <div className="h-screen flex flex-col-reverse lg:flex-row">
      <div className={classnames("flex flex-col justify-between bg-grey-900 rounded-t-8 lg:rounded-tl-0 lg:rounded-r-16", {
        "lg:w-300": menuOpen,
      })}>
        <div>
          <div className="mx-32 my-40 hidden lg:block">
            {menuOpen ? (
              <img src={logoLarge} alt="" />
            ) : (
              <img src={logoSmall} alt="" className="mx-auto" />
            )}
          </div>
          <div className={classnames("px-16 pt-8 flex lg:p-0 lg:pt-24 lg:pr-24 lg:flex-col", {
            "lg:pr-16": menuOpen,
            "lg:pr-8": !menuOpen,
          })}>
            {navItems.map((item, index) => {
              const isActive = index === 0

              return (
                <a 
                  href="/" 
                  key={index} 
                  className={classnames(
                    "w-1/5 py-8 flex justify-center border-b-4 rounded-t-8", 
                    "md:flex-col md:items-center",
                    "lg:w-full lg:px-32 lg:py-16 lg:flex-row lg:justify-start lg:border-l-4 lg:border-b-0 lg:rounded-r-12 lg:rounded-tl-0",
                    {
                      "bg-white border-green": isActive,
                      "border-transparent": !isActive,
                    }
                  )}
                >
                  <div className="lg:w-24 lg:h-24 lg:flex lg:items-center lg:justify-center">
                    <Icon
                      name={item.icon}
                      className={classnames({
                        "fill-green": isActive,
                        "fill-grey-300": !isActive,
                      })}
                    />
                  </div>
                  <span
                    className={classnames("mt-4 hidden text-12 font-bold md:block lg:ml-16 lg:mt-0 lg:text-16", {
                      "text-grey-300": !isActive,
                      "lg:hidden": !menuOpen,
                    })}
                  >
                    {item.name}
                  </span>
                </a>
              )
            })}
          </div>
        </div>
        <button
          type="button" 
          className="mb-48 pl-32 py-16 hidden items-center lg:flex"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <img src={minimizeIcon} alt="" className={classnames("w-24", {
            "rotate-180": !menuOpen,
          })} />
          {menuOpen && (
            <span className="ml-16 font-bold text-grey-300">Minimize Menu</span>
          )}
        </button>
      </div>
      <div className="grow overflow-y-auto">
        <div className="mx-auto max-w-1140 px-16 py-24 md:px-40 md:py-32 2xl:px-0">
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
      </div>
    </div>
  )
}

export default App
