import { useState } from "react"
import classnames from "classnames"
import { NavLink, Outlet } from "react-router-dom";

import Icon, { IconName } from "@/components/Icon"

import logoLarge from "@/assets/images/logo-large.svg"
import logoSmall from "@/assets/images/logo-small.svg"
import minimizeIcon from "@/assets/images/icon-minimize-menu.svg"

const SidebarLayout = () => {
  const [menuOpen, setMenuOpen] = useState(true)

  const navItems:Array<{
    name: string,
    to: string,
    icon: IconName,
  }> = [
    { name: "Overview", to: "/overview", icon: "home", },
    { name: "Transactions", to: "/transactions", icon: "transactions", },
    { name: "Budgets", to: "/budgets", icon: "budgets", },
    { name: "Pots", to: "/pots", icon: "pots", },
    { name: "Recurring Bills", to: "/recurring-bills", icon: "recurringBills", },
  ]

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
            {navItems.map((item, index) => (
              <NavLink
                to={item.to}
                key={index} 
                className={({ isActive }) => classnames(
                  "w-1/5 py-8 flex justify-center border-b-4 rounded-t-8", 
                  "md:flex-col md:items-center",
                  "lg:w-full lg:px-32 lg:py-16 lg:flex-row lg:justify-start lg:border-l-4 lg:border-b-0 lg:rounded-r-12 lg:rounded-tl-0",
                  {
                    "bg-white border-green": isActive,
                    "border-transparent": !isActive,
                  }
                )}
              >
                {({ isActive }) => (
                  <>
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
                  </>
                )}
              </NavLink>
            ))}
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
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default SidebarLayout