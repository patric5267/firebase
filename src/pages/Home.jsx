import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebasesetup/firebaseconfig'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { addtodos, deletetodo, getalltodos, updatetodo } from '../firebasesetup/firebasedatabaseoperations'
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useSelector, useDispatch } from 'react-redux'
import { ExitIcon } from "@radix-ui/react-icons"
import { MdDelete } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
const Home = () => {
    const dispatch = useDispatch()
    const { todosarray, iserror, isloading2 } = useSelector((state) => state.todo)
    const { toast } = useToast()
    const navigate = useNavigate()
    const [todo, setTodo] = useState({
        userid: "", todo: ""
    })
    const [utodo, setUtodo] = useState(null)
    useEffect(() => {
        iserror && toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
    }, [iserror])
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setTodo({ ...todo, userid: user.uid })
                dispatch(getalltodos(user.uid))
            }
            else {
                navigate("/login")
            }
        })
    }, [])
    const posttodo = (e) => {
        e.preventDefault()
        dispatch(addtodos(todo))
        setTodo({ ...todo, todo: "" })
    }
    const deletetodoitem = (id) => {
        deletetodo(id).then((res) => {
            if (res.error) {
                toast({
                    variant: "destructive",
                    title: "Failed to delete",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
            }
            else {
                dispatch({
                    type: "deleteupdatetodo",
                    payload: todosarray.filter((item) => item.id !== id)
                })
            }
        }).catch((error) => {
            toast({
                variant: "destructive",
                title: "Failed to delete",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        })
    }
    const updatetodoitem = (e) => {
        e.preventDefault()
        updatetodo(utodo).then((res) => {
            if (res.error) {
                toast({
                    variant: "destructive",
                    title: "Failed to update",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
            }
            else {
                dispatch({
                    type: "deleteupdatetodo",
                    payload: todosarray.map((item) => item.id === utodo.id ? { ...item, todo: utodo.todo } : item)
                })
                setUtodo(null)
            }
        }).catch((error) => {
            toast({
                variant: "destructive",
                title: "Failed to update",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        })
    }
    return (
        <div className='relative flex flex-col items-center px-4 '>
            <div className=' sticky top-0 py-4  w-full flex justify-center'>
                <form className="flex gap-2 sm:gap-0 flex-col sm:flex-row  w-full max-w-sm items-center space-x-2 " onSubmit={posttodo}>
                    <Input value={todo.todo} className="w-full" required type="text" placeholder="Walk at 9PM" onChange={(e) => setTodo({ ...todo, todo: e.target.value })} />
                    <div className=' flex justify-between w-full items-center'>
                        <Button type="submit">Add Todo</Button>
                        <Button className="logout  sm:hidden   bg-transparent hover:bg-white" onClick={() => signOut(auth)}>
                            <ExitIcon className=' h-7 w-7 text-black' />
                        </Button>
                    </div>
                </form>
            </div>
            {isloading2 ? <h1>loading...</h1> : todosarray.length === 0 ? <h1>no todo</h1> : <ScrollArea className=" w-full sm:w-[40rem] rounded-md border-0">
                <div className="p-4" >
                    <h4 className="mb-4 text-sm font-medium leading-none">{`All Todos (${todosarray.length})`}</h4>
                    {todosarray.map((todos, index) =>
                        <div key={index}>
                            <div className="flex justify-between items-center  text-sm w-full">
                                <p key={index}> {todos.todo}</p>
                                <div className="btns flex gap-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" className="bg-green-500 text-white" onClick={() => setUtodo(todos)}>
                                                {window.innerWidth < 640 ? <TfiWrite className=' text-lg' /> : "Update"}
                                            </Button>
                                        </DialogTrigger>
                                        {utodo && <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Update Todo</DialogTitle>
                                            </DialogHeader>
                                            <form onSubmit={updatetodoitem}>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="name" className="text-right">
                                                            Title
                                                        </Label>
                                                        <Input id="name" required value={utodo.todo} onChange={(e) => setUtodo({ ...utodo, todo: e.target.value })} className="col-span-3" />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit">Save changes</Button>
                                                </DialogFooter>
                                            </form>
                                        </DialogContent>}
                                    </Dialog>
                                    <Button variant="destructive" onClick={() => deletetodoitem(todos.id)}>
                                        {window.innerWidth < 640 ? <MdDelete className=' text-lg' /> : "Delete"}
                                    </Button>
                                </div>

                            </div>
                            <Separator className="my-2" />
                        </div>
                    )}
                </div>
            </ScrollArea>}
            <Button className="logout hidden sm:block absolute top-2 right-2  bg-transparent hover:bg-white" onClick={() => signOut(auth)}>
                <ExitIcon className=' h-7 w-7 text-black' />
            </Button>
        </div>
    )
}

export default Home
