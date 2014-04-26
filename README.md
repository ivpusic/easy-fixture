easy-fixture
============

### Motivation

If you have database with only few simple tables/collections things are simple. You can easiliy manage your fixture files. But trouble starts if you have complex tables/collections in database, and also relationships between them. In that case it is not easy to write fixture files, and also it is time wasting task.

With this module you can use current database state -> data added from your UI or on some other way.
Idea is to have fixture manager which will `freeze` your current database state and save it into some local file.
After that you will be able to load fixtures from that file into your database.

To make things easier, for each fixture manager there should be `grunt`/`gulp` task which makes this task even easier.

### Available managers
- [Mongo](https://github.com/ivpusic/easy-mongo-fixture)

### Making custom fixture manager

All you have to do is to extend `Base` object of `easy-fixture`. 

#### Example
```
Base = require('easy-fixture').Base;

function CustomFixtureManager(opts) {
  Base.call(this);

  // your init logic here
}

util.inherits(CustomFixtureManager, Base);

/*
 * THIS METHOD SHOULD RETURN PROMISE
 */
CustomFixtureManager.prototype._load = function () {
  // implementation of method for loading data from local file, 
  // and saving it into corresponing database destination
};

/*
 * THIS METHOD SHOULD RETURN PROMISE
 */
CustomFixtureManager.prototype._save = function () {
  // implementation of method for collectiong data from database source, 
  // and saving it into local file(s).
};
```

After you create your ``CustomFixtureManager``, you can use it on following way with `easy-fixture`:
```
var fixture = require('easy-fixture');

var fixtureManager = new CustomFixtureManager();

// you can use multiple fixture managers. It will append each manager to array
fixture.use(fixtureManager);

// save method will run _save action on each fixture manager
fixture.save().then(function () {
  console.log('saved');
});

// load method will run _load action on each fixture manager
fixture.load().then(function () {
  console.log('loaded');
});

```

# License
**MIT**
