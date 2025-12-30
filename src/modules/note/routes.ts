import {Elysia} from "elysia"
import {createNote, updateNote, deleteNoteService,getNotesByUserId} from "./service"
import {auth} from "../auth/auth"
import {t} from "elysia"
import {idParamsValidation, updateNoteValidation} from "./validation"

export const noteRoutes = (app:Elysia)=> 
app
.post("/note", async ({body, set, request})=>{
    try{
    const session = await auth.api.getSession({
        headers: request.headers
    })
    if(!session){
        set.status = 401
        return {error: "Unauthorized"}
    }
    const userId = session.user.id

    const data = await createNote({
        ...body, userId})

    set.status = 201
    return {success: true, data}

    }catch(error){
        console.error("Error creating note:", error)
        set.status = 500
        return {error: "Internal Server Error"}
    }
},
{
    body: t.Object({
        tittle: t.String(),
        content: t.String(),
        tags: t.String(),
        isArchived: t.Boolean(),
        reminder: t.String()
    })
})
.put("/note/:id", async({body, set, request, params})=>{
    try{
        const session = await auth.api.getSession({
            headers: request.headers
        })
        if(!session){
            set.status = 401
            return {error: "Unauthorized"}
        }
        const userId = session.user.id

        const data = await updateNote(params.id,body, userId)

        return {success: true, data}
    }catch(error){
        console.error("Error updating note:", error)
        set.status = 500
        return {error: "Internal Server Error"}
    }
},
{
    params: idParamsValidation,
    body: updateNoteValidation
})
.delete("/note:id", async({params, set, request})=>{
    try{
        const session = await auth.api.getSession({
            headers: request.headers
        })
        if(!session){
            set.status = 401
            return {error: "Unauthorized"}
        }
        const userId = session.user.id

        const data = await deleteNoteService(params.id, userId)
    }catch(error){
        console.error("Error deleting note:", error)
        set.status = 500
        return {error: "Internal Server Error"}
    }
},{
    params: idParamsValidation
})
.get("/note", async({set, request})=> {
    try{
        const session = await auth.api.getSession({
            headers: request.headers
        })
        if(!session){
            set.status = 401
            return {error: "Unauthorized"}
        }
        const userId = session.user.id

        const data = await getNotesByUserId(userId)

        return {success: true, data}
    }catch(error){
        console.error("Error getting notes:", error)
        set.status = 500
        return {error: "Internal Server Error"}
    }
})
