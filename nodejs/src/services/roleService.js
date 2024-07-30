import { roleModel } from '~/models/roleModel'

const createNew = async reqBody => {
  try {
    const newRole = { ...reqBody }
    const createdRole = await roleModel.createNew(newRole)
    const getNewRole = await roleModel.findOneById(createdRole.insertedId)
    return getNewRole
  } catch (error) {
    throw error
  }
}

export const roleService = { createNew }
