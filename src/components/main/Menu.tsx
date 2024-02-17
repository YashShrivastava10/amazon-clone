import { MenuIcon } from "lucide-react"

export const Menu = () => {
  const options: string[] = [
    "Best Sellers",
    "Mobile",
    "Today's Deal",
    "Electrnoics",
    "Customer Service",
    "New Releases",
    "Home & Kitchen",
    "Gift Ideas",
    "Fashion",
  ]

  return (
    <div className="w-full h-[40px] bg-[#232f3e] text-white px-4 flex text-14">
      <div className="flex h-full items-center border-[1px] border-transparent hover:border-white cursor-pointer px-2">
        <MenuIcon />
        <b>All</b>
      </div>
      <div className="w-full h-full flex items-center">
        {options.map(option => 
          <div key={option} className="h-full flex items-center px-2 border-[1px] border-transparent hover:border-white cursor-pointer">
            <li>{option}</li>
          </div>)}
      </div>
    </div>
  )
}