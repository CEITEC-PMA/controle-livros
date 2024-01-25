const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const turmaSchema = mongoose.Schema(
  {
    unidadeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unidade' },
    nameTurma: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    qtdeAlunos: {
      type: Number,
      required: true,
    },
    qtdeProf: {
      type: Number,
      required: true,
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
turmaSchema.plugin(toJSON);
turmaSchema.plugin(paginate);

/**
 * @typedef Turma
 */
const Turma = mongoose.model('Turma', turmaSchema);

module.exports = Turma;
