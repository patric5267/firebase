import { db } from "./firebaseconfig";
import { collection, addDoc,query , where , updateDoc,deleteDoc , getDoc, doc, getDocs } from 'firebase/firestore'
const data = collection(db, "todos")

export const addtodos =  (todo) =>async(dispatch)=> {
    try {
        const data2 = await addDoc(data, todo)
        if (!data2) {
            throw new Error("error")
        }
        const docRef = doc(db, "todos", data2.id);
        const getsingledoc = await getDoc(docRef)
        if (getsingledoc.exists()) {
            dispatch({
                type:"addtodosuccess",
                payload:{...getsingledoc.data(), id: getsingledoc.id }
            })
        } else {
           throw new Error("error")
        }
    } catch (error) {
        dispatch({
            type:"addtodoerror",
            payload:error.message
        })
    }

}

export const getalltodos =  (id) =>async(dispatch)=> {
    try {
        dispatch({
            type:"getalltodopending"
        })
        let todosarray=[]
        const q = query(data, where("userid", "==", id))
        const data2 = await getDocs(q)
        data2.docs.forEach((todos)=>{
            todosarray.push({...todos.data() , id:todos.id})
        })
        dispatch({
            type:"getalltodossuccess",
            payload:todosarray
        })
    } catch (error) {
        dispatch({
            type:"getalltodoserror",
            payload:error.message
        })
       
    }
}


export const deletetodo = async(todoid)=>{
    try {
        const todo = doc(db , "todos" , todoid)
        await deleteDoc(todo)
        return {msg:"item deleted"}
    } catch (error) {
         return {error:error.message}
    }
     
}

export const updatetodo = async(updatet)=>{
    try {
        const todo = doc(db , "todos" , updatet.id)
        await updateDoc(todo , {todo:updatet.todo})
        return {msg:"item updated"}
    } catch (error) {
         return {error:error.message}
    }
     
}