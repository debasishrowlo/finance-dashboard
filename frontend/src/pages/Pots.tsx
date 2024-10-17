import { useState } from "react"
import classnames from "classnames"
import { Dialog, DialogPanel } from "@headlessui/react"

import Icon from "@/components/Icon"
import { formatCurrency } from "@/utils"

import ellipsisIcon from "@/assets/images/icon-ellipsis.svg"
import closeIcon from "@/assets/images/icon-close-modal.svg"
import dollarIcon from "@/assets/images/icon-dollar.svg"
import checkCircleIcon from "@/assets/images/icon-selected.svg"

import data from "@/data.json"

const colors = [
  { name: "Choose Color", code: "#000" },
  { name: "Green", code: "#277C78" },
  { name: "Yellow", code: "#F2CDAC" },
  { name: "Cyan", code: "#82C9D7" },
  { name: "Navy", code: "#626070" },
  { name: "Red", code: "#C94736" },
  { name: "Purple", code: "#826CB0" },
  { name: "Turquoise", code: "#597C7C" },
  { name: "Brown", code: "#93674F" },
  { name: "Magenta", code: "#934F6F" },
  { name: "Blue", code: "#3F82B2" },
  { name: "Navy", code: "#97A0AC" },
  { name: "Army Green", code: "#7F9161" },
  { name: "Pink", code: "#AF81BA" },
  { name: "Gold", code: "#CAB361" },
  { name: "Orange", code: "#BE6C49" },
]

const Pots = () => {
  const [pots, setPots] = useState(data.pots)
  const [addDialogOpen, setAddDialogOpen] = useState(true)
  const [activeColorIndex, setActiveColorIndex] = useState(0)
  const [colorMenuOpen, setColorMenuOpen] = useState(false)

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
          onClick={() => setAddDialogOpen(true)}
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
      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        className="fixed top-0 left-0 z-30 w-full h-full flex justify-center items-center outline-none"
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <DialogPanel className="max-w-560 relative z-10 mx-20 w-full px-20 py-24 bg-white rounded-12 md:p-32">
          <div className="flex justify-between items-center">
            <h3 className="text-20 font-bold">Add New Pot</h3>
            <button onClick={() => setAddDialogOpen(false)}>
              <img src={closeIcon} alt="" />
            </button>
          </div>
          <p className="mt-20 text-14 text-grey-500">Create a pot to set savings targets. These can help keep you on track as you save for special purchases.</p>
          <form onSubmit={() => {}} className="mt-20">
            <div>
              <label className="text-12 font-bold text-grey-500">Pot Name</label>
              <input type="text" className="w-full mt-4 px-20 py-12 border border-beige-500 text-14 rounded-8" />
              <p className="mt-4 text-right text-12 text-grey-500">30 characters left</p>
            </div>
            <div className="mt-16">
              <label className="text-12 font-bold text-grey-500">Target</label>
              <div className="mt-4 relative">
                <img src={dollarIcon} alt="" className="absolute top-1/2 left-20 -translate-y-1/2" />
                <input type="text" defaultValue="110.00" className="w-full px-20 pl-32 py-12 border border-beige-500 text-14 rounded-8" />
              </div>
            </div>
            <div className="mt-16">
              <label className="text-12 font-bold text-grey-500">Theme</label>
              {colorMenuOpen && (
                <div
                  className="absolute inset-0"
                  onClick={() => setColorMenuOpen(!colorMenuOpen)}
                ></div>
              )}
              <div className="mt-4 relative">
                <button
                  type="button"
                  className="w-full px-20 py-12 flex items-center border border-beige-500 rounded-8"
                  onClick={() => setColorMenuOpen(!colorMenuOpen)}
                >
                  <div
                    className="w-16 h-16 rounded-full"
                    style={{ backgroundColor: colors[activeColorIndex].code}}
                  ></div>
                  <p className="ml-12 grow text-left text-14">{colors[activeColorIndex].name}</p>
                  <Icon name="caretLeft" className="ml-12 -rotate-90 fill-grey-500" />
                </button>
                {colorMenuOpen && (
                  <div className="absolute bottom-full w-full py-20">
                    <div className="max-h-300 px-20 py-12 bg-white rounded-8 shadow-[0_4px_24px_rgba(0,0,0,0.25)] overflow-y-auto">
                      {colors.map((color, index) => {
                        const selected = index === activeColorIndex
                        const used = pots.some(pot => pot.theme === color.code)
                        const alreadyUsed = used && !selected
                        const disabled = alreadyUsed

                        if (index === 0) {
                          return null
                        }

                        return (
                          <button
                            type="button"
                            key={index}
                            className="w-full py-12 first:pt-0 last:pb-0 flex items-center border-t first:border-t-0 border-grey-100 text-left"
                            disabled={disabled}
                            onClick={() => {
                              setActiveColorIndex(index)
                              setColorMenuOpen(false)
                            }}
                          >
                            <div
                              className={classnames("w-16 h-16 rounded-full", {
                                "opacity-25": alreadyUsed,
                              })}
                              style={{ backgroundColor: color.code}}
                            ></div>
                            <p className={classnames("ml-12 grow text-14", {
                              "text-grey-500": alreadyUsed,
                            })}>{color.name}</p>
                            {selected && (
                              <img src={checkCircleIcon} alt="" />
                            )}
                            {alreadyUsed && (
                              <p className="text-12 text-grey-500">Already Used</p>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-20 py-16 bg-grey-900 text-white text-14 font-bold rounded-8"
            >
              Add Pot
            </button>
          </form>
        </DialogPanel>
      </Dialog>
    </div>
  )
}

export default Pots