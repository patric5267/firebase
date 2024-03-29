import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';
import hoc from '@/hoc'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
const Login = (props) => {
    return (
        <div className=' h-[100vh] flex flex-col items-center justify-center '>
            <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Login
            </h2>
            <form className=' sm:w-[20rem] ' onSubmit={props.handleform}>
                <Input type="email" value={props.data.email} placeholder="Email" className="my-5" onChange={(e) => props.handledata({ ...props.data, email: e.target.value })} />
                <Input type="password" value={props.data.password} placeholder="Password" className="my-5" onChange={(e) => props.handledata({ ...props.data, password: e.target.value })} />
                {props.loading ? <Button disabled className="w-full">
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button> : <Button className="w-full mb-2">login</Button>}
                <Dialog>
                    <DialogTrigger asChild>
                      {/* <h2 className=' cursor-pointer'>Forget Password?</h2> */}
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Resest Password</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Email
                                </Label>
                                <Input id="name" autoComplete="off" value={props.email} className="col-span-3" onChange={(e)=>props.handleemail(e.target.value)}/>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={props.resetpassword}>Send Email</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <div className='flex gap-2 justify-center mt-2'>
                    <p>New user ?</p>
                    <Link to='/signup'>Sign Up</Link>
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

export default hoc(Login, "login")
