require('dotenv').config()
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const url = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@cluster0-9ifp6.mongodb.net/db-poc-ws-app?retryWrites=true&w=majority`
module.exports = mongoose.connect(url,  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo permitido de '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite máximo permitido de '{MAX}'."
mongoose.Error.messages.String.enum = "O '{VALUE}' não é valido para o atributo '{PATH}'."