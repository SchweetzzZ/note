import {t} from "elysia"

export const createNoteValidation = t.Object({
    userId: t.String(),
    tittle: t.String(),
    content: t.String(),
    tags: t.String(),
    isArchived: t.Boolean(),
    reminder: t.String()
})
export const updateNoteValidation = t.Object({
    id: t.String(),
    userId: t.String(),
    tittle: t.String(),
    content: t.String(),
    tags: t.String(),
    isArchived: t.Boolean(),
    reminder: t.String()
})

export const idParamsValidation= t.Object({
    id: t.String(),
})