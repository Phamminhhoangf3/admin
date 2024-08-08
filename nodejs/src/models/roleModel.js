import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '../config/mongodb.js'

const ROLE_COLLECTION_NAME = 'roles'
const ROLE_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict()
})

const validationBeforeCreate = async data => {
  return await ROLE_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async data => {
  try {
    const validData = await validationBeforeCreate(data)
    const createdRole = await GET_DB().collection(ROLE_COLLECTION_NAME).insertOne(validData)
    return createdRole
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async roleId => {
  try {
    const result = await GET_DB()
      .collection(ROLE_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(roleId)
      })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const roleModel = {
  ROLE_COLLECTION_NAME,
  ROLE_COLLECTION_SCHEMA,
  createNew,
  findOneById
}
