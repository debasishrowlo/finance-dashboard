import { useState } from "react"
import { formatCurrency } from "@/utils"

import ellipsisIcon from "@/assets/images/icon-ellipsis.svg"

import data from "@/data.json"

const Pots = () => {
  const [pots, setPots] = useState(data.pots)

  const deletePot = () => {
    setPots(pots.slice(1))
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-32 font-bold">Pots</h1>
        <button
          type="button"
          className="p-16 bg-grey-900 text-white rounded-8"
          onClick={() => deletePot()}
        >
          + Add New Pot
        </button>
      </div>
      <div className="mt-32 grid grid-cols-1 gap-24 lg:grid-cols-2">
        {pots.map((pot, index) => {
          const percentage = (pot.total / pot.target) * 100
          const translateX = (100 - percentage) * -1

          return (
            <div key={index} className="px-20 py-24 bg-white rounded-12">
              <div className="flex items-center">
                <div
                  className="w-16 h-16 rounded-full"
                  style={{ backgroundColor: pot.theme }}
                ></div>
                <p className="ml-16 grow text-20 font-bold">{pot.name}</p>
                <img src={ellipsisIcon} alt="" />
              </div>
              <div className="mt-32 flex justify-between items-center">
                <p className="text-14 text-grey-500">Total Saved</p>
                <p className="text-32 font-bold">{formatCurrency(pot.total)}</p>
              </div>
              <div className="h-8 mt-16 bg-beige-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full w-full"
                  style={{
                    backgroundColor: pot.theme,
                    transform: `translateX(${translateX}%)`,
                  }}
                ></div>
              </div>
              <div className="mt-12 flex justify-between items-center">
                <p className="text-12 font-bold">{percentage.toFixed(2)}%</p>
                <p className="text-12">Target of {formatCurrency(pot.target, { showDecimals: false })}</p>
              </div>
              <div className="mt-32 flex">
                <button type="button" className="w-1/2 p-16 bg-beige-100 text-14 font-bold rounded-8">
                  + Add Money
                </button>
                <button type="button" className="w-1/2 ml-16 p-16 bg-beige-100 text-14 font-bold rounded-8">
                  Withdraw
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Pots