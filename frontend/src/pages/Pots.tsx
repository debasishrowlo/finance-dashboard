import { useState } from "react"
import { useFormik, FormikProps } from "formik"
import * as Yup from 'yup';
import classnames from "classnames"
import {
  CloseButton,
  Dialog, 
  DialogPanel, 
  Popover,
  PopoverButton, 
  PopoverPanel, 
  TransitionChild, 
} from "@headlessui/react"

import Icon from "@/components/Icon"
import { formatCurrency } from "@/utils"

import ellipsisIcon from "@/assets/images/icon-ellipsis.svg"
import closeIcon from "@/assets/images/icon-close-modal.svg"
import dollarIcon from "@/assets/images/icon-dollar.svg"
import checkCircleIcon from "@/assets/images/icon-selected.svg"

import data from "@/data.json"

type PotFormValues = {
  name: string,
  target: number,
  color: string,
}

type Pot = {
  name: string,
  target: number,
  total: number,
  theme: string,
}

const colors = [
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

const FormDialog = ({
  open,
  form,
  content,
  isColorUsed,
  ...props
} : {
  open: boolean,
  form: FormikProps<PotFormValues>,
  content: {
    title: string,
    description: string,
    submitButtonText: string,
  },
  close: () => void,
  isColorUsed: (color:string) => boolean,
}) => {
  const [colorMenuOpen, setColorMenuOpen] = useState(false)

  let activeColor = null

  const activeColorIndex = colors.findIndex(color => color.code === form.values.color)

  if (activeColorIndex !== -1) {
    activeColor = {
      name: colors[activeColorIndex].name,
      code: colors[activeColorIndex].code,
    }
  } else {
    activeColor = {
      name: "Choose Color",
      code: "#000",
    }
  }

  const close = () => {
    props.close()
    setColorMenuOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={close}
      className="fixed top-0 left-0 z-30 w-full h-full flex justify-center items-center outline-none transition duration-300 data-[closed]:opacity-0"
      transition
    >
      <div className="absolute inset-0 bg-black/30"></div>
      <TransitionChild>
        <DialogPanel className="max-w-560 relative z-10 mx-20 w-full px-20 py-24 bg-white rounded-12 md:p-32 transition duration-300 data-[closed]:translate-y-100">
          <div className="flex justify-between items-center">
            <h3 className="text-20 font-bold md:text-32">{content.title}</h3>
            <button onClick={close}>
              <img src={closeIcon} alt="" />
            </button>
          </div>
          <p className="mt-20 text-14 text-grey-500">{content.description}</p>
          <form onSubmit={form.handleSubmit} className="mt-20">
            <div>
              <label className="text-12 font-bold text-grey-500">Pot Name</label>
              <input
                type="text" 
                className="w-full mt-4 px-20 py-12 border border-beige-500 text-14 rounded-8"
                name="name"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.name}
                data-autofocus
              />
              <div className="mt-4 flex justify-between items-center">
                <div>
                  {form.touched.name && (
                    <p className="text-12 text-red">{form.errors.name}</p>
                  )}
                </div>
                <p className="text-right text-12 text-grey-500">30 characters left</p>
              </div>
            </div>
            <div className="mt-16">
              <label className="text-12 font-bold text-grey-500">Target</label>
              <div className="mt-4 relative">
                <img src={dollarIcon} alt="" className="absolute top-1/2 left-20 -translate-y-1/2" />
                <input
                  type="number"
                  className="w-full px-20 pl-32 py-12 border border-beige-500 text-14 rounded-8"
                  name="target"
                  value={form.values.target}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
              </div>
              {form.touched.target && (
                <p className="mt-4 text-12 text-red">{form.errors.target}</p>
              )}
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
                    style={{ backgroundColor: activeColor.code}}
                  ></div>
                  <p className="ml-12 grow text-left text-14">{activeColor.name}</p>
                  <Icon name="caretLeft" className={classnames("ml-12 fill-grey-500", {
                    "-rotate-90": !colorMenuOpen,
                    "rotate-90": colorMenuOpen,
                  })} />
                </button>
                {colorMenuOpen && (
                  <div className="absolute bottom-full w-full py-20">
                    <div className="max-h-300 px-20 py-12 bg-white rounded-8 shadow-[0_4px_24px_rgba(0,0,0,0.25)] overflow-y-auto">
                      {colors.map((color, index) => {
                        const selected = index === activeColorIndex
                        const alreadyUsed = isColorUsed(color.code)
                        const disabled = alreadyUsed

                        return (
                          <button
                            type="button"
                            key={index}
                            className="w-full py-12 first:pt-0 last:pb-0 flex items-center border-t first:border-t-0 border-grey-100 text-left"
                            disabled={disabled}
                            onClick={() => {
                              form.setFieldValue("color", color.code)
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
                {form.touched.color && (
                  <p className="mt-4 text-12 text-red">{form.errors.color}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-20 py-16 bg-grey-900 text-white text-14 font-bold rounded-8"
            >
              {content.submitButtonText}
            </button>
          </form>
        </DialogPanel>
      </TransitionChild>
    </Dialog>
  )
}

const WithDrawAmountDialog = ({
  pot,
  withdrawAmount,
  open,
  ...props
} : {
  pot: Pot,
  open: boolean,
  withdrawAmount: (amount:number) => void,
  close: () => void,
}) => {
  const form = useFormik({
    initialValues: {
      amount: 0,
    },
    validationSchema: Yup.object().shape({
      amount: Yup.number()
        .moreThan(0, 'Should be more than 0')
        .lessThan(pot?.total, 'Amount cannot be greater than current amount')
        .required('Target is required'),
    }),
    onSubmit: (values:{ amount: number }) => {
      withdrawAmount(values.amount)
      close()
    },
  })

  const close = () => {
    props.close()
    form.resetForm()
  }

  let currentPercentage = 0
  let removedPercentage = 0
  let remainingPercentage = 0
  let newAmount = 0

  if (pot) {
    currentPercentage = (pot.total / pot.target) * 100
    removedPercentage = Math.max(
      (form.values.amount / pot.target) * 100,
      currentPercentage
    )
    remainingPercentage = currentPercentage - removedPercentage
    newAmount = pot.total - form.values.amount
  }

  return (
    <Dialog
      open={open}
      onClose={close}
      transition
      className="fixed top-0 left-0 z-30 w-full h-full flex justify-center items-center outline-none transition duration-300 data-[closed]:opacity-0"
    >
      <div className="absolute inset-0 bg-black/30"></div>
      <TransitionChild>
        <DialogPanel className="max-w-560 relative z-10 mx-20 w-full px-20 py-24 bg-white rounded-12 md:p-32 transition duration-300 data-[closed]:translate-y-100">
          <div className="flex justify-between items-center">
            <h3 className="text-20 font-bold md:text-32">
              Withdraw from "{pot?.name}"
            </h3>
            <button onClick={close}>
              <img src={closeIcon} alt="" />
            </button>
          </div>
          <p className="mt-20 text-14 text-grey-500">Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot.</p>
          <div className="mt-20 flex justify-between items-center">
            <p className="text-14 text-grey-500">New Amount</p>
            <p className="text-32 font-bold">{formatCurrency(newAmount)}</p>
          </div>
          <div className="w-full h-8 mt-16 flex bg-beige-100 rounded-full overflow-hidden">
            <div
              className={classnames("bg-grey-900 h-full transition-all", {
                "rounded-r-full": removedPercentage === 0,
              })}
              style={{ width: remainingPercentage + "%" }}
            ></div>
            <div
              className={classnames("bg-red h-full rounded-r-full transition-all", {
                "border-l-2 border-grey-100": removedPercentage !== currentPercentage,
              })}
              style={{ width: removedPercentage + "%"}}
            ></div>
          </div>
          <div className="mt-12 flex justify-between items-center">
            <p className="text-12 font-bold text-red">{removedPercentage.toFixed(2)}%</p>
            <p className="text-12 text-grey-500">
              Target of {formatCurrency(pot?.target, { showDecimals: false })}
            </p>
          </div>
          <form onSubmit={form.handleSubmit}>
            <p className="mt-20 text-12 font-bold">Amount to Withdraw</p>
            <div className="mt-4 relative">
              <img src={dollarIcon} alt="" className="absolute top-1/2 left-20 -translate-y-1/2" />
              <input
                type="number"
                className="w-full px-20 pl-32 py-12 border border-beige-500 text-14 rounded-8"
                name="amount"
                value={form.values.amount}
                onFocus={(e) => e.target.select()}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                data-autofocus
              />
            </div>
            {form.touched.amount && (
              <p className="mt-4 text-12 text-red">{form.errors.amount}</p>
            )}
            <button
              type="button"
              className="w-full mt-20 py-16 bg-grey-900 text-14 font-bold text-white rounded-8"
            >
              Confirm Withdrawal
            </button>
          </form>
        </DialogPanel>
      </TransitionChild>
    </Dialog>
  )
}

const AddAmountDialog = ({
  pot,
  addAmount,
  open,
  ...props
} : {
  pot: Pot,
  open: boolean,
  addAmount: (amount:number) => void,
  close: () => void,
}) => {
  const form = useFormik({
    initialValues: {
      amount: 0,
    },
    validationSchema: Yup.object().shape({
      amount: Yup.number()
        .moreThan(0, 'Should be more than 0')
        .required('Target is required'),
    }),
    onSubmit: (values:{ amount: number }) => {
      addAmount(values.amount)
      close()
    },
  })

  const close = () => {
    props.close()
    form.resetForm()
  }

  let currentPercentage = 0
  let addedPercentage = 0
  let newAmount = 0

  if (pot) {
    currentPercentage = (pot.total / pot.target) * 100

    addedPercentage = (form.values.amount / pot.target) * 100
    if (addedPercentage + currentPercentage > 100) {
      addedPercentage = 100 - currentPercentage
    }

    newAmount = pot.total + form.values.amount
  }

  return (
    <Dialog
      open={open}
      onClose={close}
      transition
      className="fixed top-0 left-0 z-30 w-full h-full flex justify-center items-center outline-none transition duration-300 data-[closed]:opacity-0"
    >
      <div className="absolute inset-0 bg-black/30"></div>
      <TransitionChild>
        <DialogPanel className="max-w-560 relative z-10 mx-20 w-full px-20 py-24 bg-white rounded-12 md:p-32 transition duration-300 data-[closed]:translate-y-100">
          <div className="flex justify-between items-center">
            <h3 className="text-20 font-bold md:text-32">
              Add to "{pot?.name}"
            </h3>
            <button onClick={close}>
              <img src={closeIcon} alt="" />
            </button>
          </div>
          <p className="mt-20 text-14 text-grey-500">Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.</p>
          <div className="mt-20 flex justify-between items-center">
            <p className="text-14 text-grey-500">New Amount</p>
            <p className="text-32 font-bold">{formatCurrency(newAmount)}</p>
          </div>
          <div className="w-full h-8 mt-16 flex bg-beige-100 rounded-full overflow-hidden">
            <div
              className={classnames("bg-grey-900 h-full transition-all", {
                "rounded-r-full": addedPercentage === 0,
              })}
              style={{ width: currentPercentage + "%" }}
            ></div>
            <div
              className="border-l-2 border-grey-100 bg-green h-full rounded-r-full transition-all"
              style={{ width: addedPercentage + "%"}}
            ></div>
          </div>
          <div className="mt-12 flex justify-between items-center">
            <p className="text-12 font-bold text-green">{addedPercentage.toFixed(2)}%</p>
            <p className="text-12 text-grey-500">
              Target of {formatCurrency(pot?.target, { showDecimals: false })}
            </p>
          </div>
          <form onSubmit={form.handleSubmit}>
            <p className="mt-20 text-12 font-bold">Amount to Add</p>
            <div className="mt-4 relative">
              <img src={dollarIcon} alt="" className="absolute top-1/2 left-20 -translate-y-1/2" />
              <input
                type="number"
                className="w-full px-20 pl-32 py-12 border border-beige-500 text-14 rounded-8"
                name="amount"
                value={form.values.amount}
                onFocus={(e) => e.target.select()}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                data-autofocus
              />
            </div>
            {form.touched.amount && (
              <p className="mt-4 text-12 text-red">{form.errors.amount}</p>
            )}
            <button
              type="button"
              className="w-full mt-20 py-16 bg-grey-900 text-14 font-bold text-white rounded-8"
            >
              Confirm Addition
            </button>
          </form>
        </DialogPanel>
      </TransitionChild>
    </Dialog>
  )
}

const Pots = () => {
  const [pots, setPots] = useState<Pot[]>(data.pots)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editingPotIndex, setEditingPotIndex] = useState(-1)
  const [deletingPotIndex, setDeletingPotIndex] = useState(-1)
  const [addingPotIndex, setAddingPotIndex] = useState(-1)
  const [withdrawingPotIndex, setWithdrawingPotIndex] = useState(-1)

  const deleteDialogOpen = deletingPotIndex !== -1
  const editDialogOpen = editingPotIndex !== -1

  const deletingPot = pots[deletingPotIndex]
  const addingPot = pots[addingPotIndex]
  const withdrawingPot = pots[withdrawingPotIndex]

  const addAmountDialogOpen = addingPot !== undefined
  const withdrawAmountDialogOpen = withdrawingPot !== undefined

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .max(30, 'Too Long!')
      .required('Name is required'),
    target: Yup.number()
      .moreThan(0, 'Should be more than 0')
      .required('Target is required'),
    color: Yup.string().required('Color is required'),
  })

  const createForm = useFormik({
    initialValues: {
      name: "",
      target: 0,
      color: "",
    },
    validationSchema: formSchema,
    onSubmit: (values:PotFormValues) => {
      setPots([
        ...pots,
        {
          name: values.name,
          total: 0,
          target: values.target,
          theme: values.color,
        },
      ])
      closeDialog()
    },
  })

  const editForm = useFormik({
    initialValues: {
      name: "",
      target: 0,
      color: "",
    },
    validationSchema: formSchema,
    onSubmit: (values:PotFormValues) => {
      setPots([
        ...pots.slice(0, editingPotIndex),
        {
          ...pots[editingPotIndex],
          name: values.name,
          target: values.target,
          theme: values.color,
        },
        ...pots.slice(editingPotIndex + 1),
      ])
      closeEditDialog()
    },
  })

  const closeDialog = () => {
    setCreateDialogOpen(false)
    createForm.resetForm()
  }

  const closeEditDialog = () => {
    setEditingPotIndex(-1)
    editForm.resetForm()
  }

  const openEditPotDialog = (index:number) => {
    setEditingPotIndex(index)

    const pot = pots[index]
    editForm.setValues({
      name: pot.name,
      target: pot.target,
      color: pot.theme,
    })
  }

  const openDeletePotDialog = (index:number) => {
    setDeletingPotIndex(index)
  }

  const deletePot = () => {
    setPots([
      ...pots.slice(0, deletingPotIndex),
      ...pots.slice(deletingPotIndex + 1),
    ])
    closeDeleteDialog()
  }

  const isColorUsedForCreateForm = (color:string) => {
    return pots.some(pot => (pot.theme === color))
  }

  const isColorUsedForEditForm = (color:string) => {
    return pots.some((pot, index) => (
      pot.theme === color && 
      index !== editingPotIndex
    ))
  }

  const closeDeleteDialog = () => {
    setDeletingPotIndex(-1)
  }

  const openAddAmountDialog = (index:number) => {
    setAddingPotIndex(index)
  }

  const closeAddAmountDialog = () => {
    setAddingPotIndex(-1)
  }

  const openWithdrawAmountDialog = (index:number) => {
    setWithdrawingPotIndex(index)
  }

  const closeWithdrawAmountDialog = () => {
    setWithdrawingPotIndex(-1)
  }

  const addAmount = (amount:number) => {
    setPots([
      ...pots.slice(0, addingPotIndex),
      {
        ...pots[addingPotIndex],
        total: pots[addingPotIndex].total + amount,
      },
      ...pots.slice(addingPotIndex + 1),
    ])
  }

  const withdrawAmount = (amount:number) => {
    setPots([
      ...pots.slice(0, withdrawingPotIndex),
      {
        ...pots[withdrawingPotIndex],
        total: pots[withdrawingPotIndex].total - amount,
      },
      ...pots.slice(withdrawingPotIndex + 1),
    ])
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-32 font-bold">Pots</h1>
        <button
          type="button"
          className="p-16 bg-grey-900 text-white rounded-8"
          onClick={() => setCreateDialogOpen(true)}
        >
          + Add New Pot
        </button>
      </div>
      <div className="mt-32 grid grid-cols-1 gap-24 lg:grid-cols-2">
        {pots.map((pot, index) => {
          let percentage = (pot.total / pot.target) * 100
          percentage = Math.min(percentage, 100)

          const translateX = (100 - percentage) * -1

          return (
            <div key={index} className="px-20 py-24 bg-white rounded-12">
              <div className="flex items-center">
                <div
                  className="w-16 h-16 rounded-full"
                  style={{ backgroundColor: pot.theme }}
                ></div>
                <p className="ml-16 grow text-20 font-bold">{pot.name}</p>
                <Popover className="self-stretch relative">
                  <PopoverButton className="h-full px-12 translate-x-12 outline-none">
                    <img src={ellipsisIcon} alt="" />
                  </PopoverButton>
                  <PopoverPanel
                    anchor="bottom end"
                    transition
                    className={[
                      "flex flex-col -translate-x-12 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.25)] rounded-8 origin-top-right", 
                      "transition duration-200 data-[closed]:scale-90 data-[closed]:opacity-0"
                    ].join(" ")}
                  >
                    <CloseButton
                      onClick={() => openEditPotDialog(index)}
                      className="px-20 py-12 text-left"
                    >
                      Edit Pot
                    </CloseButton>
                    <div className="mx-20 border-t border-grey-100"></div>
                    <CloseButton
                      onClick={() => openDeletePotDialog(index)}
                      className="px-20 py-12 text-left text-red"
                    >
                      Delete Pot
                    </CloseButton>
                  </PopoverPanel>
                </Popover>
              </div>
              <div className="mt-32 flex justify-between items-center">
                <p className="text-14 text-grey-500">Total Saved</p>
                <p className="text-32 font-bold">{formatCurrency(pot.total)}</p>
              </div>
              <div className="h-8 mt-16 bg-beige-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full w-full transition"
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
                <button
                  type="button"
                  className="w-1/2 p-16 border border-beige-100 hover:border-beige-500 bg-beige-100 hover:bg-white text-14 font-bold rounded-8 transition"
                  onClick={() => openAddAmountDialog(index)}
                >
                  + Add Money
                </button>
                <button
                  type="button"
                  className="w-1/2 ml-16 p-16 border border-beige-100 hover:border-beige-500 bg-beige-100 hover:bg-white text-14 font-bold rounded-8 transition"
                  onClick={() => openWithdrawAmountDialog(index)}
                >
                  Withdraw
                </button>
              </div>
            </div>
          )
        })}
      </div>
      <FormDialog
        open={createDialogOpen}
        close={closeDialog}
        form={createForm}
        content={{
          title: "Add New Pot",
          description: "Create a pot to set savings targets. These can help keep you on track as you save for special purchases.",
          submitButtonText: "Add Pot",
        }}
        isColorUsed={isColorUsedForCreateForm}
      />
      <FormDialog
        open={editDialogOpen}
        close={closeEditDialog}
        form={editForm}
        content={{
          title: "Edit Pot",
          description: "If your saving targets change, feel free to update your pots.",
          submitButtonText: "Save Changes",
        }}
        isColorUsed={isColorUsedForEditForm}
      />
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        transition
        className="fixed top-0 left-0 z-30 w-full h-full flex justify-center items-center outline-none transition duration-300 data-[closed]:opacity-0"
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <TransitionChild>
          <DialogPanel className="max-w-560 relative z-10 mx-20 w-full px-20 py-24 bg-white rounded-12 md:p-32 transition duration-300 data-[closed]:translate-y-100">
            <div className="flex justify-between items-center">
              <h3 className="text-20 font-bold md:text-32">
                Delete "{deletingPot?.name}"?
              </h3>
              <button onClick={closeDeleteDialog}>
                <img src={closeIcon} alt="" />
              </button>
            </div>
            <p className="mt-20 text-14 text-grey-500">Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.</p>
            <button
              type="button"
              className="w-full mt-20 py-16 bg-red text-14 font-bold text-white rounded-8"
              onClick={() => deletePot()}
            >
              Yes, Confirm Deletion
            </button>
            <button
              type="button"
              className="w-full mt-20 text-14 text-grey-500 rounded-8"
              onClick={closeDeleteDialog}
            >
              No, Go Back
            </button>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
      <AddAmountDialog
        open={addAmountDialogOpen}
        pot={addingPot}
        addAmount={addAmount}
        close={closeAddAmountDialog}
      />
      <WithDrawAmountDialog
        open={withdrawAmountDialogOpen}
        pot={withdrawingPot}
        withdrawAmount={withdrawAmount}
        close={closeWithdrawAmountDialog}
      />
    </div>
  )
}

export default Pots