const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const unidadeSchema = mongoose.Schema(
  {
    userId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    inep: {
      type: Number,
      required: true,
      trim: true,
    },
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email invalido');
        }
      },
    },
    fone: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: { type: String },
      coordinates: [],
    },
    endereco: {
      cep: { type: String, required: true },
      logradouro: { type: String, required: true, uppercase: true },
      quadra: { type: String },
      lote: { type: String },
      complemento: { type: String, uppercase: true },
      bairro: { type: String },
      localidade: { type: String, required: true },
      uf: { type: String, required: true },
    },
    turmaId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Turma' }],
    funcionarioId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Funcionario' }],
    deletado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
unidadeSchema.plugin(toJSON);
unidadeSchema.plugin(paginate);

/**
 * @typedef Unidade
 */
const Unidade = mongoose.model('Unidade', unidadeSchema);

module.exports = Unidade;
