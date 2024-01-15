const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const unidadeSchema = mongoose.Schema(
  {
    userId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
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
