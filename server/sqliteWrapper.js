const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
   host: 'localhost',
   dialect: 'sqlite',
   pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
   },

   // SQLite only
   storage: 'database.sqlite',

   // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
   operatorsAliases: false
});

const cloneDeep = require('lodash/cloneDeep');
const _segmentsData = require('../data/hagakure');
const segmentsData = cloneDeep(_segmentsData).reduce((acc, ele, i) => {
   ele.id = i + 1;
   acc[i] = ele;
   return acc;
}, []);

const Document = sequelize.define('documents', {
   title: Sequelize.STRING,
   segments: Sequelize.STRING
});

module.exports.createDb = () => {
   sequelize.sync()
      .then(() => Document.create({
         title: 'Hagakure',
         segments: JSON.stringify(segmentsData),
      }))
      .then(segments => {
         console.log(segments.toJSON());
      });
};

module.exports.getSegmentsData = (title, cb) => {
   Document.findOne({
      where: { title: title },
   }).then(users => {
      return cb(users)
   });
};