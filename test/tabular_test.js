var Tabular = require('../src/tabular.js'),
    expect  = require('expect.js');

describe('tabular.js', function() {
  describe('A default Tabular instance', function() {
    var tab;

    beforeEach(function() {
      tab = new Tabular();
    });

    describe('render', function() {
      it('a simple string will stay the same', function() {
        var simpleString = 'Hey ja.';
        expect(tab.render(simpleString)).to.eql(simpleString);
      });

      it('a simple array will converted to a string separated using spaces', function() {
        var arr = ['Hey ja.', 'you too'];
        expect(tab.render(arr)).to.eql(arr.join(' '));
      });

      it('a nested array will converted to a padded multiline string separated using spaces and new lines', function() {
        var arr = [
              ['Hey ja.', 'you too',  'true'],
              ['no no',   'never no', 'more']
            ],
            result = 'Hey ja. you too  true\n' +
                     'no no   never no more';
        expect(tab.render(arr)).to.eql(result);
      });

      it('works with arrays of different sizes', function() {
        var arr = [
              ['Hey ja.', 'you too', 'true'],
              ['no no',   'never no']
            ],
            result = 'Hey ja. you too  true\n' +
                     'no no   never no';
        expect(tab.render(arr)).to.eql(result);
      });
    });

    describe('lines', function() {
      it('a simple string will be put into an array', function() {
        var simpleString = 'Hey ja.';
        expect(tab.lines(simpleString)).to.eql([simpleString]);
      });

      it('a simple array will converted to a string separated using spaces within an array', function() {
        var arr = ['Hey ja.', 'you too'];
        expect(tab.lines(arr)).to.eql([arr.join(' ')]);
      });

      it('a nested array will converted to a padded array of lines', function() {
        var arr = [
              ['Hey ja.', 'you too',  'true'],
              ['no no',   'never no', 'more']
            ],
            result = ['Hey ja. you too  true',
                      'no no   never no more'];
        expect(tab.lines(arr)).to.eql(result);
      });

      it('works with arrays of different sizes', function() {
        var arr = [
              ['Hey ja.', 'you too'],
              ['no no',   'never no', 'more']
            ],
            result = ['Hey ja. you too ',
                      'no no   never no more'];
        expect(tab.lines(arr)).to.eql(result);
      });
    });
  });

  describe('We can change setting', function() {
    var tab;

    beforeEach(function() {
    });

    it('like the gutter', function() {
      tab = new Tabular({
        gutter: '#'
      });

      var arr = [
            ['Hey ja.', 'you too',  'true'],
            ['no no',   'never no', 'more']
          ],
          result = ['Hey ja.#you too #true',
                    'no no  #never no#more'];
      expect(tab.lines(arr)).to.eql(result);
    });

    it('like the gutter to nothing', function() {
      tab = new Tabular({
        gutter: ''
      });

      var arr = [
            ['Hey ja.', 'you too',  'true'],
            ['no no',   'never no', 'more']
          ],
          result = ['Hey ja.you too true',
                    'no no  never nomore'];
      expect(tab.lines(arr)).to.eql(result);
    });

    it('like the padding', function() {
      tab = new Tabular({
        padding: '*'
      });

      var arr = [
            ['Hey ja.', 'you too',  'true'],
            ['no no',   'never no', 'more']
          ],
          result = ['Hey ja. you too* true',
                    'no no** never no more'];
      expect(tab.lines(arr)).to.eql(result);
    });

    it('like the padding to nothing', function() {
      tab = new Tabular({
        padding: ''
      });

      var arr = [
            ['Hey ja.', 'you too',  'true'],
            ['no no',   'never no', 'more']
          ],
          result = ['Hey ja. you too true',
                    'no no never no more'];
      expect(tab.lines(arr)).to.eql(result);
    });
  });
});
