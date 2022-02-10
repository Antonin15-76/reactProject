const collectionName = 'test'

export const createAppUserResolve = async (root, {username}, ctx) => {
  const collection = await ctx.db.collection(collectionName)
  await collection.insertOne({username: username})
  return 'toto'
}
