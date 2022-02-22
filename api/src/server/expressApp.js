import { AuthenticationError, UserInputError } from 'apollo-server-express'
import { json, urlencoded } from 'body-parser'
import { NotFoundError } from 'errors'
import express from 'express'


const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', req.header('origin') || '*')
  res.setHeader('Vary', 'Origin')
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, cache-control, pragma, Authorization, TimeZone, locale, currentUser, currentclient'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).send('')
    return
  }
  return next()
})

app.use('/ping', (req, res, next) => {
  res.status(200).send('ping ok')
})

app.use('/logout', async (req, res, next) => {
  res.json({ loggedOut: true })
  res.end()
})

app.use('/login', async (req, res, next) => {
  try {
    const { username, password } = Object.keys(req.body).length === 0 ? req.query : req.body
    if (!username || !password) {
      throw new UserInputError('Username or password not set on request', { invalidArgs: { username, password } })
    }
    const db = await dbPromise

    const user = await db.collection('user').findOne({ username })

    if (!user) throw new NotFoundError('User not found')
    const isGood = await bcrypt.compare(password, user.password)
    if (!isGood) throw new AuthenticationError()
    const token = jwt.sign({ userId: user._id.toString() }, process.env.SECRET)
    res.json({ token })
  } catch (err) {
    next(err)
  }
})

// app.use('/verify-authentication', verifyAuthentication, (req, res) => res.status(200).json({ isLoggedIn: true }))

export default app
