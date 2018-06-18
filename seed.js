const {db, Gardener, Plot, Vegetable, VP} = require('./models')

db.sync({force: true})
  .then(() => {
    console.log('Database synced!')
    let veggie;
    // db.close() // only if using a version of node without `finally`
  })
  .then(() => {
    Vegetable.create({
        name: 'eggplant',
        color: 'purple',
        planted_on: '2018-06-18 11:10:01'
      })
  })
  .then(() => {
    Vegetable.create({
        name: 'Broccoli',
        color: 'green',
        planted_on: '2018-06-17 11:10:01'
    })
        .then((vegetable) => {
            veggie = vegetable.id;
            return Gardener.create({
                name: 'Kevin',
                age: 20,
                favoriteVegetableId: vegetable.id
            })
        })
        .then((gardener) => {
            return Plot.create({
                size: 10,
                shaded: true,
                gardenerId: gardener.id
            })
        })
        .then((plot) => {
            return VP.create({
                plotId: plot.id,
                vegetableId: veggie
            })
        })
        

  })
  .catch(err => {
    console.log('Disaster! Something went wrong! ')
    console.log(err)
    db.close() // only if using a version of node without `finally`
  })


 