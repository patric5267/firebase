import React, { useState } from 'react'
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from 'react-router-dom'
import { signup , login, githublogin , googlelogin } from './firebasesetup/firebaseauthoperations'

const hoc = (Component , type) => {
    const newcomponent = () => {
        const navigate = useNavigate()
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
            if(type==="login"){
                console.log(type);
                login(data.email, data.password).then(()=>success("login")).catch(errorfunc)
            }
            else{
            signup(data.email, data.password).then(() => success("normal")).catch(errorfunc)
                 
            }
        }
        const loginwithgoogle = () => {
            googlelogin().then(() => success("google")).catch(errorfunc)
        }
        const loginwithgithub = () => {
            githublogin().then(() => success("github")).catch(errorfunc)
        }
        return (
            <>
              <Component loginwithgithub={loginwithgithub} data={data} handledata={setData} loginwithgoogle={loginwithgoogle} loading={loading} handleform={handleform}/>
            </>
        )
    }
    return newcomponent
}

export default hoc
