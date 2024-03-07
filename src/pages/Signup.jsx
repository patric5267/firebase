import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { ReloadIcon } from '@radix-ui/react-icons'
import { Link } from 'react-router-dom';
import hoc from '@/hoc';
const Signup = (props) => {
    return (
        <div className=' h-[100vh] flex flex-col items-center justify-center '>
            <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                SignUp
            </h2>
            <form className='sm:w-[20rem] ' onSubmit={props.handleform}>
                <Input type="email" value={props.data.email} placeholder="Email" className="my-5" onChange={(e) => props.handledata({ ...props.data, email: e.target.value })} />
                <Input type="password" value={props.data.password} placeholder="Password" className="my-5" onChange={(e) => props.handledata({ ...props.data, password: e.target.value })} />
                {props.loading ? <Button disabled className="w-full">
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button> : <Button className="w-full">Submit</Button>}
                <div className='flex gap-2 justify-center mt-2'>
                    <p>ALready a user ?</p>
                    <Link to='/login'>Login</Link>
                </div>
            </form>
            <p className="text-sm text-muted-foreground my-2">or</p>
            <Button onClick={props.loginwithgoogle} className="mb-4 sm:w-[15rem]"><FcGoogle
                className="mr-2 h-4 w-4" /> Login with Google
            </Button>
            <Button onClick={props.loginwithgithub} className="mb-4 sm:w-[15rem]"><FaGithub className="mr-2 h-4 w-4" /> Login with Github
            </Button>
        </div>
    )
}

export default hoc(Signup, "sign")
