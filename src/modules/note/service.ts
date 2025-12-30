import {db} from "../../db"
import {note} from "../../db/schemas/notes"
import { eq } from "drizzle-orm"

interface createNoteInput{
    userId: string
    tittle: string
    content: string
    tags: string
    isArchived: boolean
    reminder: string
}
interface UpdateNote{
    userId: string
    tittle: string
    content: string
    tags: string
    isArchived: boolean
    reminder: string
}
export const createNote = async(data: createNoteInput)=>{
    const [newNote] = await db.insert(note).values({
        id: crypto.randomUUID(),
        userId: data.userId,
        tittle: data.tittle,
        content: data.content,
        tags: data.tags,
        isArchived: data.isArchived,
        reminder: data.reminder,
        updatedAt: new Date(),
    }).returning()
    return newNote
}
export const updateNote = async(id: string, data:Partial<UpdateNote>, userId: string)=>{
    //1 verificar se a nota existe
    const existing = await db.select().from(note).where(eq(note.id,id))
    if(!existing){
        throw new Error("Note not found")
    }
    //2 nao permitir atualizar o id do usuario
    if("user_id" in existing){
        throw new Error("não é possivel atualizar o id do usuario")
    }
    const updatePayload: any = {}
    if (data.tittle !== undefined)updatePayload.tittle = data.tittle
    if (data.content !== undefined)updatePayload.content = data.content
    if (data.tags !== undefined)updatePayload.tags = data.tags
    if (data.isArchived !== undefined)updatePayload.isArchived = data.isArchived
    if (data.reminder !== undefined)updatePayload.reminder = data.reminder

    if (Object.keys(updatePayload).length === 0){
        throw new Error("Nenhuma propriedade para atualizar")
    }

    updatePayload.updatedAt = new Date()

    //3 atualizar a nota
    const updateNote = await db.update(note).set(updatePayload).where(eq(note.id,id)).returning()
    return updateNote
}
export async function deleteNoteService(noteId: string, userId: string) {
  const notes= await db.query.note.findFirst({
    where: eq(note.id, noteId)
  })

  if (!notes) {
    throw new Error("Note not found")
  }

  if (notes.userId !== userId) {
    throw new Error("Unauthorized")
  }

  await db.delete(note).where(eq(note.id, noteId))
  return { id: noteId }
}
export const getNotesByUserId = async(userId:string)=>{
    const getNoteByUserId = await db.select().from(note).where(eq(note.userId,userId))
    return getNoteByUserId
}