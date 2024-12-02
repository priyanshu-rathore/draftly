import classNames from "classnames"
import { Poppins } from "next/font/google"
import { Button } from "./ui/button"
import { FcGoogle } from "react-icons/fc"
import { Label } from "./ui/label"
import { Input } from "./ui/input"

const poppins = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"]
})

const Authentication: React.FC = () => {
  return (
    <div className={classNames(poppins.className, "w-screen h-screen flex items-center justify-center bg-white")}>
      <div className="border-2 border-gray-100 w-fit h-fit rounded-md">
        <SignIn />
      </div>
    </div>
  )
}

export default Authentication

const SignIn: React.FC = () => {
  return (
    <div className="p-5 flex flex-col gap-3 shadow-md">
      <h1 className={classNames("font-semibold text-black text-xl")}>Sign In to Draftly</h1>
      <div className="w-full items-center justify-center flex my-4">
        <Button variant={"outline"} className="px-20">
          <FcGoogle />
          <h4 className="font-medium">Sign in with Google</h4>
        </Button>
      </div>
      <h5 className="text-center">or sign in with</h5>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input type="password" />
      </div>
      <Button className="font-semibold rounded-full">Sign In</Button>
    </div>
  )
}
