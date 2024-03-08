import React, { useState } from 'react'
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from 'react-router-dom'
import { signup, login, githublogin, googlelogin  , passwordreset} from './firebasesetup/firebaseauthoperations'

const hoc = (Component, type) => {
    const newcomponent = () => {
        const navigate = useNavigate()
        const[email , setEmail] = useState("")
        const [loading, setLoading] = useState(false)
        const { toast } = useToast()
        const [data, setData] = useState({
            email: "", password: ""
        })
        const success = (typeoflogin) => {
            setLoading(false)
            if (typeoflogin === "normal") {
                navigate("/login")
            }
            else {
                navigate("/")
            }
        }
        const errorfunc = (error) => {
            setLoading(false)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.message,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
        const handleform = (e) => {
            e.preventDefault()
            setLoading(true)
            if (type === "login") {
                login(data.email, data.password).then(() => success("login")).catch(errorfunc)
            }
            else {
                signup(data.email, data.password).then(() => success("normal")).catch(errorfunc)

            }
        }
        const loginwithgoogle = () => {
            googlelogin().then(() => success("google")).catch(errorfunc)
        }
        const loginwithgithub = () => {
            githublogin().then(() => success("github")).catch(errorfunc)
        }
        const resetpassword = ()=>{
            passwordreset(email).then((res)=>{
                 console.log(res);
                toast({
                    variant: "outline",
                    title: "Reset Password",
                    description: "Email sent successfully",
                })
                setEmail("")
            }).catch(errorfunc)
        }
        return (
            <>
                <Component resetpassword={resetpassword} loginwithgithub={loginwithgithub} email={email} handleemail={setEmail} data={data} handledata={setData} loginwithgoogle={loginwithgoogle} loading={loading} handleform={handleform} />
            </>
        )
    }
    return newcomponent
}

export default hoc
