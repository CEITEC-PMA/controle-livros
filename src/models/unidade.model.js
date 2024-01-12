const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const unidadeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    inep: {
      type: Number,
      required: true,
      trim: true,
    },
    fone: {
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
    turma: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Turma' }],
    funcionario: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Funcionario' }],
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
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
